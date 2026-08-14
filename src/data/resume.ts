export const profile = {
  name: "Mahesh Jillela",
  title: "Software Engineer | Full-Stack Developer",
  location: "Hyderabad, India",
  email: "maheshjillela6@gmail.com",
  phone: "9347612425",
  github: "https://github.com/MaheshJillela",
  linkedin: "https://www.linkedin.com/in/mahesh-jillela",
  summary:
    "Software Engineer with a Bachelor of Engineering in Computer Science, skilled in full-stack development and React Native. Demonstrated experience in developing interactive applications, utilizing JavaScript, Python, and REST APIs. Successfully built and deployed a casino gaming application, enhancing user experience through optimized UI and performance.",
  heroTech: ["React", "JavaScript", "PixiJS", "WebGL", "TypeScript"],
};

export const traits = [
  {
    label: "Interactive Applications",
    detail:
      "Gameplay UI, animations and interactions for slot and crash games in production.",
  },
  {
    label: "PixiJS & Canvas",
    detail:
      "Built and optimized high-performance canvas-based game interfaces and animations.",
  },
  {
    label: "React Architecture",
    detail:
      "Reusable components and dynamic application state across React applications.",
  },
  {
    label: "Full-Stack Development",
    detail: "Python, Flask, Node.js, REST APIs and relational databases.",
  },
  {
    label: "Performance & Debugging",
    detail:
      "Resolved complex frontend rendering, animation and cross-browser/device issues.",
  },
  {
    label: "Delivery on AWS",
    detail: "Served game assets through AWS S3 and CloudFront for players across regions.",
  },
];

export const experience = [
  {
    role: "Associative Software Engineer",
    type: "Full-time",
    company: "TZeSSt Technologies Private Ltd.",
    period: "Jun 2025 - Present",
    place: "On-site • Hyderabad, India",
    points: [
      "Developed and maintained interactive casino gaming applications, including slot and crash games, focusing on gameplay UI, animations, and interactions.",
      "Worked extensively with PixiJS to build and optimize high-performance canvas-based game interfaces and animations.",
      "Enhanced React-based applications and UI components, integrating reusable components and managing dynamic application states.",
      "Implemented and maintained game features such as gameplay flows, sound integration, and responsive layouts across different devices.",
      "Debugged and resolved complex frontend rendering, animation, and cross-browser/device issues in existing production applications.",
      "Deployed and served casino game assets using AWS S3 and CloudFront, enabling reliable content delivery and improved performance for players across different regions.",
      "Utilized React Native for developing cross-platform mobile applications.",
    ],
    tech: [
      "JavaScript",
      "HTML",
      "CSS",
      "Git/GitHub",
      "PixiJS",
      "React",
      "Node.js",
      "Tailwind CSS",
      "Python",
      "AWS",
      "Spine",
      "Next.js",
      "WebGL",
      "React Native",
    ],
  },
];

export type Project = (typeof projects)[number];

export const projects = [
  {
    id: "luvis",
    name: "Luvis",
    kind: "Full-Stack E-Commerce · Live",
    url: "https://luvis.site" as string | null,
    urlLabel: "luvis.site" as string | null,
    tagline: "A live storefront, built and shipped solo.",
    blurb:
      "Luvis is a live e-commerce web application for girls' jewellery, hair accessories and matching combos — designed, built and shipped end to end by one developer.",
    highlights: [
      { k: "Live", v: "luvis.site" },
      { k: "Type", v: "E-commerce storefront" },
      { k: "Owner", v: "Sole developer" },
      { k: "Scope", v: "Concept → deploy" },
    ],
    role: "Sole developer — architecture, backend services, frontend components and testing.",
    tech: ["Python", "Flask", "JavaScript", "HTML", "CSS", "MySQL", "REST APIs"],
    overview:
      "Luvis is a full-stack web application designed and developed independently, taking ownership from concept and architecture through implementation and testing.",
    purpose:
      "The project was built to deliver a complete working application where the interface, application logic, data storage and the communication layer between them were all designed as one coherent system.",
    contribution: [
      "Designed and developed Luvis as an independent full-stack application, taking ownership from concept and architecture through implementation and testing.",
      "Developed backend services using Python and Flask, implementing application logic, API endpoints, data processing, and database interactions.",
      "Built interactive and responsive frontend components using HTML, CSS, and JavaScript.",
      "Integrated MySQL for structured data storage, retrieval, and application-level database operations.",
      "Implemented frontend-backend communication through REST APIs for dynamic application functionality.",
    ],
    architecture: [
      "Frontend — HTML, CSS, JavaScript",
      "REST APIs",
      "Backend — Python / Flask",
      "Database — MySQL",
    ],
    features: [
      "Interactive, responsive frontend components",
      "Flask API endpoints for application logic",
      "Data processing and database interactions",
      "Structured storage and retrieval with MySQL",
      "Dynamic behaviour driven by REST API communication",
    ],
    outcome:
      "Delivered as a working full-stack application, built and tested end to end by a single developer.",
    accent: "from-[oklch(0.72_0.14_190)] to-[oklch(0.55_0.16_265)]",
  },
  {
    id: "aquaculture",
    name: "Dissolved Oxygen Management in Aquaculture Ponds",
    kind: "Web Dashboard · Machine Learning",
    url: null as string | null,
    urlLabel: null as string | null,
    tagline: "Sensors in, oxygen decisions out.",
    blurb:
      "A sensor-driven dashboard and automated aeration system that estimates and optimises dissolved oxygen levels in aquaculture ponds.",
    highlights: [
      { k: "Model", v: "Random Forest" },
      { k: "Data", v: "Live sensors + MySQL" },
      { k: "Control", v: "Automated aeration" },
      { k: "Output", v: "Dashboard charts" },
    ],
    role: "Model development, automation logic, data layer and dashboard visualisation.",
    tech: ["Python", "Random Forest", "MySQL", "Sensors"],
    overview:
      "A web dashboard combined with a Random Forest model and an automated aeration system for managing dissolved oxygen in aquaculture ponds.",
    purpose:
      "Dissolved oxygen is critical to pond health. The project estimates oxygen levels from water-quality parameters and acts on them automatically instead of relying on manual checks.",
    contribution: [
      "Built a Random Forest model to estimate dissolved oxygen levels based on water-quality parameters.",
      "Developed an automated aeration system to optimize oxygen levels in real time.",
      "Used sensor data and MySQL for monitoring, storage, and retrieval of environmental data.",
      "Integrated an interactive web dashboard with charts and graphs for visualizing dissolved oxygen levels and management data.",
    ],
    architecture: [
      "Sensors — water-quality parameters",
      "Python — Random Forest estimation",
      "MySQL — monitoring, storage, retrieval",
      "Web dashboard — charts and graphs",
    ],
    features: [
      "Dissolved oxygen estimation from water-quality parameters",
      "Real-time automated aeration control",
      "Sensor data monitoring and storage",
      "Interactive charts and graphs for management data",
    ],
    outcome:
      "An end-to-end system in which estimation, automation and visualisation operate on the same live sensor data.",
    accent: "from-[oklch(0.75_0.15_150)] to-[oklch(0.6_0.13_215)]",
  },
];

