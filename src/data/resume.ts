/**
 * Single source of truth for the portfolio.
 * Items marked `confirm: true` are placeholders to replace with confirmed details.
 */

export const profile = {
  name: "Mahesh Jillela",
  title: "Front-End Game Developer",
  headline: "Building immersive HTML5 casino games, crash games & interactive web experiences.",
  location: "Hyderabad, India",
  email: "maheshjillela6@gmail.com",
  phone: "9347612425",
  github: "https://github.com/MaheshJillela",
  linkedin: "https://www.linkedin.com/in/mahesh-jillela",
  description:
    "Front-end game developer building production HTML5 slot, crash and instant games with PixiJS — plus modern React applications.",
  descriptionPoints: [
    "HTML5 casino games",
    "PixiJS rendering",
    "Game UI + animation systems",
    "Performance optimisation",
    "React applications",
  ] as string[],
  chain: ["Design", "Render", "Animate", "Optimise", "Ship"],
  heroTech: ["PixiJS", "React", "TypeScript", "JavaScript", "HTML5 Canvas", "Spine", "AWS"],
};

export const positioning = {
  core: "Game frontend",
  extended: ["PixiJS", "Canvas", "Spine", "Game UI", "Animation", "Performance", "React"],
  statement:
    "Game frontend is my specialisation — rendering, animation and interaction under a 60fps budget — and I carry the same engineering standard into React applications and internal developer tooling.",
};

export const aboutPoints = [
  {
    k: "Game frontend first",
    v: "Professional front-end game developer building HTML5 slot games, crash games and instant games for production.",
  },
  {
    k: "PixiJS rendering",
    v: "Canvas and WebGL rendering with PixiJS: scene graphs, sprite sheets, asset loading and draw-call budgets.",
  },
  {
    k: "Game UI & animation",
    v: "Betting interfaces, bonus screens, reels and result reveals built as reusable animation systems, with Spine integration.",
  },
  {
    k: "Responsive game UI",
    v: "Game layouts that survive portrait, landscape, notches and low-end devices without losing framerate.",
  },
  {
    k: "React applications",
    v: "Modern React + TypeScript application work: component architecture, state and frontend architecture decisions.",
  },
  {
    k: "Python tooling",
    v: "Python for scripting, automation and developer tooling around asset pipelines — programming, not AI/ML.",
  },
  {
    k: "Ship & debug",
    v: "AWS deployment (S3 + CloudFront), performance profiling and debugging real production issues.",
  },
];

/** Gaming experience — the specialisation section between Experience and Projects. */
export const gamingExperience = {
  title: "Building Interactive Casino Experiences",
  lead: "HTML5 game frontend, end to end: from asset pipeline to a game that holds framerate on a three-year-old phone.",
  cards: [
    { icon: "dice", title: "HTML5 slot games", body: "Reels, spin cycles, paylines and win presentation built on PixiJS." },
    { icon: "trending", title: "Crash games", body: "Real-time multiplier curves, live state and instant bet/cashout feedback." },
    { icon: "zap", title: "Instant games", body: "Short-loop game formats with immediate reveal and result animation." },
    { icon: "layout", title: "Game UI", body: "HUD, wallet, history and settings surfaces designed for thumb reach." },
    { icon: "sparkles", title: "Bonus screens", body: "Feature rounds, transitions and celebration sequences." },
    { icon: "coins", title: "Betting interfaces", body: "Stake selectors, auto-play and bet validation states." },
    { icon: "smartphone", title: "Responsive layouts", body: "Portrait and landscape scaling across phone, tablet and desktop." },
    { icon: "film", title: "Animation systems", body: "Reusable timelines and tween layers instead of one-off animations." },
    { icon: "bone", title: "Spine integration", body: "Skeletal animation wired into game state and event flow." },
    { icon: "cpu", title: "PixiJS rendering", body: "Scene graph, containers, batching and texture management." },
    { icon: "download", title: "Asset loading", body: "Sprite sheets, TexturePacker atlases, preloaders and progress." },
    { icon: "gauge", title: "Performance", body: "Frame budgets, GPU/CPU profiling and memory cleanup." },
    { icon: "monitor", title: "Cross-device", body: "Browser and device matrix testing on real hardware." },
    { icon: "workflow", title: "Game state", body: "Deterministic state machines between idle, play and result." },
    { icon: "brush", title: "Visual polish", body: "Easing, timing and micro-feedback that make a game feel good." },
    { icon: "bug", title: "Production debugging", body: "Reproducing and fixing live rendering and state issues." },
  ],
};

