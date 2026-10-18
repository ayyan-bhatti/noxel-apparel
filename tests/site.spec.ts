import { expect, test, type Page } from "@playwright/test";

const pages = [
  { path: "/", h1: /Made for Brands/ },
  { path: "/about", h1: /Built around the buyer/ },
  { path: "/capabilities", h1: /Made to your specification/ },
  { path: "/how-we-work", h1: /A clear path from inquiry to delivery/ },
  { path: "/contact", h1: /talk specifics/ },
];

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024;

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  return errors;
}

test.describe("pages", () => {
  for (const p of pages) {
    test(`${p.path} renders without errors or overflow`, async ({ page }) => {
      const errors = collectErrors(page);
      const res = await page.goto(p.path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(p.h1);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/Noxel Apparel/);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
      if (["/", "/contact", "/capabilities"].includes(p.path)) {
        await page.screenshot({ path: `test-results/${test.info().project.name}-${p.path.replaceAll("/", "") || "home"}.png`, fullPage: true });
      }
    });
  }

  test("all internal links resolve", async ({ page, request }) => {
    const hrefs = new Set<string>();
    for (const p of pages) {
      await page.goto(p.path);
      for (const href of await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")!))) {
        hrefs.add(href.split("#")[0] || "/");
      }
    }
    for (const href of hrefs) {
      const res = await request.get(href);
      expect(res.status(), href).toBe(200);
    }
  });

  test("unknown route shows 404 page", async ({ page }) => {
    const res = await page.goto("/no-such-page");
    expect(res?.status()).toBe(404);
    await expect(page.locator("h1")).toContainText("isn’t in production");
  });

  test("sitemap and robots", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    const xml = await sitemap.text();
    for (const p of ["/about", "/capabilities", "/how-we-work", "/contact"]) expect(xml).toContain(p);
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap:");
    expect(robots).toContain("Disallow: /api/");
  });

  test("images load", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
    });
    // Images inside display:none containers (e.g. desktop-only art) are intentionally never fetched.
    await page
      .waitForFunction(() => Array.from(document.images).filter((i) => i.checkVisibility()).every((i) => i.complete), null, {
        timeout: 20_000,
      })
      .catch(() => {});
    const broken = await page.locator("img").evaluateAll((imgs) =>
      (imgs as HTMLImageElement[])
        .filter((i) => i.checkVisibility())
        .filter((i) => !i.complete || i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src),
    );
    expect(broken).toEqual([]);
  });
});

test.describe("navigation", () => {
  test("primary navigation reaches every page", async ({ page }) => {
    await page.goto("/");
    for (const label of ["About", "Capabilities", "How We Work", "Contact"]) {
      if (isMobile(page)) {
        await page.getByRole("button", { name: "Open menu" }).click();
        await page.locator("#mobile-menu").getByRole("link", { name: new RegExp(`^${label}`) }).click();
      } else {
        await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: label }).click();
      }
      await expect(page).toHaveURL(new RegExp(label.toLowerCase().replace(/ /g, "-")));
      await expect(page.locator("#mobile-menu")).toBeHidden();
    }
  });

  test("mobile menu opens, traps Escape and restores focus", async ({ page }) => {
    test.skip(!isMobile(page), "mobile only");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });

  test("skip link moves focus to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("Request a Quote CTA goes to the form", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("main").getByRole("link", { name: "Request a Quote" }).first().click();
    await expect(page).toHaveURL(/\/contact#quote$/);
    await expect(page.getByRole("heading", { name: "Request a quote" })).toBeVisible();
  });
});

test.describe("quote form", () => {
  async function fill(page: Page, overrides: Record<string, string> = {}) {
    const v = {
      "Full name": "Test Buyer",
      Company: "Test Brand Ltd",
      "Email address": "buyer@testbrand.com",
      Country: "United Kingdom",
      "Product requirements": "Cotton tees, 2 colourways",
      Quantity: "1,000 pcs",
      ...overrides,
    };
    for (const [label, value] of Object.entries(v)) await page.getByLabel(label, { exact: false }).first().fill(value);
    await page.getByLabel("Product category").selectOption("Outerwear");
    await page.getByLabel("Timeline").selectOption("Within 3 to 6 months");
  }

  test("shows validation errors and focuses the first invalid field", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send request" }).click();
    await expect(page.getByText("Please enter your full name.")).toBeVisible();
    await expect(page.getByText("Please enter your email address.")).toBeVisible();
    await expect(page.locator("#timeline")).not.toHaveAttribute("required", "");
    await expect(page.locator("#category")).not.toHaveAttribute("required", "");
    await expect(page.locator("#name")).toBeFocused();
    await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
  });

  test("accepts an idea with a personal email and no production details", async ({ page }) => {
    let submitted = "";
    await page.route("**/api/quote", async (route) => {
      submitted = route.request().postData() ?? "";
      await route.fulfill({ status: 200, json: { ok: true } });
    });
    await page.goto("/contact");
    await page.getByLabel("Full name").fill("New Founder");
    await page.getByLabel("Email address").fill("founder@gmail.com");
    await page.getByLabel("Message").fill("I have an idea for a clothing brand and need guidance.");
    await page.getByRole("button", { name: "Send request" }).click();
    await expect(page.getByText("Thank you. Your request was sent.")).toBeVisible();
    expect(submitted).toContain("founder@gmail.com");
  });

  test("API accepts name and personal email without optional fields", async ({ request }) => {
    const res = await request.post("/api/quote", { multipart: { name: "New Founder", email: "founder@gmail.com" } });
    expect([200, 503, 502, 429]).toContain(res.status());
    expect((await res.json()).code).not.toBe("invalid");
  });

  test("rejects oversized attachments", async ({ page }) => {
    await page.goto("/contact");
    await page.locator("#attachment").setInputFiles({
      name: "big.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.alloc(5 * 1024 * 1024),
    });
    await expect(page.getByText(/File is too large/)).toBeVisible();
  });

  test("without email configuration, reports honestly that nothing was sent", async ({ page }) => {
    test.skip(!!process.env.RESEND_API_KEY, "integration configured");
    await page.goto("/contact");
    await fill(page);
    await page.getByRole("button", { name: "Send request" }).click();
    await expect(page.locator("form").getByRole("alert")).toContainText("aren’t connected yet");
    await expect(page.getByText("Thank you. Your request was sent.")).toHaveCount(0);
  });

  test("shows success only when the server confirms delivery", async ({ page }) => {
    await page.route("**/api/quote", (route) => route.fulfill({ status: 200, json: { ok: true } }));
    await page.goto("/contact");
    await fill(page);
    await page.getByRole("button", { name: "Send request" }).click();
    await expect(page.getByText("Thank you. Your request was sent.")).toBeVisible();
  });

  test("category quote links preselect the category", async ({ page }) => {
    await page.goto("/contact?category=workwear-uniforms#quote");
    await expect(page.getByLabel("Product category")).toHaveValue("Workwear & Uniforms");
  });

  test("API validates server-side", async ({ request }) => {
    const res = await request.post("/api/quote", { multipart: { name: "", email: "bad" } });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.code).toBe("invalid");
    expect(body.errors.email).toBeTruthy();
  });
});
