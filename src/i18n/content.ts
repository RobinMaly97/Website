/**
 * All site copy in German + English.
 * Both language objects share the exact same shape (`SiteContent`) so the
 * language toggle can swap them safely and TypeScript guarantees parity.
 */

export type Lang = 'de' | 'en';

export interface SiteContent {
  nav: {
    about: string;
    services: string;
    projects: string;
    process: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    headline: [string, string]; // line 1, accented line 2
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: { value: string; label: string }[];
  };
  about: {
    eyebrow: string;
    heading: string;
    body: string;
    available: string;
    stats: { value: string; label: string }[];
  };
  services: {
    eyebrow: string;
    heading: string;
    sub: string;
    items: { title: string; body: string; list: string[] }[];
  };
  projects: {
    eyebrow: string;
    heading: string;
    sub: string;
    badge: string;
    items: { name: string; category: string; body: string }[];
  };
  process: {
    eyebrow: string;
    heading: string;
    sub: string;
    steps: { title: string; body: string }[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    body: string;
    email: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      gdprBefore: string;
      gdprLink: string;
      gdprAfter: string;
      submit: string;
      sending: string;
      success: string;
      errorRequired: string;
      errorEmail: string;
      errorGdpr: string;
      errorSubmit: string;
    };
  };
  footer: {
    tagline: string;
    pagesHeading: string;
    legalHeading: string;
    impressum: string;
    datenschutz: string;
    agb: string;
    backToTop: string;
  };
}

/** Asset + link metadata for projects — language independent, zipped by index. */
export const projectAssets = [
  {
    icon: '/images/timetrackerprof-icon.webp',
    iconFallback: '/images/timetrackerprof-icon.png',
    screenshot: '/images/timetrackerprof-screen.webp',
    screenshotFallback: '/images/timetrackerprof-screen.png',
    url: 'https://apps.apple.com/de/app/timetrackerprof/id6754637185',
    tags: ['Swift', 'SwiftUI', 'CloudKit'],
    screenScale: 1,
  },
  {
    icon: '/images/finkenkrug-icon.webp',
    iconFallback: '/images/finkenkrug-icon.png',
    screenshot: '/images/finkenkrug-screen.webp',
    screenshotFallback: '/images/finkenkrug-screen.png',
    url: 'https://apps.apple.com/de/app/finkenkrug/id6760216926',
    tags: ['Swift', 'SwiftUI', 'Firebase'],
    screenScale: 1,
  },
] as const;

export const EMAIL = 'robin@maly-development.de';