/** Animated achievement counters. */
export const metrics = [
  { value: 12, suffix: "+", label: "HTML5 games built", note: "Slot, crash and instant formats" },
  { value: 40, suffix: "+", label: "Production features delivered", note: "Shipped to live players" },
  { value: 2, suffix: "", label: "Internal developer tools created", note: "Pixoma and supporting tooling" },
  { value: 20, suffix: "+", label: "Technologies used", note: "Rendering, frontend, cloud" },
  { value: 30, suffix: "+", label: "Performance optimisations", note: "Frame, memory and load time" },
  { value: 80, suffix: "+", label: "UI components developed", note: "Game and application surfaces" },
];

export const philosophy = {
  title: "Engineering Interactive Experiences",
  statement:
    "I enjoy building software where graphics, performance, interaction and user experience come together. Whether it's a casino slot game, a crash game, an internal development tool like Pixoma, or a React application, I enjoy solving engineering problems that make products feel polished, responsive and enjoyable to use.",
  pillars: [
    { k: "Graphics", v: "Rendering decisions made on purpose, not by accident." },
    { k: "Performance", v: "A frame budget is a product requirement." },
    { k: "Interaction", v: "Every input needs an immediate, readable response." },
    { k: "Experience", v: "Polish is what people actually remember." },
  ],
};

/** Pixoma — internal game development toolkit. */
export const pixoma = {
  name: "Pixoma",
  subtitle: "Internal Game Development Toolkit",
  url: "https://pixoma.qishub.in/",
  urlLabel: "pixoma.qishub.in",
  lead:
    "An internal productivity platform that streamlines the pre-development workflow for HTML5 casino games.",
  body:
    "Artists, animators, designers and developers collaborate before production begins — visualising assets, inspecting atlases and previewing animation before a single game screen is built.",
  panels: [
    { label: "Spine preview", note: "Load a skeleton, scrub animations, verify naming" },
    { label: "Timeline editor", note: "Sequence events and check timing before code" },
    { label: "Sprite sheet animator", note: "Play frame sequences at target framerate" },
    { label: "TexturePacker integration", note: "Inspect atlases, frames and trim data" },
    { label: "Audio sync", note: "Align sound cues against animation frames" },
    { label: "Image sequence preview", note: "Review renders as motion, not stills" },
    { label: "Pixi Graphics generation", note: "Generate Pixi objects from visual setups" },
    { label: "Animation state view", note: "Visualise states and transitions" },
    { label: "Asset organisation", note: "Structure assets the way the game expects" },
    { label: "Pre-dev validation", note: "Catch broken assets before production" },
  ],
  caseStudy: {
    problem:
      "Game assets were validated only once development started — broken atlases, mis-named Spine animations and wrong timing surfaced late and cost days.",
    goal:
      "Give the art and dev teams one place to inspect, preview and validate assets before production begins.",
    architecture:
      "PixiJS rendering surface inside a React + TypeScript dashboard, with a preview runtime for Spine, sprite sheets and image sequences, and an asset inspection layer over TexturePacker atlases.",
    technologies: ["PixiJS", "React", "TypeScript", "HTML5 Canvas", "Spine", "TexturePacker", "Node.js", "AWS"],
    challenges:
      "Rendering many independent previews without leaking GPU memory, and keeping audio aligned with frame-based animation.",
    role:
      "Frontend and rendering engineering: preview runtime, dashboard UI, animation tooling and asset inspection.",
    results:
      "Pre-development asset issues get caught before production, and non-developers can review animation without a game build.",
    learnings:
      "Developer tooling is a product: the workflow it removes matters more than the features it adds.",
  },
};

export const gameProjects = [
  {
    title: "HTML5 slot games",
    note: "Reels, paylines, bonus rounds and win presentation",
    tech: ["PixiJS", "Spine", "TypeScript"],
  },
  {
    title: "Crash games",
    note: "Live multiplier curve, bet and cashout states",
    tech: ["PixiJS", "Canvas", "WebSockets"],
  },
  {
    title: "Instant games",
    note: "Short-loop formats with immediate reveal",
    tech: ["PixiJS", "TypeScript"],
  },
];

