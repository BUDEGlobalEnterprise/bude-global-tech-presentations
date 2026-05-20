#!/bin/bash

# GitHub Issue Creator for Bude Global Tech Presentations
# This script creates GitHub issues for all pending presentations

# Configuration
REPO_OWNER="BUDEGlobalEnterprise"
REPO_NAME="bude-global-tech-presentations"

# GitHub CLI must be installed and authenticated
# Install: https://cli.github.com/
# Authenticate: gh auth login

echo "🚀 Creating GitHub Issues for Pending Presentations"
echo "=================================================="
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ Error: GitHub CLI (gh) is not installed"
    echo "Please install from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Error: Not authenticated with GitHub"
    echo "Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI authenticated"
echo ""

# Function to create issue
create_issue() {
    local number=$1
    local title=$2
    local category=$3
    local description=$4
    local difficulty=$5
    local keywords=$6
    
    echo "Creating issue #$number: $title"
    
    # Create issue body
    body="## 📋 Presentation Request

### Topic
$title

### Description
$description

### Category
$category

### Keywords
$keywords

### Checklist
- [ ] Create JSON file in \`presentations/\` directory
- [ ] Follow existing presentation structure
- [ ] Include code examples where applicable
- [ ] Add presenter information
- [ ] Test presentation in browser
- [ ] Update \`presentations.js\` configuration
- [ ] Submit Pull Request

### Resources
- [Template](templates/sample-presentation.json)
- [Contribution Guide](CONTRIBUTING.md)
- [Existing Presentations](presentations/)

### Notes
- Use the presentation template as a starting point
- Include practical examples and code snippets
- Keep slides concise and visually appealing
- Add speaker notes where helpful

---
**Want to work on this?** Comment below to claim this issue!"

    # Create the issue
    gh issue create \
        --repo "$REPO_OWNER/$REPO_NAME" \
        --title "$title" \
        --body "$body" \
        --label "category:$category,status:todo,difficulty:$difficulty,help wanted,good first issue" \
        --assignee ""
        
    echo "✅ Created issue: $title"
    echo ""
    sleep 2  # Rate limiting
}

# Programming Languages
echo "📦 Creating Programming Languages Issues..."
create_issue 41 "Go (Golang)" "programming" "Introduction to Go programming language - syntax, concurrency, packages, and building performant applications" "intermediate" "go, golang, backend, concurrency"
create_issue 42 "Rust" "programming" "Systems programming with Rust - memory safety, ownership, borrowing, and zero-cost abstractions" "advanced" "rust, systems-programming, memory-safety"
create_issue 43 "PHP" "programming" "Modern PHP development - PHP 8.x features, frameworks, and best practices" "beginner" "php, web-development, laravel"
create_issue 44 "Ruby" "programming" "Ruby language fundamentals - syntax, gems, and Rails framework basics" "intermediate" "ruby, rails, web-development"
create_issue 45 "Swift" "programming" "iOS development with Swift - Swift syntax, SwiftUI, and app development" "intermediate" "swift, ios, apple, mobile"
create_issue 46 "Kotlin" "programming" "Android development with Kotlin - language features, Android SDK, and Jetpack" "intermediate" "kotlin, android, mobile, jetpack"
create_issue 47 "Dart & Flutter" "programming" "Cross-platform mobile development with Flutter - widgets, state management, and deployment" "intermediate" "dart, flutter, mobile, cross-platform"
create_issue 48 "Bash Scripting" "programming" "Shell scripting mastery - automation, text processing, and system administration" "beginner" "bash, shell, scripting, linux"
create_issue 49 "Regex" "programming" "Regular expressions guide - pattern matching, validation, and practical examples" "beginner" "regex, patterns, text-processing"

# Backend Frameworks
echo "🔧 Creating Backend Frameworks Issues..."
create_issue 50 "Django" "backend" "Python web framework - MVT pattern, ORM, admin panel, and REST APIs" "intermediate" "django, python, web-framework, rest"
create_issue 51 "Flask" "backend" "Lightweight Python web framework - routing, templates, and microservices" "beginner" "flask, python, microframework, api"
create_issue 52 "FastAPI" "backend" "Modern Python API framework - async support, automatic docs, type hints" "intermediate" "fastapi, python, async, api"
create_issue 53 "Laravel" "backend" "PHP web application framework - MVC, Eloquent ORM, and Blade templates" "intermediate" "laravel, php, mvc, eloquent"
create_issue 54 "Spring Boot" "backend" "Java/Kotlin framework - dependency injection, REST APIs, and microservices" "advanced" "spring-boot, java, kotlin, enterprise"
create_issue 55 "ASP.NET Core" "backend" "Modern .NET web framework - MVC, Web API, and Entity Framework" "intermediate" "aspnet-core, dotnet, csharp, web-api"
create_issue 56 "Express.js Deep Dive" "backend" "Node.js web framework - middleware, routing, and REST API development" "beginner" "express, nodejs, javascript, api"
create_issue 57 "Bun / Hono" "backend" "Next-gen JavaScript runtime and framework - performance, compatibility" "intermediate" "bun, hono, javascript, performance"

# Databases
echo "💾 Creating Database Issues..."
create_issue 58 "Redis" "database" "In-memory data structure store - caching, pub/sub, and session management" "intermediate" "redis, cache, nosql, in-memory"
create_issue 59 "SQLite" "database" "Embedded database engine - serverless, zero-config, and mobile apps" "beginner" "sqlite, embedded, sql, mobile"
create_issue 60 "Cassandra" "database" "Distributed NoSQL database - scalability, high availability, and big data" "advanced" "cassandra, nosql, distributed, big-data"
create_issue 61 "Neo4j" "database" "Graph database platform - nodes, relationships, Cypher query language" "intermediate" "neo4j, graph-database, cypher, relationships"
create_issue 62 "Supabase" "database" "Open-source Firebase alternative - PostgreSQL, auth, storage, and real-time" "beginner" "supabase, backend-as-service, postgresql, firebase"
create_issue 63 "Firebase" "database" "Google's mobile platform - Firestore, authentication, hosting, and analytics" "beginner" "firebase, google, baas, mobile"
create_issue 64 "Prisma ORM" "database" "Next-generation ORM - type-safe queries, migrations, and database modeling" "intermediate" "prisma, orm, typescript, database"
create_issue 65 "Elasticsearch" "database" "Search and analytics engine - full-text search, logging, and metrics" "advanced" "elasticsearch, search, analytics, elk"

# DevOps
echo "🚀 Creating DevOps Issues..."
create_issue 66 "Terraform" "devops" "Infrastructure as Code - resource provisioning, state management, modules" "advanced" "terraform, iac, cloud, automation"
create_issue 67 "Ansible" "devops" "Configuration management tool - playbooks, inventory, automation" "intermediate" "ansible, automation, configuration, devops"
create_issue 68 "Helm" "devops" "Kubernetes package manager - charts, releases, and application deployment" "intermediate" "helm, kubernetes, k8s, charts"
create_issue 69 "ArgoCD / GitOps" "devops" "Continuous delivery for Kubernetes - declarative GitOps, sync, and rollback" "advanced" "argocd, gitops, kubernetes, cd"
create_issue 70 "Prometheus & Grafana" "devops" "Monitoring and visualization - metrics, alerts, and dashboards" "intermediate" "prometheus, grafana, monitoring, observability"
create_issue 71 "HashiCorp Vault" "devops" "Secrets management - encryption, access control, and secret rotation" "advanced" "vault, secrets, security, hashicorp"
create_issue 72 "Nginx Deep Dive" "devops" "Web server and reverse proxy - load balancing, SSL, and performance tuning" "intermediate" "nginx, web-server, reverse-proxy, load-balancing"
create_issue 73 "Cloudflare" "devops" "CDN and security platform - DNS, DDoS protection, and Workers" "intermediate" "cloudflare, cdn, security, edge"
create_issue 74 "GitHub Actions CI/CD" "devops" "Automation workflows - CI/CD pipelines, matrix builds, and actions" "beginner" "github-actions, cicd, automation, workflows"
create_issue 75 "OpenTofu" "devops" "Open-source Terraform alternative - community-driven IaC" "intermediate" "opentofu, terraform, iac, open-source"

# Security
echo "🔒 Creating Security Issues..."
create_issue 76 "OAuth2 & OIDC" "security" "Modern authentication protocols - authorization flows, tokens, and SSO" "advanced" "oauth2, oidc, authentication, sso"
create_issue 77 "JWT Deep Dive" "security" "JSON Web Tokens explained - structure, claims, and security best practices" "intermediate" "jwt, tokens, authentication, security"
create_issue 78 "OWASP Top 10" "security" "Web application security risks - injection, XSS, CSRF, and mitigations" "intermediate" "owasp, security, vulnerabilities, web"
create_issue 79 "Zero Trust Architecture" "security" "Modern security model - never trust always verify, micro-segmentation" "advanced" "zero-trust, security, architecture, network"
create_issue 80 "API Security" "security" "Securing REST & GraphQL APIs - rate limiting, authentication, validation" "intermediate" "api-security, rest, graphql, authentication"
create_issue 81 "Linux Hardening" "security" "Server security best practices - firewall, SELinux, audit, and updates" "advanced" "linux, hardening, security, server"
create_issue 82 "Secret Management" "security" "Managing credentials securely - vaults, rotation, and environment variables" "intermediate" "secrets, credentials, security, vault"

# AI & Data
echo "🤖 Creating AI & Data Issues..."
create_issue 83 "LangChain" "ai-data" "Building LLM applications - chains, agents, memory, and tools" "intermediate" "langchain, llm, ai, python"
create_issue 84 "LLMs + Vector DBs" "ai-data" "AI-powered search - embeddings, similarity search, and retrieval" "advanced" "llm, vector-database, embeddings, rag"
create_issue 85 "Pandas Data Analysis" "ai-data" "Python data manipulation - DataFrames, cleaning, analysis, and visualization" "beginner" "pandas, python, data-analysis, numpy"
create_issue 86 "Apache Kafka" "ai-data" "Distributed streaming platform - topics, producers, consumers, and streams" "advanced" "kafka, streaming, distributed, messaging"
create_issue 87 "Airflow" "ai-data" "Workflow orchestration - DAGs, operators, scheduling, and monitoring" "intermediate" "airflow, workflow, orchestration, etl"
create_issue 88 "RPA Automation" "ai-data" "Robotic Process Automation - UiPath, Automation Anywhere, and use cases" "intermediate" "rpa, automation, bots, workflow"
create_issue 89 "Computer Vision Basics" "ai-data" "Image processing with OpenCV - object detection, recognition, and tracking" "intermediate" "computer-vision, opencv, image-processing, ai"

# Tools
echo "🛠️ Creating Tools & Productivity Issues..."
create_issue 90 "Obsidian PKM" "tools" "Personal knowledge management - markdown, linking, plugins, and workflows" "beginner" "obsidian, pkm, notes, markdown"
create_issue 91 "Zettelkasten" "tools" "Note-taking methodology - atomic notes, linking, and knowledge building" "beginner" "zettelkasten, notes, methodology, pkm"
create_issue 92 "Notion for Docs" "tools" "Collaborative documentation - databases, templates, and team workflows" "beginner" "notion, documentation, collaboration, wiki"
create_issue 93 "VS Code Deep Workflow" "tools" "Advanced editor techniques - shortcuts, extensions, and productivity hacks" "intermediate" "vscode, editor, productivity, development"
create_issue 94 "Raycast / Alfred" "tools" "Productivity launchers - workflows, snippets, and automation (macOS)" "beginner" "raycast, alfred, productivity, macos"
create_issue 95 "AI Coding Assistants" "tools" "GitHub Copilot, Cursor, and AI pair programming - usage and best practices" "beginner" "ai, copilot, cursor, coding-assistant"

# Business Applications
echo "💼 Creating Business Applications Issues..."
create_issue 96 "Odoo ERP" "business" "Open-source ERP suite - modules, customization, and deployment" "advanced" "odoo, erp, business, python"
create_issue 97 "Dolibarr" "business" "ERP & CRM software - modules, workflow, and integration" "intermediate" "dolibarr, erp, crm, php"
create_issue 98 "OpenProject" "business" "Project management platform - agile, gantt charts, and collaboration" "intermediate" "openproject, project-management, agile"
create_issue 99 "Apache Superset" "business" "Business intelligence platform - visualizations, dashboards, and SQL" "intermediate" "superset, bi, visualization, analytics"
create_issue 100 "Redash" "business" "Data visualization tool - queries, dashboards, and alerts" "intermediate" "redash, visualization, analytics, sql"
create_issue 101 "Appsmith / ToolJet" "business" "Low-code app builders - internal tools, CRUD apps, and integrations" "beginner" "appsmith, tooljet, low-code, internal-tools"
create_issue 102 "Retool" "business" "Internal tool builder - drag-drop UI, database connections, APIs" "intermediate" "retool, internal-tools, low-code, admin"

echo ""
echo "=================================================="
echo "✅ All GitHub issues created successfully!"
echo ""
echo "📊 Summary:"
echo "  - Programming Languages: 9 issues"
echo "  - Backend Frameworks: 8 issues"
echo "  - Databases: 8 issues"
echo "  - DevOps: 10 issues"
echo "  - Security: 7 issues"
echo "  - AI & Data: 7 issues"
echo "  - Tools: 6 issues"
echo "  - Business: 7 issues"
echo ""
echo "🔗 View all issues:"
echo "   https://github.com/$REPO_OWNER/$REPO_NAME/issues"
echo ""
echo "🎯 Next steps:"
echo "  1. Review created issues"
echo "  2. Add milestones for quarterly goals"
echo "  3. Assign priority labels"
echo "  4. Share with contributors"
echo ""