const de: SiteContent = {
  nav: {
    about: 'Über mich',
    services: 'Leistungen',
    projects: 'Projekte',
    process: 'Vorgehen',
    contact: 'Kontakt',
  },
  hero: {
    eyebrow: 'Freelance App- & Web-Entwickler · Deutschland',
    headline: ['Apps & Websites,', 'die funktionieren.'],
    sub: 'Von der Idee bis zum Launch: Apps, Websites und Full-Stack-Entwicklung — zuverlässig, schnell und persönlich.',
    ctaPrimary: 'Projekt starten',
    ctaSecondary: 'Meine Apps ansehen',
    trust: [
      { value: '2+', label: 'Apps live im Store' },
      { value: 'iOS', label: 'App Store' },
      { value: '100%', label: 'Eigenentwicklung' },
    ],
  },
  about: {
    eyebrow: 'Über mich',
    heading: 'Ich entwickle Apps & Websites, die dein Geschäft voranbringen.',
    body: 'Hallo, ich bin Robin Maly — freier Software-Entwickler aus Deutschland. Ich entwickle maßgeschneiderte Apps und Websites, die nicht nur schön aussehen, sondern echte Probleme lösen. Mit meinen Apps TimeTrackerProf und Finkenkrug habe ich bewiesen, dass ich von der Idee bis zum fertigen Produkt liefere.',
    available: 'Verfügbar für neue Projekte',
    stats: [
      { value: '2', label: 'Live-Apps' },
      { value: 'Web', label: '& Mobile' },
      { value: 'DE', label: 'Freelancer' },
    ],
  },
  services: {
    eyebrow: 'Leistungen',
    heading: 'Was ich für dich entwickle.',
    sub: 'Von der ersten Idee bis zur Veröffentlichung — alles aus einer Hand, zuverlässig und transparent.',
    items: [
      {
        title: 'App-Entwicklung',
        body: 'Native Apps für iOS und Android — vom MVP bis zum fertigen Produkt. Schnell, fokussiert und marktreif, damit du deine Idee validierst und Nutzer gewinnst.',
        list: [
          'Native iOS & Android',
          'Schnelle Time-to-Market',
          'Iterative Entwicklung',
          'App Store Publishing',
        ],
      },
      {
        title: 'Web-Entwicklung',
        body: 'Moderne Websites und Landing Pages — schnell, responsive und SEO-optimiert. Von der Idee bis zum Go-Live, individuell für deine Marke entwickelt.',
        list: [
          'Websites & Landing Pages',
          'Responsive & SEO-optimiert',
          'Top Performance & Core Web Vitals',
          'Barrierefrei & zugänglich',
        ],
      },
      {
        title: 'Full-Stack & Backend',
        body: 'Backend-APIs, Datenbanken, Auth-Systeme und Cloud-Infrastruktur — alles entwickelt, getestet und deployed. Eine Ansprechperson für dein gesamtes digitales Produkt.',
        list: [
          'REST- & GraphQL-APIs',
          'Cloud-Infrastruktur',
          'Authentifizierung & Sicherheit',
          'Datenbank-Design',
        ],
      },
      {
        title: 'Wartung & Support',
        body: 'Ich halte App und Website aktuell, sicher und schnell — als verlässlicher Partner im Hintergrund. Du fokussierst dich aufs Business, ich kümmere mich um die Technik.',
        list: [
          'Updates & Dependency-Pflege',
          'Bug-Fixes & Performance',
          'Hosting & Monitoring',
          'Priorisierter Support',
        ],
      },
    ],
  },
  projects: {
    eyebrow: 'Projekte',
    heading: 'Live im App Store.',
    sub: 'Eigene Apps, die ich von Grund auf entwickelt und im Apple App Store veröffentlicht habe.',
    badge: 'Live',
    items: [
      {
        name: 'TimeTrackerProf',
        category: 'Produktivität · iOS & Android',
        body: 'Schluss mit Papierkram — professionelle Zeiterfassung für Freelancer und Selbstständige. Zeiten erfassen, Projekte verwalten und Berichte exportieren.',
      },
      {
        name: 'Finkenkrug',
        category: 'Gastronomie · iOS',
        body: 'Die offizielle App der legendären Studentenkneipe Finkenkrug in Duisburg — Veranstaltungen, Speise- & Getränkekarten, Jobs und Merch, alles in einer App.',
      },
    ],
  },
  process: {
    eyebrow: 'Vorgehen',
    heading: 'So arbeiten wir zusammen.',
    sub: 'Transparent, strukturiert und immer auf Augenhöhe — so läuft ein Projekt mit mir ab.',
    steps: [
      {
        title: 'Gespräch & Analyse',
        body: 'Wir besprechen deine Idee, Ziele und technischen Anforderungen in einem kostenlosen Erstgespräch. Kein Fachjargon, nur ehrliche Einschätzung.',
      },
      {
        title: 'Konzept & Angebot',
        body: 'Du erhältst ein klares Konzept mit Umfang, Zeitplan und Festpreis — keine versteckten Kosten, keine Überraschungen.',
      },
      {
        title: 'Entwicklung & Feedback',
        body: 'Ich entwickle iterativ und zeige dir regelmäßig Zwischenstände. Dein Feedback fließt direkt ein — so entsteht genau das, was du dir vorstellst.',
      },
      {
        title: 'Launch & Support',
        body: 'Ich begleite dich beim App Store Publishing und stehe auch nach dem Launch für Fragen und Anpassungen zur Verfügung.',
      },
    ],
  },
  contact: {
    eyebrow: 'Kontakt',
    heading: 'Lass uns dein Projekt besprechen.',
    body: 'Füll das Formular aus oder schreib mir direkt — ich melde mich innerhalb von 24 Stunden bei dir.',
    email: EMAIL,
    form: {
      name: 'Dein Name',
      namePlaceholder: 'Max Mustermann',
      email: 'E-Mail-Adresse',
      emailPlaceholder: 'max@beispiel.de',
      subject: 'Betreff',
      subjectPlaceholder: 'App-Entwicklung für mein Startup',
      message: 'Deine Nachricht',
      messagePlaceholder: 'Erzähl mir von deiner Idee — je mehr Details, desto besser.',
      gdprBefore: 'Ich habe die ',
      gdprLink: 'Datenschutzerklärung',
      gdprAfter: ' gelesen und stimme der Verarbeitung meiner Daten zu.',
      submit: 'Nachricht senden',
      sending: 'Wird gesendet …',
      success: 'Danke! Ich melde mich so bald wie möglich bei dir.',
      errorRequired: 'Bitte fülle dieses Feld aus.',
      errorEmail: 'Bitte gib eine gültige E-Mail-Adresse ein.',
      errorGdpr: 'Bitte stimme der Datenschutzerklärung zu.',
      errorSubmit: 'Etwas ist schiefgelaufen. Bitte schreib mir direkt per E-Mail.',
    },
  },
  footer: {
    tagline: 'Softwareentwicklung aus Deutschland.',
    pagesHeading: 'Seiten',
    legalHeading: 'Rechtliches',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    agb: 'AGB',
    backToTop: 'Nach oben',
  },
};