export const webProjects = [
  {
    title: "React applications",
    note: "Component architecture, typed API layers and dynamic state",
    tech: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "This portfolio",
    note: "PixiJS canvas layers, Framer Motion transitions, static build",
    tech: ["React", "PixiJS", "Framer Motion"],
  },
];


export const frontendCore = [
  {
    id: "rendering",
    title: "Rendering",
    lead: "PixiJS and HTML5 Canvas: the layer that decides whether a game feels alive.",
    items: [
      "PixiJS scene graph",
      "Containers and batching",
      "Sprite sheets / atlases",
      "Texture management",
      "Canvas + WebGL",
      "Draw-call budgets",
      "Resolution / DPR scaling",
      "Memory cleanup",
    ],
  },
  {
    id: "animation",
    title: "Animation systems",
    lead: "Reusable timelines and Spine skeletons wired to game state, not one-off tweens.",
    items: [
      "Spine integration",
      "Frame sequences",
      "Tween / timeline layers",
      "Easing and timing",
      "Reel + reveal sequences",
      "Bonus transitions",
      "Audio synchronisation",
      "State-driven animation",
    ],
  },
  {
    id: "gameui",
    title: "Game UI",
    lead: "Betting interfaces, HUDs and bonus screens built for thumbs and small screens.",
    items: [
      "Betting interfaces",
      "Auto-play controls",
      "Wallet + history",
      "Bonus screens",
      "Responsive game layouts",
      "Portrait / landscape",
      "Touch targets",
      "Loading + error states",
    ],
  },
  {
    id: "performance",
    title: "Performance",
    lead: "A frame budget is a product requirement, verified on real low-end devices.",
    items: [
      "60fps budgets",
      "GPU / CPU profiling",
      "Asset load optimisation",
      "Preloaders",
      "Cross-device testing",
      "Production debugging",
    ],
  },
  {
    id: "react",
    title: "React applications",
    lead: "Modern React + TypeScript work outside the canvas: architecture, state, tooling.",
    items: [
      "Component architecture",
      "TypeScript contracts",
      "Reusable UI components",
      "Application state",
      "REST API integration",
      "Tailwind design tokens",
      "Vite builds",
      "Developer tooling",
    ],
  },
];


export const requestFlow = [
  { node: "User", note: "An intent: a tap, a click, a form" },
  { node: "Frontend", note: "Event handling, UI state, validation" },
  { node: "API request", note: "REST call, JSON payload, auth header" },
  { node: "Node.js / Backend", note: "Request handling and server-side logic" },
  { node: "Database / Redis / External services", note: "Persistence, cache, third parties" },
  { node: "API response", note: "Status, payload, or error to handle" },
  { node: "Frontend", note: "State update, loading resolved, UI renders" },
  { node: "User", note: "Result on screen" },
];

export const apiSkills = [
  "REST APIs",
  "API requests / responses",
  "Authentication",
  "Data handling",
  "Error handling",
  "Loading states",
  "API integration",
  "JSON",
  "Backend communication",
];

export const nodeWork = {
  lead: "Practical, not my specialisation — production-tested through Luvis.",
  items: [
    "Backend services",
    "APIs",
    "Request handling",
    "Server-side logic",
    "External service integration",
    "Email / mailing functionality",
    "Push notification systems",
    "Payment-related backend communication",
    "Logging",
    "Production debugging",
  ],
};

export const cloudPipeline = [
  { node: "Local development", note: "Build and verify locally" },
  { node: "Build", note: "Production build output" },
  { node: "Cloud server", note: "AWS / Linux server environment" },
  { node: "Application process", note: "Process started and kept alive" },
  { node: "Domain", note: "Domain and application configuration" },
  { node: "Users", note: "Real traffic on a real URL" },
];

export const cloudSkills = [
  "AWS",
  "Cloud servers",
  "Linux servers",
  "Server environments",
  "Domain / application configuration",
  "Deployment workflows",
  "Process management",
  "Production troubleshooting",
];

