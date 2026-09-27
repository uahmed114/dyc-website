// ============================================================
// SITE CONTENT — edit copy, stats, programs, and image paths here
// instead of digging through components. Most pages just map over
// these arrays.
//
// ADDING A PHOTO: drop the image file into /public/images/ then set
// its `image` field below to "/images/your-file.jpg". Leave `image`
// unset (or as null) and the site will show a labeled placeholder
// instead, so nothing ever looks "broken" while photos are pending.
// ============================================================

export const site = {
  name: "Drop Your Case",
  shortName: "DYC",
  tagline: "Your file, dropped at the right university.",
  description:
    "Admissions consultancy helping Pakistani students study in China and Europe — university matching, documents, scholarships, and visas, handled end to end.",
  // Shown in the footer. Keep this: DYC works with partner universities
  // but must not present itself as an official office of any of them.
  disclaimer:
    "Drop Your Case is an independent education consultancy. We work with partner universities but are not an official office or representative of any university or government.",
  email: "info@dropyourcase.com",
  phone: "+1 682 246 1428",
  address: "Plot 252, Suite B, Street 6, I-9/2, Islamabad, Pakistan",
  whatsappUrl: "https://wa.me/16822461428",
  social: {
    facebook: "#",
    instagram: "#",
    tiktok: "#",
    youtube: "#",
  },
};

// ------------------------------------------------------------
// NAVIGATION — top-level items and their dropdown entries.
// Each top-level label also links to its own overview page.
// Add or remove dropdown entries here; the desktop dropdowns and
// the mobile menu both read from this list.
// ------------------------------------------------------------
export type NavChild = { href: string; label: string; note?: string; badge?: string };
export type NavItem = { href: string; label: string; children?: NavChild[] };

export const navMenu: NavItem[] = [
  {
    href: "/destinations",
    label: "Destinations",
    children: [
      { href: "/destinations", label: "All destinations", note: "Compare countries and routes" },
      { href: "/study-in-china", label: "Study in China", note: "Low tuition, CSC & CPEC scholarships" },
      { href: "/study-in-hungary", label: "Study in Hungary", note: "EU degree in Budapest", badge: "New" },
      { href: "/study-in-hungary#pathways", label: "Pathway routes", note: "Thailand or Armenia → Hungary" },
    ],
  },
  {
    href: "/universities",
    label: "Programs",
    children: [
      { href: "/universities#fields", label: "Popular fields of study", note: "MBBS, engineering, business, CS and more" },
      { href: "/study-in-hungary#study", label: "Programmes in Hungary", note: "Business, data & MBA in English" },
      { href: "/universities#campus", label: "Campus life", note: "Budapest, Beijing, Shanghai, Chengdu" },
    ],
  },
  {
    href: "/scholarships",
    label: "Scholarships",
    children: [
      { href: "/scholarships#china", label: "China scholarships", note: "CSC, CPEC and university awards" },
      { href: "/scholarships#hungary", label: "Hungary scholarships", note: "Tuition scholarships on eligible programmes" },
    ],
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "Our story", note: "Who we are and how we work" },
      { href: "/#process", label: "How it works", note: "Six steps from call to departure" },
      { href: "/apply", label: "Contact & apply", note: "Book a free consultation" },
    ],
  },
];

// Flat list of top-level links (used by the footer).
// ------------------------------------------------------------
// PAGE HEADER PHOTOS — the photo shown beside the title at the top
// of a page. null shows a labeled placeholder until you add one.
// ------------------------------------------------------------
export const pageHeroImages: Record<string, ImageField> = {
  programs: "/images/westlake-uni.webp",
  china: "/images/china.jpg",
};

// Key figures shown in the Study in China page header.
export const chinaFacts = [
  { label: "Tuition from", value: "~$2,000 / yr" },
  { label: "Scholarships", value: "CSC · CPEC" },
  { label: "IELTS", value: "Often not needed" },
  { label: "Degrees", value: "HEC & WHO recognized" },
];

export const navLinks = navMenu.map(({ href, label }) => ({ href, label }));

export type ImageField = string | null;

export const heroStats = [
  { label: "Destinations", value: "China · Hungary (EU)", accent: "jade" as const },
  { label: "Scholarships", value: "In both countries", accent: "gold" as const },
  { label: "IELTS to apply", value: "Often not needed*", accent: "none" as const },
  { label: "Part-time work", value: "Up to 30 hrs/wk (HU)", accent: "none" as const },
  { label: "Avg. processing time", value: "3–6 months", accent: "none" as const },
];