export const skills = [
  {
    group: "Frontend",
    level: "Production Experience",
    items: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    group: "Interactive / Graphics",
    level: "Production Experience",
    items: ["Pixi.js", "WebGL", "Canvas Animation", "Spine", "Texture Packer"],
  },
  {
    group: "Backend",
    level: "Advanced",
    items: ["Node.js", "Express", "Python", "Flask", "REST APIs"],
  },
  { group: "Databases", level: "Advanced", items: ["MySQL", "PostgreSQL", "Redis", "SQL"] },
  {
    group: "Mobile",
    level: "Working Knowledge",
    items: ["React Native"],
  },
  {
    group: "Tools & Platforms",
    level: "Production Experience",
    items: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "CI/CD",
      "Docker",
      "AWS Cloud Platform",
      "Linux",
      "Postman",
      "Jira",
      "Visual Studio Code",
      "MySQL Workbench",
    ],
  },
];

export const performanceFocus = [
  {
    title: "Canvas rendering",
    body: "Optimized high-performance PixiJS canvas interfaces and animations.",
  },
  {
    title: "Animation optimization",
    body: "Tuned gameplay animation and interaction work in production titles.",
  },
  {
    title: "Responsive UI",
    body: "Responsive layouts maintained across different devices.",
  },
  {
    title: "Cross-browser compatibility",
    body: "Debugged rendering and animation issues across browsers and devices.",
  },
  {
    title: "Asset delivery",
    body: "Game assets served via AWS S3 and CloudFront for regional performance.",
  },
  {
    title: "Component reuse",
    body: "Reusable React components with managed dynamic application state.",
  },
];

export const process = [
  { stage: "Idea", body: "Define what the application has to do before writing code." },
  { stage: "Design", body: "Shape the gameplay UI, layout and interaction model." },
  {
    stage: "Architecture",
    body: "Decide the frontend, API, backend and database boundaries — as done end to end on Luvis.",
  },
  {
    stage: "Development",
    body: "Build reusable React components, canvas systems and API endpoints.",
  },
  {
    stage: "Optimization",
    body: "Profile rendering and animation, then fix cross-browser and device issues.",
  },
  { stage: "Deployment", body: "Ship and serve assets through AWS S3 and CloudFront." },
];

export const timeline = [
  {
    year: "2021",
    title: "Bachelor of Engineering, Computer Science",
    org: "QIS College of Engineering & Technology, Ongole",
    body: "Started a four-year Computer Science degree, graduating in 2025 with a CGPA of 8.32.",
  },
  {
    year: "2024",
    title: "1st Place — CodewalaQuest Hackathon",
    org: "QIS College of Engineering & Technology",
    body: "Took first place in the CodewalaQuest Hackathon 2024.",
  },
  {
    year: "2025",
    title: "Graduated — CGPA 8.32",
    org: "QIS College of Engineering & Technology",
    body: "Completed the Bachelor of Engineering in Computer Science (2021 - 2025).",
  },
  {
    year: "Jun 2025",
    title: "Associative Software Engineer",
    org: "TZeSSt Technologies Private Ltd. — Hyderabad, India",
    body: "Joined full-time, building interactive casino gaming applications with PixiJS and React.",
  },
  {
    year: "Present",
    title: "Building interactive game interfaces",
    org: "TZeSSt Technologies Private Ltd.",
    body: "Slot and crash game UI, canvas animation, sound integration, responsive layouts and AWS asset delivery.",
  },
];

