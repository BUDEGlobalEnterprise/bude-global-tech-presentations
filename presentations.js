const PRESENTATIONS_CONFIG = [
  // ============= BEGINNER FUNDAMENTALS =============
  {
    file: "templates/sample-presentation.json",
    title: "Introduction to Web Development",
    description: "Complete guide to modern web technologies from basics to advanced concepts",
    keywords: ["web", "html", "css", "javascript", "frontend", "backend", "fullstack"],
    category: ["frontend", "backend"],
    difficulty: "beginner"
  },
  {
    file: "templates/advanced-slides.json",
    title: "Advanced Slide Components",
    description: "Testing Enhanced Features in BUDE Presentations",
    keywords: ["web", "html", "css", "javascript", "frontend", "backend", "fullstack"],
    category: ["frontend", "backend"],
    difficulty: "beginner"
  },
  {
    file: "templates/tamil-movie-quiz.json",
    title: "Tamil Movie Challenge",
    description: "Hard-Level Post-2015 Movie Quizzes - Can You Guess Them All?",
    keywords: ["quiz", "tamil", "movies", "challenge", "fun"],
    category: ["Movie", "Games"],
    difficulty: "beginner"
  },
  {
    file: "templates/ERPNext-Solutions-Catalog.json",
    title: "ERPNext Solutions Catalog",
    description: "Transforming Open-Source Flexibility into Enterprise-Grade Reliability",
    keywords: ["erpnext", "business", "enterprise", "solutions", "catalog"],
    category: ["business", "enterprise"],
    difficulty: "beginner"
  },
  {
    file: "presentations/intro-oss.json",
    title: "Introduction to Open Source",
    description: "Learn the fundamentals of open source software, from licensing to contributing",
    keywords: ["oss", "open source", "git", "github", "contribution"],
    category: ["devops"],
    difficulty: "beginner"
  },
  {
    file: "presentations/intro-git-github.json",
    title: "Introduction to Git & GitHub",
    description: "Complete version control mastery from zero to collaboration pro",
    keywords: ["git", "github", "version control", "vcs", "collaboration", "devops", "ci/cd", "open source"],
    category: ["devops"],
    difficulty: "beginner"
  },
  {
    file: "presentations/intro-linux.json",
    title: "Introduction to Linux",
    description: "Complete operating system guide from beginner to power user",
    keywords: ["linux", "ubuntu", "debian", "command-line", "bash", "sysadmin", "devops"],
    category: ["devops"],
    difficulty: "beginner"
  },
  {
    file: "presentations/intro-wsl.json",
    title: "Introduction to WSL (Windows Subsystem for Linux)",
    description: "Complete guide to Windows Subsystem for Linux from installation to advanced development workflows",
    keywords: ["wsl", "windows-subsystem-linux", "linux-on-windows", "development-environment", "docker-wsl", "wsl2", "windows-linux", "devops", "bash-on-windows"],
    category: ["devops", "tools"],
    difficulty: "beginner"
  },

  // ============= PROGRAMMING LANGUAGES (BEGINNER TO INTERMEDIATE) =============
  {
    file: "presentations/intro-python.json",
    title: "Introduction to Python",
    description: "Complete Python guide from basics to advanced topics, OOP, and libraries",
    keywords: ["python", "programming", "code", "django", "flask", "data science"],
    category: ["programming"],
    difficulty: "beginner"
  },
  {
    file: "presentations/intro-ruby.json",
    title: "Ruby – Elegant, Expressive Programming Language",
    description: "A developer-friendly, expressive scripting language known for simplicity and productivity, widely used in web development through frameworks like Ruby on Rails.",
    keywords: ["ruby", "rails", "programming", "scripting", "web-development", "backend", "mvc", "oop", "productivity"],
    category: ["programming", "backend"],
    difficulty: "beginner"
  },
  {
    file: "presentations/intro-js.json",
    title: "JavaScript Fundamentals",
    description: "An Introduction to the Language of the Web",
    keywords: ["javascript", "js", "web development", "frontend", "es6"],
    category: ["programming", "frontend"],
    difficulty: "beginner"
  },
  {
    file: "presentations/intro-php.json",
    title: "PHP – Server-Side Web Development",
    description: "A foundational scripting language for dynamic web applications, powering platforms like WordPress, Laravel, and Drupal with vast ecosystem support.",
    keywords: ["php", "web-development", "backend", "laravel", "wordpress", "mysql", "server-side", "scripting", "mvc"],
    category: ["backend", "web-development"],
    difficulty: "beginner"
  },
  {
    file: "presentations/intro-dart.json",
    title: "Dart – Modern Programming Language for Apps",
    description: "Google's modern, object-oriented programming language optimized for UI, fast compilation, and cross-platform development — powering Flutter and beyond.",
    keywords: ["dart", "flutter", "programming", "oop", "async", "frontend", "backend", "mobile-development"],
    category: ["programming", "app-development"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-csharp.json",
    title: "Introduction to C# Programming",
    description: "Modern, powerful, versatile language from basics to advanced concepts",
    keywords: ["csharp", "c#", "dotnet", "programming", "oop", "microsoft", "web", "desktop", "mobile"],
    category: ["programming"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-typescript.json",
    title: "TypeScript – Typed JavaScript for Scalable Applications",
    description: "Complete guide to TypeScript from basics to advanced patterns",
    keywords: ["typescript", "javascript", "types", "static-typing", "angular", "react", "nodejs"],
    category: ["programming"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-rust.json",
    title: "Rust – Systems Programming Language",
    description: "A memory-safe, high-performance systems programming language focused on safety, concurrency, and speed — ideal for backend services, embedded systems, and performance-critical software.",
    keywords: ["rust", "systems-programming", "memory-safety", "performance", "concurrency", "wasm", "cli", "backend", "safe-code"],
    category: ["programming", "backend"],
    difficulty: "advanced"
  },

  // ============= DATABASES (BEGINNER TO ADVANCED) =============
  {
    file: "presentations/intro-sql-databases.json",
    title: "SQL & Databases – Fundamentals of Relational Database Management",
    description: "Complete guide to relational databases and SQL from basics to advanced concepts",
    keywords: ["sql", "database", "rdbms", "mysql", "postgresql", "normalization", "acid", "joins"],
    category: ["database"],
    difficulty: "beginner"
  },
  {
    file: "presentations/intro-mysql.json",
    title: "Introduction to MySQL",
    description: "Complete database management guide from beginner to production ready",
    keywords: ["mysql", "database", "sql", "rdbms", "innodb", "replication", "backup"],
    category: ["database"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-postgresql.json",
    title: "Introduction to PostgreSQL",
    description: "Complete database management guide from beginner to advanced user",
    keywords: ["postgresql", "database", "sql", "rdbms", "jsonb", "acid", "backup", "performance", "indexing", "transactions"],
    category: ["database"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-mongodb.json",
    title: "Introduction to MongoDB",
    description: "Complete NoSQL database guide from beginner to production ready",
    keywords: ["mongodb", "nosql", "document", "database", "bson", "aggregation", "atlas"],
    category: ["database"],
    difficulty: "intermediate"
  },

  // ============= FRONTEND FRAMEWORKS (BEGINNER TO ADVANCED) =============
  {
    file: "presentations/bootstrap-presentation.json",
    title: "Introduction to Bootstrap",
    description: "Complete CSS framework guide from basics to advanced component development",
    keywords: ["bootstrap", "css", "frontend", "ui", "responsive", "components", "grid", "react", "vue", "angular"],
    category: ["frontend"],
    difficulty: "beginner"
  },
  {
    file: "presentations/tailwind-css-presentation.json",
    title: "Introduction to Tailwind CSS",
    description: "Complete utility-first CSS framework guide from basics to advanced component development",
    keywords: ["tailwind", "tailwindcss", "css", "frontend", "ui", "design", "responsive", "utility-first", "components", "react", "vue"],
    category: ["frontend"],
    difficulty: "beginner"
  },
  {
    file: "presentations/react-presentation.json",
    title: "Introduction to React",
    description: "Complete React.js guide from fundamentals to advanced hooks and state management",
    keywords: ["react", "reactjs", "javascript", "frontend", "hooks", "components", "jsx", "state", "props"],
    category: ["frontend"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-vue.json",
    title: "Introduction to Vue.js",
    description: "Progressive JavaScript framework - building user interfaces with ease",
    keywords: ["vue", "vuejs", "javascript", "frontend", "reactive", "components", "spa", "vite"],
    category: ["frontend"],
    difficulty: "beginner"
  },
  {
    file: "presentations/intro-svelte.json",
    title: "Introduction to Svelte",
    description: "Compile-time framework for cybernetically enhanced web apps",
    keywords: ["svelte", "sveltekit", "javascript", "frontend", "compiler", "reactive", "performance"],
    category: ["frontend"],
    difficulty: "beginner"
  },
  {
    file: 'presentations/nextjs-presentation.json',
    title: 'Introduction to Next.js',
    description: 'Complete full-stack React framework guide from basics to advanced App Router and deployment',
    keywords: ['nextjs', 'react', 'fullstack', 'ssr', 'ssg', 'vercel', 'app-router', 'server-components'],
    category: ["frontend", "backend"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-maui.json",
    title: "Introduction to .NET MAUI",
    description: "Multi-platform App UI - one codebase for Android, iOS, Windows, and macOS",
    keywords: ["maui", "dotnet", "xamarin", "cross-platform", "mobile", "android", "ios", "windows", "macos"],
    category: ["frontend"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-flutter.json",
    title: "Flutter – Cross-Platform App Development",
    description: "Google's open-source framework for building high-performance, natively compiled mobile, web, and desktop applications from a single codebase using Dart.",
    keywords: ["flutter", "dart", "mobile-development", "cross-platform", "ui", "widgets", "android", "ios", "desktop", "web"],
    category: ["app-development", "frontend"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-ios-dev.json",
    title: "iOS Advanced Development",
    description: "Professional-grade iOS app development with SwiftUI and UIKit, covering modern architecture patterns, performance optimization, and framework integration.",
    keywords: ["ios", "swift", "swiftui", "uikit", "mobile-development", "xcode", "cocoapods", "app-development", "ios-architecture", "performance"],
    category: ["app-development", "frontend"],
    difficulty: "advanced"
  },
  {
    file: "presentations/intro-adminlte.json",
    title: "Introduction to AdminLTE",
    description: "Complete admin dashboard template guide from setup to advanced customization",
    keywords: ["adminlte", "bootstrap", "dashboard", "admin-template", "web-development", "ui-components", "laravel", "django", "react", "vue"],
    category: ["frontend", "tools"],
    difficulty: "intermediate"
  },

  // ============= BACKEND FRAMEWORKS & APIs (INTERMEDIATE TO ADVANCED) =============
  {
    file: 'presentations/nodejs-presentation.json',
    title: 'Introduction to Node.js',
    description: 'Complete server-side JavaScript runtime guide from basics to production deployment',
    keywords: ['nodejs', 'javascript', 'backend', 'server', 'express', 'npm', 'mongodb', 'authentication', 'api'],
    category: ["backend"],
    difficulty: "intermediate"
  },
  {
    file: 'presentations/intro-expressjs.json',
    title: 'Express.js Deep Dive',
    description: 'Node.js web framework - middleware, routing, and REST API development',
    keywords: ['express', 'nodejs', 'javascript', 'api', 'middleware', 'routing', 'rest', 'backend', 'web-framework'],
    category: ["backend"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-rest-api-swagger.json",
    title: "REST API & Swagger/OpenAPI",
    description: "Complete guide to REST API design principles and OpenAPI documentation",
    keywords: ["rest", "api", "swagger", "openapi", "http", "web-services", "api-design", "documentation", "aspnet-core", "nodejs", "spring-boot"],
    category: ["backend"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-graphql.json",
    title: "GraphQL – API Query Language",
    description: "Complete guide to GraphQL API technology for efficient data fetching, real-time updates, and type-safe API development",
    keywords: ["graphql", "api", "query-language", "rest-alternative", "apollo", "hasura", "schema", "resolvers", "mutations", "subscriptions", "type-system", "graphiql", "react-graphql", "nodejs-graphql", "api-design", "data-fetching", "real-time", "websockets", "github-api", "shopify", "mobile-apis", "over-fetching", "under-fetching"],
    category: ["backend"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/frappe-presentation.json",
    title: "Introduction to Frappe",
    description: "Full-stack web framework for rapid application development",
    keywords: ["frappe", "framework", "python", "erpnext", "web", "fullstack", "metadata"],
    category: ["backend", "business"],
    difficulty: "advanced"
  }, 
  {
    file: "presentations/intro-ionic.json",
    title: "Ionic – Hybrid Mobile App Development Framework",
    description: "A cross-platform mobile development framework built on web technologies, enabling developers to create iOS, Android, and web apps using HTML, CSS, and JavaScript with seamless integration into Angular, React, and Vue.",
    keywords: ["ionic", "mobile-development", "hybrid-apps", "capacitor", "angular", "react", "vue", "cross-platform", "javascript", "typescript"],
    category: ["mobile", "frontend", "cross-platform"]
  },


  // ============= DEVOPS & INFRASTRUCTURE (INTERMEDIATE TO ADVANCED) =============
  {
    file: "presentations/intro-docker.json",
    title: "Introduction to Docker & Containerization",
    description: "Complete containerization guide from beginner to production deployment",
    keywords: ["docker", "containers", "containerization", "devops", "microservices", "docker-compose", "kubernetes", "ci-cd"],
    category: ["devops"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-gitea.json",
    title: "Introduction to Gitea",
    description: "Lightweight, self-hosted Git service with complete control",
    keywords: ["gitea", "self-hosted", "git", "devops", "ci/cd", "docker", "kubernetes"],
    category: ["devops", "tools"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-kubernetes.json",
    title: "Kubernetes – Container Orchestration",
    description: "Production-grade platform for automating deployment, scaling, and management of containerized applications",
    keywords: ["kubernetes", "k8s", "container-orchestration", "docker", "cloud-native", "microservices", "devops", "cncf", "cka", "ckad"],
    category: ["devops"],
    difficulty: "advanced"
  },
  {
    file: "presentations/intro-aws.json",
    title: "Introduction to AWS Cloud",
    description: "Amazon Web Services fundamentals - cloud computing from basics to deployment",
    keywords: ["aws", "cloud", "ec2", "s3", "lambda", "rds", "devops", "infrastructure", "serverless"],
    category: ["devops"],
    difficulty: "beginner"
  },
  {
    file: "presentations/intro-system-design.json",
    title: "System Design Fundamentals",
    description: "Designing scalable systems - from basics to production architecture",
    keywords: ["system-design", "architecture", "scalability", "databases", "caching", "load-balancing", "microservices"],
    category: ["devops"],
    difficulty: "intermediate"
  },

  // ============= BUSINESS & ENTERPRISE SOLUTIONS (INTERMEDIATE TO ADVANCED) =============
  {
    file: "presentations/intro-metabase.json",
    title: "Introduction to Metabase",
    description: "Discover Metabase, an open source business intelligence and data visualization tool",
    keywords: ["metabase", "bi", "business intelligence", "data visualization", "analytics", "dashboards"],
    category: ["business", "ai-data"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/erpnext-presentation.json",
    title: "Introduction to ERPNext",
    description: "World best open source ERP - complete business management solution",
    keywords: ["erpnext", "erp", "business", "management", "accounting", "inventory", "manufacturing", "open source"],
    category: ["business"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-frappe-product-suite.json",
    title: "Introduction to Frappe Product Suite",
    description: "Complete ecosystem of open source business applications including ERPNext, CRM, HR, and more built on Frappe Framework",
    keywords: ["frappe", "erpnext", "business", "enterprise", "open source", "erp", "crm", "hr", "accounting", "framework", "product suite", "business applications"],
    category: ["business"],
    difficulty: "advanced"
  },
  {
    file: "presentations/intro-grocy.json",
    title: "Introduction to Grocy - ERP for Home & Small Inventory Management",
    description: "Complete guide to Grocy open-source ERP system for household inventory, pantry management, and small business stock control",
    keywords: ["grocy", "erp", "inventory-management", "pantry-tracking", "self-hosted", "home-automation", "stock-management", "barcode-scanning", "meal-planning", "shopping-list", "chores", "maintenance-tracking", "docker", "raspberry-pi", "home-assistant", "rest-api", "automation", "open-source", "household-management", "small-business", "barcode-buddy", "recipe-management", "expiry-tracking", "batch-management"],
    category: ["business", "tools"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-retool.json",
    title: "Introduction to Retool",
    description: "Low-code platform to build internal tools fast with pre-built components",
    keywords: ["retool", "low-code", "internal-tools", "admin-panel", "dashboard", "business", "rapid-development"],
    category: ["business"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-appsmith-tooljet.json",
    title: "Introduction to Appsmith & ToolJet",
    description: "Open-source low-code platforms for building internal tools and admin panels",
    keywords: ["appsmith", "tooljet", "low-code", "open-source", "internal-tools", "self-hosted", "business"],
    category: ["business"],
    difficulty: "beginner"
  },

  // ============= TOOLS & PRODUCTIVITY (BEGINNER TO ADVANCED) =============
  {
    file: "presentations/intro-powertoys.json",
    title: "Introduction to Microsoft PowerToys",
    description: "Complete Windows productivity toolkit guide from installation to advanced workflows",
    keywords: ["microsoft", "powertoys", "windows", "productivity", "utilities", "automation", "keyboard-shortcuts", "window-management", "fancyzones", "powertoys-run", "windows-tools", "power-user", "workflow-optimization"],
    category: ["tools"],
    difficulty: "beginner"
  },
  {
    file: "presentations/intro-ghost.json",
    title: "Ghost - Just a Blogging Platform",
    description: "Complete guide to modern publishing platform from setup to monetization",
    keywords: ["ghost", "blogging", "publishing", "nodejs", "cms", "membership", "newsletter", "headless-cms", "content-creation"],
    category: ["tools", "business"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-n8n.json",
    title: "Introduction to n8n",
    description: "Complete workflow automation platform guide from basics to advanced enterprise deployment",
    keywords: ["n8n", "workflow-automation", "node-based-automation", "self-hosted", "open-source", "fair-code", "api-integration", "webhooks", "automation-tools", "no-code", "low-code", "workflow-orchestration", "business-automation"],
    category: ["tools", "ai-data"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-stirling-pdf.json",
    title: "Introduction to Stirling PDF",
    description: "Complete self-hosted PDF processing toolkit with advanced document management capabilities",
    keywords: ["stirling-pdf", "pdf", "document-processing", "self-hosted", "open-source", "docker", "ocr", "pdf-manipulation", "document-management", "privacy", "pdf-tools", "self-hosted-pdf", "pdf-conversion", "pdf-editing"],
    category: ["tools"],
    difficulty: "intermediate"
  },
  {
    file: "presentations/intro-imhex.json",
    title: "Introduction to ImHex - Advanced Hex Editor",
    description: "Complete guide to ImHex hex editor for reverse engineering, firmware analysis, and binary forensics",
    keywords: ["imhex", "hex-editor", "reverse-engineering", "binary-analysis", "firmware", "malware-analysis", "forensics", "pattern-language", "security-research", "embedded-systems", "ghidra", "ida-pro", "radare2", "binary-patching", "memory-analysis", "file-formats", "elf", "pe", "png", "checksum", "hashing", "entropy-analysis", "data-visualization", "plugins", "scripting"],
    category: ["tools", "security"],
    difficulty: "advanced"
  },
  {
    file: "presentations/intro-keycloak.json",
    title: "Introduction to Keycloak",
    description: "Learn about Keycloak, an open source identity and access management solution",
    keywords: ["keycloak", "iam", "identity", "access management", "sso", "oauth2", "oidc"],
    category: ["security"],
    difficulty: "advanced"
  },
  {
    file: "presentations/aspnet-core.json",
    title: "ASP.NET Core",
    description: "Beginner-friendly introduction to ASP.NET Core and Web APIs",
    keywords: ["aspnet-core", "dotnet", "csharp", "web-api"],
    category: ["backend"],
    difficulty: "beginner"
  }
];