// ------------------------------------------------------------
// DESTINATIONS — the countries DYC places students into.
// Kept deliberately at "teaser" depth: enough to be enticing,
// with specifics (fees, scholarship amounts, partner names)
// shared during the consultation.
// ------------------------------------------------------------
export type Destination = {
  slug: string;
  country: string;
  region: string;
  href: string;
  headline: string;
  highlights: string[];
  image: ImageField;
  isNew?: boolean;
};

export const destinations: Destination[] = [
  {
    slug: "china",
    country: "China",
    region: "East Asia",
    href: "/study-in-china",
    headline: "Low tuition, government scholarships, and HEC/WHO-recognized degrees.",
    highlights: [
      "Tuition from around $2,000 a year",
      "CSC & CPEC scholarships, up to full coverage",
      "MBBS, engineering, CS, business and more",
    ],
    image: "/images/china.jpg",
  },
  {
    slug: "hungary",
    country: "Hungary",
    region: "European Union",
    href: "/study-in-hungary",
    headline: "An EU degree in the heart of Budapest, with room to work while you study.",
    highlights: [
      "English-taught bachelor's, master's & MBA",
      "Tuition scholarships and housing support",
      "Work up to 30 hrs/week while studying",
    ],
    image: "/images/budapest.jpg",
    isNew: true,
  },
];

// Pathway routes: begin studies in one country, continue in Hungary.
// Details are intentionally held back for the consultation.
export const pathways = [
  {
    from: "Thailand",
    to: "Hungary",
    body: "Begin at a partner university in Thailand, then continue your studies in the EU.",
  },
  {
    from: "Armenia",
    to: "Hungary",
    body: "Start in Armenia and transfer onward to Budapest through a partner route.",
  },
];

export const hungary = {
  // Main photo on the Study in Hungary page.
  image: "/images/budapest.jpg" as ImageField,
  facts: [
    {
      title: "EU & Schengen",
      body: "Study inside the European Union, with Schengen-area travel across most of Europe.",
    },
    {
      title: "English-taught programmes",
      body: "Foundation year, bachelor's, master's, MBA and post-graduate diplomas, taught fully in English.",
    },
    {
      title: "Scholarships",
      body: "Tuition scholarships are available to international students on eligible programmes.",
    },
    {
      title: "Housing support",
      body: "Help arranging accommodation in Budapest before you arrive.",
    },
    {
      title: "Work while you study",
      body: "Students can work up to 30 hours a week in hospitality, retail, admin and tutoring roles.",
    },
    {
      title: "Stay after graduating",
      body: "Graduates can apply for a 9-month job-search residence permit to look for work in Hungary.",
    },
  ],
  studyAreas: [
    "Foundation year (a route in if you don't yet meet bachelor's entry)",
    "Business, marketing, finance & accounting",
    "Human resource management",
    "International business economics",
    "Business informatics — data analysis & big data",
    "Master's in marketing, and MBA",
    "Post-graduate specialist diplomas",
  ],
  livingCost: "€500–900",
  intakes: "February & September",
};

export const comparisonTable = {
  rows: [
    {
      label: "Annual tuition",
      metricHead: "Metric",
      columns: [
        { title: "China (CSC-eligible)", value: "$0–2,000", accent: true },
        { title: "Pakistan, private med/eng", value: "$4,500+", accent: false },
        { title: "UK / Australia", value: "$14,000+", accent: false },
      ],
    },
    {
      label: "Entry requirement",
      metricHead: "Entry requirement",
      columns: [
        { title: "", value: "IELTS not required*", accent: true },
        { title: "", value: "MDCAT / entry test", accent: false },
        { title: "", value: "IELTS 6.5+", accent: false },
      ],
    },
  ],
  footnote:
    "*For most English-taught programs. Some scholarship tracks or specific universities may still request proof of English proficiency.",
};

export const processSteps = [
  {
    title: "Free consultation",
    tag: "DAY 1",
    body: "We review your academic background, budget, and target field to shortlist realistic universities.",
  },
  {
    title: "University & scholarship matching",
    tag: "WEEK 1–2",
    body: "Personalized shortlist across CSC, CPEC, and university-specific scholarship tracks.",
  },
  {
    title: "Documents & SOP",
    tag: "WEEK 2–4",
    body: "We prepare and proofread transcripts, SOP, recommendation letters, and financial documents.",
  },
  {
    title: "Application submission",
    tag: "WEEK 4–8",
    body: "Your case is filed directly with the university admissions office and tracked to a decision.",
  },
  {
    title: "Visa & logistics",
    tag: "MONTH 3–5",
    body: "Once admitted, we handle visa paperwork, university admission documents, and pre-departure logistics.",
  },
  {
    title: "Departure prep",
    tag: "MONTH 5–6",
    body: "Orientation on housing, halal food access, campus life, part-time work rules, and what to pack.",
  },
];