export const serverPanels = [
  { id: "application", label: "Application", body: "Built application served from the server environment." },
  { id: "process", label: "Process", body: "Process started, stopped and restarted during deploys." },
  { id: "logs", label: "Logs", body: "Application and error logs inspected while debugging." },
  { id: "memory", label: "Memory", body: "Memory usage checked when a process misbehaves." },
  { id: "cpu", label: "CPU", body: "CPU load checked against slow or stuck requests." },
  { id: "network", label: "Network", body: "Ports, domain routing and reachability verified." },
];

export const serverManagement = {
  linux: [
    "Linux",
    "SSH",
    "Files",
    "Permissions",
    "Processes",
    "Logs",
    "Configuration",
    "Server troubleshooting",
  ],
  processChain: ["Application", "Process", "Server", "Logs", "Monitoring"],
  actions: [
    "Deploy applications",
    "Start / stop / restart services",
    "Inspect logs",
    "Check memory and CPU",
    "Troubleshoot production issues",
    "Safely update builds",
  ],
  note: "Process management with tools such as PM2 where applicable.",
};

export const luvis = {
  name: "Luvis",
  subtitle: "A Production Gaming Application",
  url: "https://luvis.site",
  urlLabel: "luvis.site",
  lead: "Not a website. An ecosystem of connected systems.",
  subsystems: [
    { label: "Web application", note: "User-facing interfaces and application shell" },
    { label: "Game experience", note: "Interactive, game-related interfaces" },
    { label: "Admin panel", note: "Operational view over the application" },
    { label: "Push notifications", note: "Event-driven delivery to users" },
    { label: "APIs", note: "REST communication layer" },
    { label: "Payment system", note: "Gateway integration and transaction state" },
    { label: "Redis", note: "Caching for frequently accessed data" },
    { label: "Database", note: "Persistent application data" },
    { label: "Mailing", note: "Server-side transactional email" },
    { label: "Server / cloud infrastructure", note: "Hosting, processes and deployment" },
  ],
  role: [
    {
      group: "Frontend",
      primary: true,
      items: [
        "User-facing interfaces",
        "Interactive UI",
        "Game-related interfaces",
        "Responsive experiences",
        "API integration",
        "UI states",
        "Animations and interactions",
      ],
    },
    {
      group: "Application integration",
      items: [
        "API communication",
        "Backend integration",
        "Data handling",
        "Authentication-related flows",
        "Error handling",
      ],
    },
    {
      group: "Production",
      items: [
        "Deployment",
        "Server hosting",
        "Node.js services",
        "Linux environment",
        "Process management",
        "Logs",
        "Troubleshooting",
      ],
    },
    {
      group: "Supporting systems",
      items: [
        "Payment gateway integration",
        "Redis caching",
        "Mailing",
        "Push notifications",
        "Admin panel",
        "Logging",
        "Database interactions",
      ],
    },
  ],
  adminModules: [
    { label: "Users", note: "User records and account state" },
    { label: "Application management", note: "Game / application configuration" },
    { label: "Transactions", note: "Payment and transaction records" },
    { label: "Logs", note: "Request and error activity" },
    { label: "System activity", note: "Operational overview" },
    { label: "Configuration", note: "Application settings" },
    { label: "Notifications", note: "Notification triggers and history" },
  ],
  notificationFlow: [
    "Admin / system event",
    "Backend",
    "Notification service",
    "Push delivery",
    "User device",
    "Notification",
    "User opens app",
  ],
  notificationWork: [
    "Triggering notifications",
    "Backend communication",
    "User / device targeting where applicable",
    "Notification events",
    "Handling notification-related flows",
    "Connecting frontend behaviour with backend notification systems",
  ],
  paymentFlow: [
    "Player / user",
    "Frontend",
    "Payment request",
    "Backend",
    "Payment gateway",
    "Payment response",
    "Validation",
    "Database",
    "Application state",
    "User",
  ],
  paymentWork: [
    "Payment gateway integration",
    "Payment requests",
    "Success / failure handling",
    "Transaction state",
    "Backend validation",
    "External service communication",
    "Error handling",
    "Database recording",
    "Frontend payment states",
  ],
  redisWork: [
    "Faster access to frequently requested data",
    "Fewer repeated database queries",
    "Lower database load under traffic",
    "Backend ↔ cache interaction",
    "Cache hit and cache miss handling",
  ],
  databaseWork: [
    "Persistent application data",
    "Database operations",
    "API ↔ database interaction",
    "Reading and writing data",
    "Data validation",
    "Error handling",
  ],
  mailFlow: ["Application event", "Node.js", "Mail service", "SMTP / provider", "User email"],
  mailWork: [
    "Triggered emails",
    "Transactional messages",
    "Backend email flow",
    "Configuration",
    "Authentication",
    "Error handling",
    "Debugging delivery problems",
  ],
  loggingWork: [
    "Debug issues",
    "Understand system behaviour",
    "Track requests",
    "Investigate failures",
    "Diagnose production problems",
    "Identify bottlenecks",
  ],
  deployFlow: ["Code", "Build", "Upload / deploy", "Server", "Node process", "Domain", "Users"],
  deployWork: [
    "Hosting applications",
    "Cloud / server deployment",
    "Linux",
    "Process management",
    "Application builds",
    "Server logs",
    "Restarting services",
    "Production troubleshooting",
  ],
  /** Replace with confirmed vendor names before publishing. */
  placeholders: [
    { k: "Payment provider", v: "To confirm" },
    { k: "Push provider", v: "To confirm" },
    { k: "Database engine", v: "To confirm" },
    { k: "Mail provider / SMTP", v: "To confirm" },
  ],
};

