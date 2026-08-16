/**
 * Single source of truth for the portfolio.
 * Items marked `confirm: true` are placeholders to replace with confirmed details.
 */

export const profile = {
  name: "Mahesh Jillela",
  title: "Frontend Developer",
  headline: "I build interfaces that don't stop at the browser.",
  location: "Hyderabad, India",
  email: "maheshjillela6@gmail.com",
  phone: "9347612425",
  github: "https://github.com/MaheshJillela",
  linkedin: "https://www.linkedin.com/in/mahesh-jillela",
  description:
    "Frontend-focused developer with hands-on experience building production applications and working across APIs, Node.js, cloud infrastructure, servers, payments, caching, notifications and deployment.",
  chain: ["Design", "Code", "API", "Server", "Production"],
  heroTech: ["JavaScript", "React", "Node.js", "Redis", "AWS", "Linux"],
};

export const positioning = {
  core: "Frontend",
  extended: ["API", "Node.js", "Database", "Redis", "Server", "Cloud", "Production"],
  statement:
    "Frontend is my core strength — but I can also understand, connect, deploy and troubleshoot the systems behind the frontend.",
};

export const aboutPoints = [
  {
    k: "Frontend first",
    v: "Frontend development is my primary expertise: interactive, responsive, production-ready interfaces.",
  },
  {
    k: "Data flow",
    v: "I care about how the interface communicates with backend systems, and I understand APIs and data flow.",
  },
  {
    k: "Node.js when needed",
    v: "I work with Node.js when the problem requires server-side logic or service integration.",
  },
  {
    k: "Deploy & host",
    v: "I deploy and host applications on cloud and server environments, with practical Linux experience.",
  },
  {
    k: "Data & caching",
    v: "I understand databases and caching, and how they change what the frontend feels like.",
  },
  {
    k: "Production reality",
    v: "Through Luvis I have worked on live production systems and troubleshooting beyond the frontend.",
  },
];

export const frontendCore = [
  {
    id: "ui",
    title: "UI Development",
    lead: "Modern, responsive, component-based interfaces built to survive real users.",
    items: [
      "Modern responsive interfaces",
      "Component-based development",
      "Reusable UI components",
      "Responsive layouts",
      "Mobile-first thinking",
      "Cross-browser compatibility",
      "Interactive interfaces",
      "Forms and validation",
      "UI states",
      "Loading / error / empty states",
    ],
  },
  {
    id: "js",
    title: "JavaScript",
    lead: "Browser-side logic: events, async work, API integration and state handling.",
    items: [
      "DOM interaction",
      "Event handling",
      "Async operations",
      "API integration",
      "State handling",
      "Data transformation",
      "Dynamic interfaces",
      "Browser-side logic",
    ],
  },
  {
    id: "markup",
    title: "HTML / CSS",
    lead: "Semantic structure and responsive styling across every device size.",
    items: [
      "Semantic HTML",
      "Responsive CSS",
      "Flexbox",
      "Grid",
      "Animations",
      "Transitions",
      "Responsive layouts",
      "Cross-device UI",
    ],
  },
  {
    id: "interactive",
    title: "Interactive Experiences",
    lead: "Interfaces that respond, animate and give feedback — this portfolio is the example.",
    items: [
      "Animations",
      "Interactive components",
      "Micro-interactions",
      "Dynamic UI",
      "Visual feedback",
      "Game-like interfaces",
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
  lead: "Hands-on Node.js experience supporting production applications — not my primary specialisation, but practical and production-tested through Luvis.",
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
  lead: "Luvis is not simply a website. It is an application ecosystem of interconnected systems — web application, game experience, admin panel, APIs, payments, caching, notifications, mailing and the server infrastructure holding it together.",
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
    role: "Associative Software Engineer",
    type: "Full-time",
    company: "TZeSSt Technologies Private Ltd.",
    period: "Jun 2025 - Present",
    place: "On-site • Hyderabad, India",
    built: "Frontend for production gaming applications, plus the application, service and deployment work around them.",
    learned:
      "How a frontend behaves once it is connected to real APIs, caches, payments and a live server.",
    points: [
      "Built and maintained frontend interfaces for production gaming applications, focusing on UI, animations and interactions.",
      "Worked with PixiJS and canvas rendering to build and optimise interactive game interfaces.",
      "Built reusable React components and managed dynamic application state.",
      "Implemented responsive layouts, gameplay flows and sound integration across devices.",
      "Debugged frontend rendering, animation and cross-browser/device issues in live applications.",
      "Integrated frontend applications with REST APIs and backend services.",
      "Deployed and served application assets using AWS S3 and CloudFront.",
      "Worked with React Native for cross-platform mobile application development.",
    ],
    tech: [
      "JavaScript",
      "HTML",
      "CSS",
      "React",
      "PixiJS",
      "Node.js",
      "Tailwind CSS",
      "AWS",
      "Linux",
      "Redis",
      "React Native",
      "Git/GitHub",
    ],
    production: "Production experience: deployment, server hosting, process management and log-driven debugging.",
  },
];

export const timeline = [
  {
    year: "2025",
    title: "Associative Software Engineer",
    org: "TZeSSt Technologies Private Ltd.",
    body: "Frontend engineering on production gaming applications, extending into APIs, Node.js services, deployment and server work.",
  },
  {
    year: "2025",
    title: "Luvis — production application",
    org: "Frontend + application integration + production",
    body: "Worked across the Luvis ecosystem: interfaces, API integration, payments, caching, notifications, mailing, admin panel and deployment.",
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
    body: "Computer science foundation alongside self-directed frontend and application work.",
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