export type Program = {
  title: string;
  body: string;
  fee: string;
  note: string;
  /** Destinations offering this field — shown as chips on the card. */
  countries: string[];
  /** Photo at the top of the card. Leave null to show a placeholder. */
  image: ImageField;
  /** What the placeholder asks for, until a photo is added. */
  imageHint: string;
};

export const programs: Program[] = [
  {
    title: "MBBS & Medicine",
    body: "6-year MBBS programs at HEC/WHO-recognized medical universities.",
    fee: "$2,500",
    note: "CSC eligible",
    countries: ["China"],
    image: "/images/medical.png",
    imageHint: "medical students in a lab or hospital",
  },
  {
    title: "Engineering",
    body: "Civil, mechanical, electrical & CPEC-aligned engineering tracks.",
    fee: "$1,800",
    note: "CSC eligible",
    countries: ["China"],
    image: "/images/engineering2.jpg",
    imageHint: "engineering lab or workshop",
  },
  {
    title: "Business & MBA",
    body: "Business, finance, marketing and MBA programs taught in English.",
    fee: "$1,600",
    note: "",
    countries: ["China", "Hungary"],
    image: "/images/mba.png",
    imageHint: "students in a lecture or seminar",
  },
  {
    title: "Computer Science",
    body: "CS, software engineering & AI in China; business informatics & big data in Hungary.",
    fee: "$2,000",
    note: "",
    countries: ["China", "Hungary"],
    image: "/images/compsci.jpg",
    imageHint: "students coding or in a computer lab",
  },
  {
    title: "Chinese Language",
    body: "HSK-track preparatory programs, often a bridge into degree programs.",
    fee: "$900",
    note: "",
    countries: ["China"],
    image: "/images/language.jpg",
    imageHint: "language class or Chinese calligraphy",
  },
  {
    title: "Natural Sciences",
    body: "Physics, chemistry, biology & environmental science degrees.",
    fee: "$1,500",
    note: "",
    countries: ["China"],
    image: "/images/nat-sci.webp",
    imageHint: "science lab or field work",
  },
];

export type Campus = {
  city: string;
  country: string;
  body: string;
  image: ImageField;
};

export const campuses: Campus[] = [
  {
    city: "Budapest",
    country: "Hungary",
    body: "Business, informatics & MBA in the EU",
    image: "/images/budapest.jpg",
  },
  {
    city: "Beijing",
    country: "China",
    body: "Politics, HSK & science-focused universities",
    image: "/images/beijing.avif",
  },
  {
    city: "Shanghai",
    country: "China",
    body: "Business, MBA & finance-oriented programs",
    image: "/images/china.jpg",
  },
  {
    city: "Chengdu",
    country: "China",
    body: "Natural sciences & engineering campuses",
    image: "/images/chengdu.webp",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo: ImageField;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I had no IELTS score and thought that ruled me out. DYC matched me to a CSC scholarship for MBBS within two months.",
    name: "Ayesha R.",
    role: "MBBS, Class of 2025",
    photo: null,
  },
  {
    quote:
      "They wrote my SOP, tracked my visa, and even briefed me on halal food near campus before I landed.",
    name: "Hamza K.",
    role: "Computer Science",
    photo: null,
  },
  {
    quote:
      "Full scholarship for my MBA — I paid nothing but my flight. The process page told me exactly what came next.",
    name: "Sana M.",
    role: "MBA, CPEC Scholarship",
    photo: null,
  },
];

export type Scholarship = {
  country: "China" | "Hungary";
  name: string;
  coverage: string;
  eligibility: string;
  bestFor: string;
};

