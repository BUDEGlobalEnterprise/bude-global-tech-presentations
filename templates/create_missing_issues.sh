#!/bin/bash

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
- [ ] Create JSON file in 
presentations/ directory
- [ ] Follow existing presentation structure
- [ ] Include code examples where applicable
- [ ] Add presenter information
- [ ] Test presentation in browser
- [ ] Update 
presentations.js configuration
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

REPO_OWNER="BUDEGlobalEnterprise"
REPO_NAME="bude-global-tech-presentations"

create_issue 28 "JavaScript Fundamentals" "programming" "An introduction to the fundamentals of JavaScript." "beginner" "javascript, web, programming"
create_issue 29 "TypeScript + Node.js" "programming" "Building backend applications with TypeScript and Node.js." "intermediate" "typescript, nodejs, backend"
create_issue 35 "Vue.js" "programming" "An introduction to the Vue.js framework." "beginner" "vuejs, frontend, javascript"
create_issue 36 "Angular" "programming" "An introduction to the Angular framework." "beginner" "angular, frontend, javascript"
create_issue 37 "Svelte" "programming" "An introduction to the Svelte framework." "beginner" "svelte, frontend, javascript"
create_issue 33 "GraphQL" "backend" "An introduction to GraphQL." "intermediate" "graphql, api, backend"
create_issue 34 "REST & Swagger" "backend" "Designing and documenting RESTful APIs with Swagger." "intermediate" "rest, swagger, api, backend"
create_issue 30 "SQL & Databases" "database" "An introduction to SQL and relational databases." "beginner" "sql, database"
create_issue 22 "WSL" "devops" "Using Windows Subsystem for Linux for development." "beginner" "wsl, windows, linux, devops"
create_issue 31 "AWS Cloud" "devops" "An introduction to Amazon Web Services." "beginner" "aws, cloud, devops"
create_issue 32 "Kubernetes" "devops" "An introduction to Kubernetes." "intermediate" "kubernetes, devops, containers"
create_issue 38 "System Design" "devops" "An introduction to system design concepts." "intermediate" "system design, architecture, devops"
create_issue 39 "DevOps – CI/CD" "devops" "An introduction to CI/CD pipelines." "intermediate" "devops, ci/cd"
create_issue 40 "Machine Learning with Python" "ai-data" "An introduction to machine learning with Python." "intermediate" "machine learning, python, ai"
create_issue 19 "Microsoft PowerToys" "tools" "An introduction to Microsoft PowerToys." "beginner" "powertoys, windows, tools"
create_issue 20 "Stirling PDF" "tools" "An introduction to Stirling PDF." "beginner" "stirling pdf, pdf, tools"
create_issue 21 "n8n" "tools" "An introduction to n8n." "beginner" "n8n, automation, tools"
create_issue 23 "ImHex" "tools" "An introduction to ImHex." "intermediate" "imhex, reverse engineering, tools"
create_issue 24 "AdminLTE" "tools" "An introduction to AdminLTE." "beginner" "adminlte, bootstrap, dashboard, tools"
create_issue 25 "Grocy" "tools" "An introduction to Grocy." "beginner" "grocy, self-hosted, tools"
create_issue 26 "Ghost Blogging Platform" "tools" "An introduction to the Ghost blogging platform." "beginner" "ghost, blogging, tools"