export const education = {
  school: "QIS College of Engineering & Technology, Ongole",
  degree: "Bachelor of Engineering in Computer Science",
  period: "2021 - 2025",
  cgpa: "8.32",
};

export const achievement = {
  title: "1st Place — CodewalaQuest Hackathon 2024",
  org: "QIS College of Engineering & Technology",
};

/* ---------- Redesign content (all derived from the resume above) ---------- */

export const pillars = [
  {
    label: "Interactive Experiences",
    note: "Slot and crash game interfaces — gameplay UI, animations and interactions, in production.",
  },
  {
    label: "PixiJS & Canvas",
    note: "Built and optimized high-performance canvas-based game interfaces and animations.",
  },
  {
    label: "React Architecture",
    note: "Reusable components and dynamic application state across React applications.",
  },
  {
    label: "Animation",
    note: "Gameplay flows, sound integration and motion tuned for responsiveness.",
  },
  {
    label: "Performance",
    note: "Debugged complex rendering, animation and cross-browser/device issues.",
  },
  {
    label: "Full-Stack Development",
    note: "Python, Flask, Node.js, REST APIs and MySQL — owned end to end on Luvis.",
  },
];

export const skillNotes: Record<string, string> = {
  React: "Enhanced React applications and UI components in production.",
  "Next.js": "Used alongside React in day-to-day frontend work.",
  JavaScript: "Primary language for interactive application and gameplay work.",
  TypeScript: "Typed frontend development for interactive interfaces.",
  HTML5: "Markup for interactive, responsive frontend components.",
  CSS3: "Responsive layouts across different devices.",
  "Tailwind CSS": "Utility-first styling in frontend applications.",
  "Pixi.js": "Built and optimized high-performance canvas game interfaces.",
  WebGL: "GPU-accelerated rendering behind canvas game interfaces.",
  "Canvas Animation": "Gameplay animation and interaction work in production titles.",
  Spine: "Skeletal animation assets used in game interfaces.",
  "Texture Packer": "Sprite atlas preparation for game assets.",
  "Node.js": "Server-side JavaScript in application development.",
  Express: "REST API layer in Node.js services.",
  Python: "Backend services and the Random Forest model in the aquaculture project.",
  Flask: "Application logic, API endpoints and database interactions on Luvis.",
  "REST APIs": "Frontend-backend communication for dynamic functionality.",
  MySQL: "Structured storage, retrieval and database operations.",
  PostgreSQL: "Relational database work.",
  Redis: "In-memory data store.",
  SQL: "Querying and application-level database operations.",
  "React Native": "Cross-platform mobile application development.",
  Git: "Version control across all project work.",
  GitHub: "Repository hosting and collaboration.",
  "GitHub Actions": "Automated build and delivery workflows.",
  "CI/CD": "Continuous integration and delivery pipelines.",
  Docker: "Containerised development environments.",
  "AWS Cloud Platform": "S3 and CloudFront for game asset delivery.",
  Linux: "Primary development and deployment environment.",
  Postman: "API testing during backend development.",
  Jira: "Issue tracking and delivery workflow.",
  "Visual Studio Code": "Daily development environment.",
  "MySQL Workbench": "Schema design and query work.",
};

export const buildSteps = [
  {
    id: "01",
    stage: "Architect",
    body: "Decide the frontend, API, backend and database boundaries before writing code — as done end to end on Luvis.",
    tags: ["Architecture", "REST APIs", "MySQL"],
  },
  {
    id: "02",
    stage: "Build",
    body: "Build reusable React components, canvas systems and API endpoints, managing dynamic application state.",
    tags: ["React", "PixiJS", "Flask"],
  },
  {
    id: "03",
    stage: "Animate",
    body: "Implement gameplay flows, animations, interactions and sound integration across devices.",
    tags: ["Canvas Animation", "Spine", "Sound"],
  },
  {
    id: "04",
    stage: "Optimize",
    body: "Profile canvas rendering and animation, then resolve cross-browser and device issues in production apps.",
    tags: ["Rendering", "Responsive UI", "Debugging"],
  },
  {
    id: "05",
    stage: "Deploy",
    body: "Deploy and serve game assets through AWS S3 and CloudFront for reliable delivery across regions.",
    tags: ["AWS S3", "CloudFront", "CI/CD"],
  },
];

export const deliveryChain = [
  { node: "Build output", note: "Game assets and bundled frontend" },
  { node: "AWS S3", note: "Origin storage for game assets" },
  { node: "CloudFront", note: "Edge distribution across regions" },
  { node: "Players", note: "Reliable delivery, improved performance" },
];