export const luvisArchitecture = {
  nodes: [
    { id: "user", label: "User", body: "Every request starts with a real player." },
    { id: "web", label: "Web app", body: "Frontend application and game interfaces." },
    { id: "admin", label: "Admin panel", body: "Operational interface over the same APIs." },
    { id: "api", label: "API", body: "REST layer between interfaces and services." },
    { id: "node", label: "Node.js", body: "Request handling, server-side logic, integrations." },
    { id: "redis", label: "Redis", body: "Cache for frequently accessed data." },
    { id: "db", label: "Database", body: "Persistent application data." },
    { id: "payment", label: "Payment", body: "Gateway integration and validation." },
    { id: "notify", label: "Notifications", body: "Event-driven push delivery." },
    { id: "server", label: "Server / cloud", body: "Linux server, process, domain." },
    { id: "logging", label: "Logging", body: "Traces of what actually happened." },
  ],
};

export const demoLogs = [
  { tag: "API", level: "INFO", msg: "Request received" },
  { tag: "API", level: "INFO", msg: "User authenticated" },
  { tag: "API", level: "INFO", msg: "API request processed" },
  { tag: "CACHE", level: "INFO", msg: "Cache lookup" },
  { tag: "DATABASE", level: "INFO", msg: "Database operation" },
  { tag: "PAYMENT", level: "INFO", msg: "Payment request" },
  { tag: "NOTIFICATION", level: "INFO", msg: "Notification triggered" },
  { tag: "API", level: "INFO", msg: "Response sent" },
  { tag: "ERROR", level: "ERROR", msg: "Upstream timeout — retried" },
];

export const logFilters = ["ALL", "API", "PAYMENT", "CACHE", "DATABASE", "NOTIFICATION", "ERROR"];

export const fullFlow = [
  { step: "User clicks", note: "Interaction captured in the UI" },
  { step: "Frontend event", note: "Handler runs, state moves to loading" },
  { step: "API request", note: "REST call with payload and auth" },
  { step: "Node.js", note: "Request handling and routing" },
  { step: "Authentication / validation", note: "Is the caller allowed, is the input valid" },
  { step: "Redis", note: "Cache checked before the database" },
  { step: "Database if required", note: "Read or write persistent data" },
  { step: "External service if required", note: "Payment, mail or notification" },
  { step: "Response", note: "Status and payload returned" },
  { step: "Frontend update", note: "State resolved, UI re-renders" },
  { step: "Logging", note: "The request leaves a trace" },
  { step: "User sees result", note: "Interface reflects reality" },
];

export const techStack = [
  {
    group: "Primary — Frontend",
    primary: true,
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Modern UI development",
      "Responsive design",
      "Interactive experiences",
      "PixiJS / Canvas",
    ],
  },
  {
    group: "Backend / Application",
    items: ["Node.js", "REST APIs", "API integration", "Python", "Flask"],
  },
  { group: "Data", items: ["Redis", "MySQL", "SQL"] },
  {
    group: "Infrastructure",
    items: ["AWS", "Cloud servers", "Linux", "PM2 / process management", "Deployment", "Server management"],
  },
  {
    group: "Production systems",
    items: ["Payment integration", "Push notifications", "Mailing", "Logging", "Admin panels"],
  },
];

