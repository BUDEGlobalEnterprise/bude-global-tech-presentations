const PRESENTATIONS_CONFIG = [
  {
    file: "templates/sample-presentation.json",
    title: "Introduction to Web Development",
    description:
      "Complete guide to modern web technologies from basics to advanced concepts",
    keywords: [
      "web",
      "html",
      "css",
      "javascript",
      "frontend",
      "backend",
      "fullstack",
    ],
  },
  {
    file: "presentations/intro-python.json",
    title: "Introduction to Python",
    description:
      "Complete Python guide from basics to advanced topics, OOP, and libraries",
    keywords: [
      "python",
      "programming",
      "code",
      "django",
      "flask",
      "data science",
    ],
  },
  {
    file: "presentations/intro-keycloak.json",
    title: "Introduction to Keycloak",
    description:
      "Learn about Keycloak, an open source identity and access management solution",
    keywords: [
      "keycloak",
      "iam",
      "identity",
      "access management",
      "sso",
      "oauth2",
      "oidc",
    ],
  },
  {
    file: "presentations/intro-metabase.json",
    title: "Introduction to Metabase",
    description:
      "Discover Metabase, an open source business intelligence and data visualization tool",
    keywords: [
      "metabase",
      "bi",
      "business intelligence",
      "data visualization",
      "analytics",
      "dashboards",
    ],
  },
  {
    file: "presentations/intro-oss.json",
    title: "Introduction to Open Source",
    description:
      "Learn the fundamentals of open source software, from licensing to contributing",
    keywords: ["oss", "open source", "git", "github", "contribution"],
  },
  {
    file: "presentations/frappe-presentation.json",
    title: "Introduction to Frappe",
    description: "Full-stack web framework for rapid application development",
    keywords: [
      "frappe",
      "framework",
      "python",
      "erpnext",
      "web",
      "fullstack",
      "metadata",
    ],
  },
  {
    file: "presentations/erpnext-presentation.json",
    title: "Introduction to ERPNext",
    description:
      "World best open source ERP - complete business management solution",
    keywords: [
      "erpnext",
      "erp",
      "business",
      "management",
      "accounting",
      "inventory",
      "manufacturing",
      "open source",
    ],
  },
  {
    file: "presentations/intro-csharp.json",
    title: "Introduction to C# Programming",
    description:
      "Modern, powerful, versatile language from basics to advanced concepts",
    keywords: [
      "csharp",
      "c#",
      "dotnet",
      "programming",
      "oop",
      "microsoft",
      "web",
      "desktop",
      "mobile",
    ],
  },
  {
    file: "presentations/intro-maui.json",
    title: "Introduction to .NET MAUI",
    description:
      "Multi-platform App UI - one codebase for Android, iOS, Windows, and macOS",
    keywords: [
      "maui",
      "dotnet",
      "xamarin",
      "cross-platform",
      "mobile",
      "android",
      "ios",
      "windows",
      "macos",
    ],
  },
  {
    file: "presentations/intro-git-github.json",
    title: "Introduction to Git & GitHub",
    description:
      "Complete version control mastery from zero to collaboration pro",
    keywords: [
      "git",
      "github",
      "version control",
      "vcs",
      "collaboration",
      "devops",
      "ci/cd",
      "open source",
    ],
  },
  {
    file: "presentations/intro-gitea.json",
    title: "Introduction to Gitea",
    description: "Lightweight, self-hosted Git service with complete control",
    keywords: [
      "gitea",
      "self-hosted",
      "git",
      "devops",
      "ci/cd",
      "docker",
      "kubernetes",
    ],
  },
  {
    file: "presentations/intro-linux.json",
    title: "Introduction to Linux",
    description: "Complete operating system guide from beginner to power user",
    keywords: [
      "linux",
      "ubuntu",
      "debian",
      "command-line",
      "bash",
      "sysadmin",
      "devops",
    ],
  },
  {
    file: "presentations/intro-docker.json",
    title: "Introduction to Docker & Containerization",
    description:
      "Complete containerization guide from beginner to production deployment",
    keywords: [
      "docker",
      "containers",
      "containerization",
      "devops",
      "microservices",
      "docker-compose",
      "kubernetes",
      "ci-cd",
    ],
  },
  {
    file: "presentations/tailwind-css-presentation.json",
    title: "Introduction to Tailwind CSS",
    description:
      "Complete utility-first CSS framework guide from basics to advanced component development",
    keywords: [
      "tailwind",
      "tailwindcss",
      "css",
      "frontend",
      "ui",
      "design",
      "responsive",
      "utility-first",
      "components",
      "react",
      "vue",
    ],
  },
  {
    file: "presentations/bootstrap-presentation.json",
    title: "Introduction to Bootstrap",
    description: "Complete CSS framework guide from basics to advanced component development",
    keywords: ["bootstrap", "css", "frontend", "ui", "responsive", "components", "grid", "react", "vue", "angular"]
  }, {
    file: "presentations/react-presentation.json",
    title: "Introduction to React",
    description: "Complete React.js guide from fundamentals to advanced hooks and state management",
    keywords: ["react", "reactjs", "javascript", "frontend", "hooks", "components", "jsx", "state", "props"]
  }, {
    file: 'presentations/nextjs-presentation.json',
    title: 'Introduction to Next.js',
    description: 'Complete full-stack React framework guide from basics to advanced App Router and deployment',
    keywords: ['nextjs', 'react', 'fullstack', 'ssr', 'ssg', 'vercel', 'app-router', 'server-components']
  }, {
    file: 'presentations/nodejs-presentation.json',
    title: 'Introduction to Node.js',
    description: 'Complete server-side JavaScript runtime guide from basics to production deployment',
    keywords: ['nodejs', 'javascript', 'backend', 'server', 'express', 'npm', 'mongodb', 'authentication', 'api']
  }, {
    file: "presentations/intro-postgresql.json",
    title: "Introduction to PostgreSQL",
    description: "Complete database management guide from beginner to advanced user",
    keywords: [
      "postgresql",
      "database",
      "sql",
      "rdbms",
      "jsonb",
      "acid",
      "backup",
      "performance",
      "indexing",
      "transactions"
    ]
  },
  {
    file: "presentations/intro-mysql.json",
    title: "Introduction to MySQL",
    description: "Complete database management guide from beginner to production ready",
    keywords: ["mysql", "database", "sql", "rdbms", "innodb", "replication", "backup"]
  },
  {
    file: "presentations/intro-mongodb.json",
    title: "Introduction to MongoDB",
    description: "Complete NoSQL database guide from beginner to production ready",
    keywords: ["mongodb", "nosql", "document", "database", "bson", "aggregation", "atlas"]
  },
  {
    file: "presentations/intro-sql-databases.json",
    title: "SQL & Databases – Fundamentals of Relational Database Management",
    description: "Complete guide to relational databases and SQL from basics to advanced concepts",
    keywords: ["sql", "database", "rdbms", "mysql", "postgresql", "normalization", "acid", "joins"]
  },
  {
    file: "presentations/intro-js.json",
    title: "Introduction to JavaScript",
    description: "An introduction to the fundamentals of JavaScript.",
    keywords: ["javascript", "web", "programming", "frontend"]
  },
  {
    file: "presentations/intro-typescript.json",
    title: "TypeScript – Typed JavaScript for Scalable Applications",
    description: "Complete guide to TypeScript from basics to advanced patterns",
    keywords: ["typescript", "javascript", "types", "static-typing", "angular", "react", "nodejs"]
  },
  {
    file: "presentations/intro-powertoys.json",
    title: "Introduction to Microsoft PowerToys",
    description: "Complete Windows productivity toolkit guide from installation to advanced workflows",
    keywords: [
      "microsoft",
      "powertoys",
      "windows",
      "productivity",
      "utilities",
      "automation",
      "keyboard-shortcuts",
      "window-management",
      "fancyzones",
      "powertoys-run",
      "windows-tools",
      "power-user",
      "workflow-optimization"
    ]
  },
  {
    file: "presentations/intro-stirling-pdf.json",
    title: "Introduction to Stirling PDF",
    description: "Complete self-hosted PDF processing toolkit with advanced document management capabilities",
    keywords: [
      "stirling-pdf",
      "pdf",
      "document-processing",
      "self-hosted",
      "open-source",
      "docker",
      "ocr",
      "pdf-manipulation",
      "document-management",
      "privacy",
      "pdf-tools",
      "self-hosted-pdf",
      "pdf-conversion",
      "pdf-editing"
    ]
  },
  {
    file: "presentations/intro-n8n.json",
    title: "Introduction to n8n",
    description: "Complete workflow automation platform guide from basics to advanced enterprise deployment",
    keywords: [
      "n8n",
      "workflow-automation",
      "node-based-automation",
      "self-hosted",
      "open-source",
      "fair-code",
      "api-integration",
      "webhooks",
      "automation-tools",
      "no-code",
      "low-code",
      "workflow-orchestration",
      "business-automation"
    ]
  },
  {
    file: "presentations/intro-imhex.json",
    title: "Introduction to ImHex - Advanced Hex Editor",
    description: "Complete guide to ImHex hex editor for reverse engineering, firmware analysis, and binary forensics",
    keywords: [
      "imhex",
      "hex-editor",
      "reverse-engineering",
      "binary-analysis",
      "firmware",
      "malware-analysis",
      "forensics",
      "pattern-language",
      "security-research",
      "embedded-systems",
      "ghidra",
      "ida-pro",
      "radare2",
      "binary-patching",
      "memory-analysis",
      "file-formats",
      "elf",
      "pe",
      "png",
      "checksum",
      "hashing",
      "entropy-analysis",
      "data-visualization",
      "plugins",
      "scripting"
    ]
  },
  {
    file: "presentations/intro-adminlte.json",
    title: "Introduction to AdminLTE",
    description: "Complete admin dashboard template guide from setup to advanced customization",
    keywords: [
      "adminlte",
      "bootstrap",
      "dashboard",
      "admin-template",
      "web-development",
      "ui-components",
      "laravel",
      "django",
      "react",
      "vue"
    ]
  },
  {
    file: "presentations/intro-wsl.json",
    title: "Introduction to WSL (Windows Subsystem for Linux)",
    description: "Complete guide to Windows Subsystem for Linux from installation to advanced development workflows",
    keywords: [
      "wsl",
      "windows-subsystem-linux",
      "linux-on-windows",
      "development-environment",
      "docker-wsl",
      "wsl2",
      "windows-linux",
      "devops",
      "bash-on-windows"
    ],
  },
  {
    file: "presentations/intro-ghost.json",
    title: "Ghost - Just a Blogging Platform",
    description: "Complete guide to modern publishing platform from setup to monetization",
    keywords: [
      "ghost",
      "blogging",
      "publishing",
      "nodejs",
      "cms",
      "membership",
      "newsletter",
      "headless-cms",
      "content-creation"
    ]
  },
  {
    file: "presentations/intro-grocy.json",
    title: "Introduction to Grocy - ERP for Home & Small Inventory Management",
    description: "Complete guide to Grocy open-source ERP system for household inventory, pantry management, and small business stock control",
    keywords: [
      "grocy",
      "erp",
      "inventory-management",
      "pantry-tracking",
      "self-hosted",
      "home-automation",
      "stock-management",
      "barcode-scanning",
      "meal-planning",
      "shopping-list",
      "chores",
      "maintenance-tracking",
      "docker",
      "raspberry-pi",
      "home-assistant",
      "rest-api",
      "automation",
      "open-source",
      "household-management",
      "small-business",
      "barcode-buddy",
      "recipe-management",
      "expiry-tracking",
      "batch-management"
    ]
  }, {
    file: "presentations/intro-rest-api-swagger.json",
    title: "REST API & Swagger/OpenAPI",
    description: "Complete guide to REST API design principles and OpenAPI documentation",
    keywords: [
      "rest",
      "api",
      "swagger",
      "openapi",
      "http",
      "web-services",
      "api-design",
      "documentation",
      "aspnet-core",
      "nodejs",
      "spring-boot"
    ]
  },
  {
    file: "presentations/intro-graphql.json",
    title: "GraphQL – API Query Language",
    description: "Complete guide to GraphQL API technology for efficient data fetching, real-time updates, and type-safe API development",
    keywords: [
      "graphql",
      "api",
      "query-language",
      "rest-alternative",
      "apollo",
      "hasura",
      "schema",
      "resolvers",
      "mutations",
      "subscriptions",
      "type-system",
      "graphiql",
      "react-graphql",
      "nodejs-graphql",
      "api-design",
      "data-fetching",
      "real-time",
      "websockets",
      "github-api",
      "shopify",
      "mobile-apis",
      "over-fetching",
      "under-fetching"
    ]
  },
  {
    file: "presentations/intro-kubernetes.json",
    title: "Kubernetes – Container Orchestration",
    description: "Production-grade platform for automating deployment, scaling, and management of containerized applications",
    keywords: [
      "kubernetes",
      "k8s",
      "container-orchestration",
      "docker",
      "cloud-native",
      "microservices",
      "devops",
      "cncf",
      "cka",
      "ckad"
    ]
  }
  // Add more presentations here as you create them
];