const en: SiteContent = {
  nav: {
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    process: 'Process',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'Freelance App & Web Developer · Germany',
    headline: ['Apps & websites', 'that just work.'],
    sub: 'From idea to launch: apps, websites and full-stack development — reliable, fast, and personal.',
    ctaPrimary: 'Start a Project',
    ctaSecondary: 'See My Apps',
    trust: [
      { value: '2+', label: 'Apps live in store' },
      { value: 'iOS', label: 'App Store' },
      { value: '100%', label: 'Self-developed' },
    ],
  },
  about: {
    eyebrow: 'About Me',
    heading: 'I build apps & websites that move your business forward.',
    body: "Hi, I'm Robin Maly — freelance software developer based in Germany. I build tailor-made apps and websites that don't just look great, but solve real problems. With my apps TimeTrackerProf and Finkenkrug, I've proven that I can deliver from idea to finished product.",
    available: 'Available for new projects',
    stats: [
      { value: '2', label: 'Live Apps' },
      { value: 'Web', label: '& Mobile' },
      { value: 'DE', label: 'Freelancer' },
    ],
  },
  services: {
    eyebrow: 'Services',
    heading: 'What I build for you.',
    sub: 'From first idea to launch — everything from one source, reliable and transparent.',
    items: [
      {
        title: 'App Development',
        body: 'Native apps for iOS and Android — from MVP to finished product. Fast, focused, and market-ready, so you can validate your idea and win users.',
        list: [
          'Native iOS & Android',
          'Fast time-to-market',
          'Iterative development',
          'App Store publishing',
        ],
      },
      {
        title: 'Web Development',
        body: 'Modern websites and landing pages — fast, responsive, and SEO-optimized. From idea to go-live, built individually for your brand.',
        list: [
          'Websites & landing pages',
          'Responsive & SEO-optimized',
          'Top performance & Core Web Vitals',
          'Accessible & inclusive',
        ],
      },
      {
        title: 'Full-Stack & Backend',
        body: 'Backend APIs, databases, auth systems, and cloud infrastructure — all developed, tested, and deployed. One contact for your entire digital product.',
        list: [
          'REST & GraphQL APIs',
          'Cloud infrastructure',
          'Authentication & security',
          'Database design',
        ],
      },
      {
        title: 'Maintenance & Support',
        body: 'I keep your app and website up to date, secure, and fast — a reliable partner in the background. You focus on your business, I handle the tech.',
        list: [
          'Updates & dependency care',
          'Bug fixes & performance',
          'Hosting & monitoring',
          'Priority support',
        ],
      },
    ],
  },
  projects: {
    eyebrow: 'Projects',
    heading: 'Live on the App Store.',
    sub: 'My own apps, built from scratch and published on the Apple App Store.',
    badge: 'Live',
    items: [
      {
        name: 'TimeTrackerProf',
        category: 'Productivity · iOS & Android',
        body: 'No more paperwork — professional time tracking for freelancers and the self-employed. Log hours, manage projects, and export reports.',
      },
      {
        name: 'Finkenkrug',
        category: 'Hospitality · iOS',
        body: 'The official app for the legendary Finkenkrug student bar in Duisburg — events, food & drink menus, jobs and merch, all in one app.',
      },
    ],
  },
  process: {
    eyebrow: 'Process',
    heading: 'How we work together.',
    sub: 'Transparent, structured, and always at eye level — this is how a project with me works.',
    steps: [
      {
        title: 'Discovery Call',
        body: 'We discuss your idea, goals, and technical requirements in a free initial call. No jargon, just honest assessment.',
      },
      {
        title: 'Concept & Quote',
        body: 'You receive a clear concept with scope, timeline, and fixed price — no hidden costs, no surprises.',
      },
      {
        title: 'Development & Feedback',
        body: 'I develop iteratively and show you regular progress updates. Your feedback flows in directly — resulting in exactly what you envisioned.',
      },
      {
        title: 'Launch & Support',
        body: 'I support you through App Store publishing and remain available for questions and adjustments after launch.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    heading: "Let's talk about your project.",
    body: "Fill out the form or write me directly — I'll get back to you within 24 hours.",
    email: EMAIL,
    form: {
      name: 'Your Name',
      namePlaceholder: 'John Doe',
      email: 'Email Address',
      emailPlaceholder: 'john@example.com',
      subject: 'Subject',
      subjectPlaceholder: 'App development for my startup',
      message: 'Your Message',
      messagePlaceholder: 'Tell me about your idea — the more details, the better.',
      gdprBefore: 'I have read the ',
      gdprLink: 'Privacy Policy',
      gdprAfter: ' and agree to the processing of my data.',
      submit: 'Send Message',
      sending: 'Sending …',
      success: "Thank you! I'll get back to you as soon as possible.",
      errorRequired: 'Please fill out this field.',
      errorEmail: 'Please enter a valid email address.',
      errorGdpr: 'Please agree to the privacy policy.',
      errorSubmit: 'Something went wrong. Please email me directly.',
    },
  },
  footer: {
    tagline: 'Software development from Germany.',
    pagesHeading: 'Pages',
    legalHeading: 'Legal',
    impressum: 'Legal Notice',
    datenschutz: 'Privacy Policy',
    agb: 'Terms',
    backToTop: 'Back to top',
  },
};

export const content: Record<Lang, SiteContent> = { de, en };