export const constellation = {
  center: "MAHESH",
  ring1: ["FRONTEND"],
  ring2: ["JAVASCRIPT", "UI", "RESPONSIVE", "API INTEGRATION", "ANIMATION"],
  ring3: [
    "NODE.JS",
    "REDIS",
    "DATABASE",
    "PAYMENTS",
    "NOTIFICATIONS",
    "SERVER",
    "AWS",
    "LINUX",
  ],
};

export const skillNotes: Record<string, string> = {
  FRONTEND: "Core expertise — interactive, responsive, production interfaces.",
  JAVASCRIPT: "Primary language for browser-side logic and API integration.",
  UI: "Component-based development and reusable interface pieces.",
  RESPONSIVE: "Mobile-first layouts verified across devices and browsers.",
  "API INTEGRATION": "REST requests, JSON handling, auth, errors and loading states.",
  ANIMATION: "Transitions, micro-interactions and canvas animation.",
  "NODE.JS": "Hands-on experience supporting production services on Luvis.",
  REDIS: "Caching frequently accessed data to reduce database load.",
  DATABASE: "Persistent application data, reads, writes and validation.",
  PAYMENTS: "Payment gateway integration, validation and transaction state.",
  NOTIFICATIONS: "Event-driven push notification flows end to end.",
  SERVER: "Linux server work: processes, logs, configuration, troubleshooting.",
  AWS: "Cloud hosting and asset delivery for production applications.",
  LINUX: "SSH, files, permissions, processes and log inspection.",
};

export const mindset = {
  typical: ["UI", "Browser"],
  mine: [
    "UI",
    "API",
    "Backend",
    "Cache",
    "Database",
    "External services",
    "Server",
    "Logs",
    "User",
  ],
  statement: "I care about what happens after a user clicks the button.",
};

export const principles = [
  { id: "01", title: "Build for the user.", body: "The interface is judged by the person using it, not by the code behind it." },
  { id: "02", title: "Understand the system behind the UI.", body: "A screen is one layer of a request that crosses APIs, caches, databases and servers." },
  { id: "03", title: "Debug the root cause.", body: "Reproduce, trace the request, read the logs — then fix the cause, not the symptom." },
  { id: "04", title: "Make production a first-class concern.", body: "Deployment, processes and logs are part of the work, not someone else's step." },
  { id: "05", title: "Keep interfaces fast and intuitive.", body: "Render less, cache what repeats, and make state obvious to the user." },
  { id: "06", title: "Learn whatever the problem requires.", body: "Node.js, Redis, Linux and payment flows were all learned because the product needed them." },
];

export const experience = [
  {
    role: "Associative Software Engineer — Game Frontend",
    type: "Full-time",
    company: "TZeSSt Technologies Private Ltd.",
    period: "Jun 2025 - Present",
    place: "On-site • Hyderabad, India",
    built: "Production HTML5 casino games — slot, crash and instant formats — plus the internal tooling and deployment around them.",
    learned:
      "How rendering, animation and asset pipelines behave once a game is running on real devices for real players.",
    points: [
      "Built production HTML5 casino games — slot, crash and instant formats — with PixiJS and HTML5 Canvas.",
      "Engineered game rendering: scene graph structure, sprite sheets, texture atlases and draw-call budgets.",
      "Implemented game controls and betting interfaces: stake selection, auto-play, cashout and validation states.",
      "Built animation systems with Spine and frame sequences, wired to deterministic game state.",
      "Set up asset pipelines with TexturePacker, preloaders and progress handling for large game bundles.",
      "Implemented responsive game layouts across portrait, landscape, phone, tablet and desktop.",
      "Engineered game UI surfaces — HUD, wallet, history, bonus and result screens — as reusable components.",
      "Built Pixoma, an internal game development toolkit for asset inspection and animation preview.",
      "Deployed and served game builds and assets through AWS S3 and CloudFront.",
      "Tuned performance with GPU/CPU profiling and memory cleanup to hold framerate on low-end devices.",
      "Debugged live production rendering, animation and state issues reported from real gameplay.",
      "Built React + TypeScript application interfaces and used Python for scripting and developer tooling.",
    ],
    tech: [
      "PixiJS",
      "HTML5 Canvas",
      "Spine",
      "TexturePacker",
      "TypeScript",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Python",
      "AWS S3 / CloudFront",
      "Git/GitHub",
    ],
    production: "Production experience: game deployment on AWS, performance tuning and debugging live gameplay issues.",
  },
];

