/**
 * Single source of truth for Noxel Apparel site content.
 *
 * Rule: nothing here may be invented. Any value the client has not confirmed
 * is `null` and the UI renders it as a visible "To be confirmed" marker.
 * Replace a `null` with the verified value and the placeholder disappears.
 */

export type Maybe<T> = T | null;

export const site = {
  name: "Noxel Apparel",
  // Verified: taken from the official logo lockup.
  tagline: "Precision Built",
  description:
    "Noxel Apparel is a B2B apparel sourcing and manufacturing partner for new brands, established labels and bulk buyers. We offer personal consultancy from your first idea through development, production and delivery coordination.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const nav = [
  { href: "/about", label: "About" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/contact", label: "Contact" },
] as const;

/** Client to confirm every field. Null values render as "To be confirmed". */
export const contact: {
  email: Maybe<string>;
  phone: Maybe<string>;
  whatsapp: Maybe<string>;
  address: Maybe<string>;
  hours: Maybe<string>;
} = {
  email: null,
  phone: null,
  whatsapp: null,
  address: null,
  hours: null,
};

/** Client to confirm. Only non-null entries are rendered. */
export const social: { label: string; href: Maybe<string> }[] = [
  { label: "LinkedIn", href: null },
  { label: "Instagram", href: null },
];

/** Company facts shown on the About page. */
export const companyFacts: { label: string; value: Maybe<string> }[] = [
  { label: "Headquarters", value: null },
  { label: "Established", value: null },
  { label: "Markets served", value: null },
  { label: "Production model", value: null },
];

/**
 * Commercial terms buyers ask about first. Shown on Home as an honest
 * "stated upfront" panel; each stays "To be confirmed" until supplied.
 */
export const commercialTerms: { label: string; value: Maybe<string>; note: string }[] = [
  {
    label: "Minimum order quantity",
    value: null,
    note: "Set per product, fabric and construction.",
  },
  {
    label: "Sampling",
    value: null,
    note: "Sample policy and fees confirmed at quotation.",
  },
  {
    label: "Production lead time",
    value: null,
    note: "Confirmed per order once specifications are agreed.",
  },
  {
    label: "Payment terms",
    value: null,
    note: "Stated in writing on every quotation.",
  },
  {
    label: "Certifications",
    value: null,
    note: "Only certifications actually held will be listed.",
  },
];

export type Category = {
  slug: string;
  title: string;
  /** Confirmed product list for the category. */
  products: string[];
  image: string;
  imageAlt: string;
};

/** Product categories, confirmed by the client. */
export const categories: Category[] = [
  {
    slug: "casual-streetwear",
    title: "Casual & Streetwear",
    products: ["Hoodies", "Cropped hoodies", "Sweatshirts", "T-shirts", "Polo shirts", "Casual shirts", "Tank tops", "Crop tops"],
    image: "/images/categories/casual-streetwear.jpg",
    imageAlt: "Two people wearing black hoodies and sweatshirts against a blue sky",
  },
  {
    slug: "outerwear",
    title: "Outerwear",
    products: ["Bomber jackets", "Quilted jackets"],
    image: "/images/categories/outerwear.jpg",
    imageAlt: "Person wearing a dark burgundy bomber jacket over a shirt and tie",
  },
  {
    slug: "activewear-intimates",
    title: "Activewear & Intimates",
    products: ["Sports bras", "Leggings", "Underwear", "Socks", "Gym tank tops"],
    image: "/images/categories/activewear.jpg",
    imageAlt: "Woman in a burgundy sports bra and leggings against a navy wall",
  },
  {
    slug: "bottoms",
    title: "Bottoms",
    products: ["Cargo pants", "Cargo shorts", "Shorts", "Trousers", "Joggers"],
    image: "/images/categories/bottoms.jpg",
    imageAlt: "Close-up of olive cargo trousers with side pockets and boots",
  },
  {
    slug: "workwear-uniforms",
    title: "Workwear & Uniforms",
    products: ["Hospital & medical uniforms", "Kitchen apparel"],
    image: "/images/categories/workwear-uniforms.jpg",
    imageAlt: "Light blue medical scrubs with a stethoscope",
  },
];

/** Working process. Describes approach only, no timeframes or guarantees. */
export const processSteps = [
  {
    title: "Inquiry",
    body: "Share your idea, even if you are still figuring out how to start a brand. As your manufacturers and personal consultants, we help you work out the next steps together.",
    provide: "An idea or any details you already have; photos and specifications are optional",
    receive: "A direct reply and the questions we need answered to quote accurately",
  },
  {
    title: "Development & prototyping",
    body: "We develop your idea from reference photos, hand sketches or a full technical pack (tech pack). Together we work through design mapping, custom pattern styling, fit adjustments, fabric and finishing.",
    provide: "Your idea, with reference photos, sketches or a tech pack if available",
    receive: "A clarified specification and an itemised quotation",
  },
  {
    title: "Sampling",
    body: "Where the order calls for it, a sample is produced against the agreed specification for your review before bulk production is committed.",
    provide: "Feedback and sign-off on the sample",
    receive: "An approved sample that becomes the production reference",
    conditional: true,
  },
  {
    title: "Production coordination",
    body: "Once approved, production is scheduled and coordinated against the agreed specification, with progress communicated to you through a single point of contact.",
    provide: "Order confirmation per agreed terms",
    receive: "Clear status updates through production",
  },
  {
    title: "Quality checks",
    body: "Goods are checked against the approved sample and specification. Inspection approach and reporting are agreed with you for each order.",
    provide: "Any buyer-specific quality requirements",
    receive: "Quality findings shared before goods are released",
  },
  {
    title: "Delivery coordination",
    body: "Packing and shipment are coordinated to your agreed requirements, with documentation and handover confirmed in writing.",
    provide: "Delivery address, packing and shipping preferences",
    receive: "Coordinated dispatch and shipment details",
  },
] as const;

export const principles = [
  {
    title: "Specification first",
    body: "Every order starts from an agreed, written specification. Ambiguity is resolved before production, not discovered after it.",
  },
  {
    title: "One accountable contact",
    body: "You deal with one point of contact who knows your order end to end, rather than being passed between departments.",
  },
  {
    title: "Transparent quoting",
    body: "Quotations are itemised so you can see what drives cost, and terms are stated in writing before anything is committed.",
  },
  {
    title: "Honest answers",
    body: "If something isn't right for your product, budget or timeline, we tell you plainly. We don't claim what we can't deliver.",
  },
] as const;

/** Quote form options. */
export const timelineOptions = [
  "As soon as possible",
  "Within 1 to 3 months",
  "Within 3 to 6 months",
  "6+ months",
  "Flexible or exploring",
] as const;

/** Attachments: Resend supports them. Kept under typical serverless body limits. */
export const attachment = {
  maxBytes: 4 * 1024 * 1024,
  accept: [".pdf", ".png", ".jpg", ".jpeg", ".webp", ".xlsx", ".xls", ".docx", ".zip"],
};

/**
 * Photography: free-to-use Unsplash images (Unsplash License) used as
 * stand-ins. They do NOT depict Noxel facilities. Replace with Noxel's own
 * photography before launch.
 */
export const photoCredits = [
  { file: "needle-stitch.jpg", source: "https://unsplash.com/photos/WR9B5wMFU4o" },
  { file: "presser-foot.jpg", source: "https://unsplash.com/photos/2FtfCBO3-n4" },
  { file: "machine-detail.jpg", source: "https://unsplash.com/photos/sE0udIZcgGM" },
  { file: "stitch-closeup.jpg", source: "https://unsplash.com/photos/6tilGbJNkcU" },
  { file: "pattern-cutting.jpg", source: "https://unsplash.com/photos/oTvBFTB0wow" },
  { file: "fabric-stacks.jpg", source: "https://unsplash.com/photos/QGNGnXLJDTQ" },
  { file: "hand-finishing.jpg", source: "https://unsplash.com/photos/FBD0n6gSuss" },
  { file: "blank-tee.jpg", source: "https://unsplash.com/photos/8ACmRoleM24" },
  { file: "categories/casual-streetwear.jpg", source: "https://unsplash.com/photos/7_ZNLVlJchs" },
  { file: "categories/outerwear.jpg", source: "https://unsplash.com/photos/9ddeHfQzOIk" },
  { file: "categories/activewear.jpg", source: "https://unsplash.com/photos/AFhg4Ve6vxg" },
  { file: "categories/bottoms.jpg", source: "https://unsplash.com/photos/Jw0d7kuU8g8" },
  { file: "categories/workwear-uniforms.jpg", source: "https://unsplash.com/photos/6LV3V1gLrP8" },
];