export const scholarships: Scholarship[] = [
  {
    country: "China",
    name: "Chinese Government Scholarship (CSC)",
    coverage: "Full or partial tuition, accommodation, and monthly stipend",
    eligibility: "Strong academic record; varies by degree level and host university",
    bestFor: "Bachelor's, master's, and PhD applicants open to any field",
  },
  {
    country: "China",
    name: "CPEC Scholarship",
    coverage: "Full or partial tuition, tied to CPEC-priority fields",
    eligibility: "Pakistani nationals; priority given to engineering & technical majors",
    bestFor: "Engineering, natural sciences, and technical program applicants",
  },
  {
    country: "China",
    name: "University-specific scholarships",
    coverage: "Varies — often a tuition discount or first-year waiver",
    eligibility: "Set individually by each university; typically merit-based",
    bestFor: "Students who don't qualify for CSC/CPEC but have strong grades",
  },
  {
    country: "Hungary",
    name: "Degree tuition scholarships",
    coverage: "A reduction on yearly tuition for eligible international students; amounts vary by programme",
    eligibility: "Assessed on your academic record at application",
    bestFor: "Bachelor's, master's, MBA and post-graduate diploma applicants",
  },
  {
    country: "Hungary",
    name: "Foundation year scholarship",
    coverage: "Tuition for the English-taught foundation year can be fully covered",
    eligibility: "Students who don't yet meet bachelor's entry requirements",
    bestFor: "A funded route into a bachelor's degree in Budapest",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: ImageField;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "no-ielts-study-in-china",
    title: "Do you really need IELTS to study in China?",
    excerpt:
      "The short answer: usually not. Here's what universities actually require from Pakistani applicants in English-taught programs.",
    date: "2026-06-02",
    readTime: "4 min read",
    image: null,
    body: [
      "One of the most common questions we get from students is whether they need an IELTS score to apply. For most English-taught bachelor's and master's programs in China, the answer is no — universities accept a medium-of-instruction certificate from your previous institution instead.",
      "That said, a small number of highly competitive programs, and some scholarship tracks, do ask for proof of English proficiency. We check this against your specific shortlist during your first consultation, so there are no surprises later in the process.",
      "If you don't have IELTS and were worried it would rule you out entirely, it almost certainly won't — but it's worth confirming case by case before you invest time studying for a test you may not need.",
    ],
  },
  {
    slug: "csc-vs-cpec-scholarships",
    title: "CSC vs. CPEC scholarships: what's the difference?",
    excerpt:
      "Two of the most common funding routes for Pakistani students headed to China, explained side by side.",
    date: "2026-04-18",
    readTime: "5 min read",
    image: null,
    body: [
      "The Chinese Government Scholarship (CSC) is open to students worldwide and can cover tuition, accommodation, and a monthly stipend depending on the award type.",
      "CPEC-specific scholarships are a narrower track tied to the China-Pakistan Economic Corridor, often prioritizing engineering, natural sciences, and technical fields relevant to the corridor's projects.",
      "Which one fits you depends on your intended major, your academic record, and timing — CSC and CPEC application windows don't always line up. We map this out for you as part of the university-matching step of our process.",
    ],
  },
];

export const hungaryFaqs = [
  {
    q: "Do I need IELTS to apply in Hungary?",
    a: "You can apply without an IELTS or TOEFL certificate. Instead, every applicant takes an online interview that assesses their English as part of eligibility. We help you prepare for it.",
  },
  {
    q: "Can I work while studying?",
    a: "Yes. International students in Hungary can work up to 30 hours a week alongside their studies — common roles include hospitality, retail, admin support and tutoring.",
  },
  {
    q: "What does it cost to live in Budapest?",
    a: "Most students budget roughly €500–900 a month for shared housing, food, transport and everyday costs, and a student card unlocks discounts on transport and entertainment. Tuition and scholarship amounts vary by programme; we walk you through them in your consultation.",
  },
  {
    q: "How do the Thailand and Armenia pathways work?",
    a: "You begin your studies at a partner university in Thailand or Armenia, then continue in Hungary. Eligibility and timing depend on your programme, so we map out the route with you one to one.",
  },
  {
    q: "When are the intakes?",
    a: "There are two intakes a year, February and September. Applications for each close several months ahead, so it's worth starting early — especially to leave time for the visa.",
  },
];

export const faqs = [
  {
    q: "Do I need IELTS to study in China?",
    a: "Most English-taught programs we place students into do not require IELTS. Some scholarship tracks or specific universities may still request proof of English proficiency — we'll flag this during your consultation if it applies to your shortlist.",
  },
  {
    q: "Am I eligible for a scholarship?",
    a: "Eligibility depends on your academic record, target program, and which scholarship track fits — CSC, CPEC, or university-specific awards. We assess this for free in your first consultation.",
  },
  {
    q: "Can DYC guarantee admission?",
    a: "No consultancy can guarantee admission — that decision sits with the university. What we guarantee is a complete, correctly prepared application and an honest read on your realistic options.",
  },
  {
    q: "What documents do I need to get started?",
    a: "Typically your academic transcripts, passport copy, and a CV. We'll give you a full checklist specific to your target programs after the first call.",
  },
  {
    q: "How long does the process take?",
    a: "Most cases move from first consultation to visa in 3–6 months, depending on the university's admissions cycle and scholarship deadlines.",
  },
  {
    q: "Is it safe to study in China?",
    a: "Yes — thousands of Pakistani students are currently enrolled across Chinese universities. We also brief every student on campus life, halal food access, and local support before departure.",
  },
];