export const timeline = [
  {
    year: "2025",
    title: "Front-end game developer",
    org: "TZeSSt Technologies Private Ltd.",
    body: "Production HTML5 casino games with PixiJS: rendering, game UI, animation systems, asset pipelines and AWS deployment.",
  },
  {
    year: "2025",
    title: "Pixoma — internal game toolkit",
    org: "Developer tooling platform",
    body: "Built a pre-development platform for Spine preview, sprite sheet animation, atlas inspection and audio sync.",
  },
  {
    year: "2025",
    title: "Luvis — production gaming application",
    org: "Game frontend + application integration",
    body: "Game and application interfaces, API integration and production support on a live gaming platform.",
  },
  {
    year: "2024",
    title: "Hackathon win",
    org: "Smart India Hackathon (Internal)",
    body: "Recognised for building a working solution under time constraints.",
  },
  {
    year: "2021 – 2025",
    title: "Bachelor of Engineering, Computer Science",
    org: "QIS College of Engineering and Technology",
    body: "Computer science foundation alongside self-directed frontend and interactive graphics work.",
  },
];


export const education = {
  degree: "Bachelor of Engineering — Computer Science",
  school: "QIS College of Engineering and Technology",
  period: "2021 – 2025",
  cgpa: "7.5",
};

export const achievement = {
  title: "Smart India Hackathon — Internal Winner",
  org: "QIS College of Engineering and Technology",
};

export type SkillDepth = "core" | "strong" | "working";

export const skillMatrix = [
  {
    id: "game",
    layer: "Game development",
    index: "01",
    lead: "The specialisation: rendering, animation and interaction.",
    skills: [
      {
        name: "PixiJS",
        depth: "core" as SkillDepth,
        note: "Scene graph, containers, batching and texture management for HTML5 games.",
        proof: "Production casino games",
        usedIn: "Slot, crash and instant games — full rendering layer and game scene structure.",
      },
      {
        name: "HTML5 Canvas",
        depth: "core" as SkillDepth,
        note: "Canvas and WebGL rendering, resolution scaling and per-frame drawing.",
        proof: "All game builds",
        usedIn: "Every game surface: reels, curves, particles and result animation.",
      },
      {
        name: "Spine",
        depth: "strong" as SkillDepth,
        note: "Skeletal animation loaded, previewed and driven by game state.",
        proof: "Bonus + character animation",
        usedIn: "Bonus rounds and character animation, and Spine preview inside Pixoma.",
      },
      {
        name: "TexturePacker",
        depth: "strong" as SkillDepth,
        note: "Atlas generation, trim data and frame naming for large asset sets.",
        proof: "Game asset pipelines",
        usedIn: "Game asset pipelines and atlas inspection tooling in Pixoma.",
      },
      {
        name: "Game UI",
        depth: "core" as SkillDepth,
        note: "Betting interfaces, HUD, bonus screens and history surfaces.",
        proof: "Live betting interfaces",
        usedIn: "Stake selectors, auto-play, wallet, cashout and bonus screens.",
      },
      {
        name: "Game animations",
        depth: "core" as SkillDepth,
        note: "Timelines, easing and reveal sequences built as reusable systems.",
        proof: "Reel + reveal systems",
        usedIn: "Reel spins, win presentation, crash multiplier motion and transitions.",
      },
      {
        name: "Sprite sheets",
        depth: "strong" as SkillDepth,
        note: "Frame sequences played at target framerate with correct pivots.",
        proof: "Frame animation",
        usedIn: "Game effects plus the sprite sheet animator in Pixoma.",
      },
      {
        name: "Asset management",
        depth: "strong" as SkillDepth,
        note: "Preloaders, bundle splitting, progress states and cache behaviour.",
        proof: "Large game bundles",
        usedIn: "Game loaders and pre-development asset validation in Pixoma.",
      },
      {
        name: "Rendering performance",
        depth: "strong" as SkillDepth,
        note: "Frame budgets, GPU/CPU profiling and memory cleanup between scenes.",
        proof: "60fps on low-end devices",
        usedIn: "Production games profiled and tuned on real mid and low-end phones.",
      },
      {
        name: "Responsive game UI",
        depth: "strong" as SkillDepth,
        note: "Portrait and landscape scaling with safe areas and touch targets.",
        proof: "Cross-device layouts",
        usedIn: "Every game layout across phone, tablet and desktop orientations.",
      },
      {
        name: "Game state management",
        depth: "strong" as SkillDepth,
        note: "Deterministic states between idle, bet, play, reveal and result.",
        proof: "Game loops",
        usedIn: "Slot and crash game loops, including recovery after reconnect.",
      },
      {
        name: "Interactive graphics",
        depth: "core" as SkillDepth,
        note: "Particles, glow, masking and generated Pixi Graphics objects.",
        proof: "Visual polish",
        usedIn: "Game effects layers and Pixi Graphics generation in Pixoma.",
      },
    ],
  },
  {
    id: "frontend",
    layer: "Frontend",
    index: "02",
    lead: "Application work outside the canvas.",
    skills: [
      {
        name: "React",
        depth: "core" as SkillDepth,
        note: "Component architecture, reusable UI and application state.",
        proof: "Pixoma dashboard",
        usedIn: "Pixoma dashboard and production application interfaces.",
      },
      {
        name: "TypeScript",
        depth: "core" as SkillDepth,
        note: "Typed contracts across game state, APIs and tooling.",
        proof: "Daily driver",
        usedIn: "Game code, Pixoma and React applications.",
      },
      {
        name: "JavaScript",
        depth: "core" as SkillDepth,
        note: "Browser-side logic, events, async work and data transformation.",
        proof: "All builds",
        usedIn: "Game runtimes and application logic.",
      },
      {
        name: "HTML / CSS",
        depth: "core" as SkillDepth,
        note: "Semantic markup, responsive layout and cross-browser behaviour.",
        proof: "Mobile-first builds",
        usedIn: "Game shells, tooling UI and application layouts.",
      },
      {
        name: "Tailwind",
        depth: "core" as SkillDepth,
        note: "Token-driven styling kept consistent across an application.",
        proof: "Production UI",
        usedIn: "Pixoma and application interfaces.",
      },
      {
        name: "Vite",
        depth: "strong" as SkillDepth,
        note: "Fast builds, static output and asset handling for game bundles.",
        proof: "Build tooling",
        usedIn: "Game and tooling builds, including this portfolio.",
      },
    ],
  },
  {
    id: "cloud",
    layer: "Cloud & tools",
    index: "03",
    lead: "Getting builds to real players and keeping them healthy.",
    skills: [
      {
        name: "AWS",
        depth: "strong" as SkillDepth,
        note: "Hosting and delivering game builds and assets to real users.",
        proof: "Deployed games",
        usedIn: "Production game deployments and asset hosting.",
      },
      {
        name: "CloudFront",
        depth: "strong" as SkillDepth,
        note: "CDN delivery, cache behaviour and invalidation after releases.",
        proof: "Asset delivery",
        usedIn: "Game asset and bundle delivery to players.",
      },
      {
        name: "S3",
        depth: "strong" as SkillDepth,
        note: "Static build hosting and versioned asset buckets.",
        proof: "Build hosting",
        usedIn: "Game builds and atlas/audio asset storage.",
      },
      {
        name: "Git / GitHub",
        depth: "core" as SkillDepth,
        note: "Branching, review and release flow across a working team.",
        proof: "Team workflow",
        usedIn: "Game and tooling repositories with the TZeSSt team.",
      },
      {
        name: "Node.js",
        depth: "strong" as SkillDepth,
        note: "Tooling services, API integration and build-side scripting.",
        proof: "Tooling services",
        usedIn: "Pixoma services and supporting game tooling.",
      },
      {
        name: "Python",
        depth: "working" as SkillDepth,
        note: "Scripting, automation and developer tooling around asset pipelines.",
        proof: "Automation scripts",
        usedIn: "Asset processing and repetitive pipeline automation — programming, not AI/ML.",
      },
    ],
  },
];


export const depthMeta: Record<SkillDepth, { label: string; dots: number }> = {
  core: { label: "Core", dots: 3 },
  strong: { label: "Strong", dots: 2 },
  working: { label: "Working", dots: 1 },
};
