const fs = require('fs');

const json = {
  presentation: {
    topics: [
      {
        id: "title",
        title: "Title",
        slides: [
          {
            type: "title",
            title: "Terraform Deep Dive",
            subtitle: "Infrastructure as Code for Modern Cloud Platforms",
            backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
          },
          {
            type: "presenter",
            title: "Presented by",
            presenter: "BUDE Global Tech Team",
            description: "Your gateway to modern cloud infrastructure",
            avatar: "https://ui-avatars.com/api/?name=BUDE+Global&background=0060a0&color=fff"
          },
          {
            type: "topic-title",
            title: "What is Terraform?",
            subtitle: "Infrastructure as Code Revolution"
          },
          {
            type: "content",
            title: "Introduction to Terraform",
            box: {
              title: "Terraform Overview",
              list: [
                { emoji: "🏗️", text: "Open-source IaC tool by HashiCorp" },
                { emoji: "📝", text: "Declarative configuration language (HCL)" },
                { emoji: "☁️", text: "Multi-cloud support (AWS, Azure, GCP, etc.)" },
                { emoji: "🔄", text: "Plan, apply, and manage infrastructure changes" },
                { emoji: "📊", text: "State management for tracking resources" }
              ]
            }
          },
          {
            type: "content",
            title: "Why Infrastructure as Code?",
            box: {
              title: "Benefits of IaC",
              list: [
                { emoji: "✅", text: "Version control for infrastructure" },
                { emoji: "🔁", text: "Reproducible environments" },
                { emoji: "⚡", text: "Automated provisioning" },
                { emoji: "👥", text: "Collaboration and code review" },
                { emoji: "🛡️", text: "Consistency and reduced errors" }
              ]
            }
          },
          {
            type: "topic-title",
            title: "Core Concepts",
            subtitle: "Building Blocks of Terraform"
          },
          {
            type: "content",
            title: "Providers",
            box: {
              title: "What are Providers?",
              content: "Providers are plugins that Terraform uses to interact with cloud platforms, SaaS providers, and other APIs. They define the resources available for a specific platform."
            },
            note: { text: "There are over 1000+ providers in the Terraform Registry" }
          },
          {
            type: "content",
            title: "Resources",
            box: {
              title: "Resource Definition",
              content: "Resources are the most important element in Terraform. Each resource block describes infrastructure objects like virtual machines, networks, or containers."
            }
          },
          {
            type: "content",
            title: "Data Sources",
            box: {
              title: "Reading Existing Data",
              content: "Data sources allow Terraform to fetch information from existing infrastructure rather than creating new resources. They are read-only and can be used in other resources."
            }
          },
          {
            type: "content",
            title: "Variables and Outputs",
            box: {
              title: "Parameterization",
              list: [
                { emoji: "📥", text: "Input Variables - Customize configurations" },
                { emoji: "📤", text: "Output Values - Share data between modules" },
                { emoji: "🔐", text: "Sensitive values - Protect secrets" }
              ]
            }
          },
          {
            type: "topic-title",
            title: "Terraform Workflow",
            subtitle: "Write, Plan, Apply"
          },
          {
            type: "content",
            title: "The Terraform Lifecycle",
            box: {
              title: "Workflow Steps",
              list: [
                { emoji: "✍️", text: "Write - Define infrastructure in .tf files" },
                { emoji: "📋", text: "Init - Initialize working directory" },
                { emoji: "🔭", text: "Plan - Preview changes before applying" },
                { emoji: "🚀", text: "Apply - Execute the planned changes" },
                { emoji: "🔄", text: "Destroy - Remove managed resources" }
              ]
            }
          },
          {
            type: "content",
            title: "terraform init",
            box: {
              title: "Initialization",
              content: "Initializes a Terraform working directory, downloading providers and setting up the backend. Must be run before any other Terraform commands."
            },
            note: { text: "Downloads provider plugins from the Terraform Registry" }
          },
          {
            type: "content",
            title: "terraform plan",
            box: {
              title: "Planning Phase",
              content: "Creates an execution plan showing what actions Terraform will take to reach the desired state. Use -out to save the plan for apply."
            },
            note: { text: "Always review the plan before applying changes!" }
          },
          {
            type: "content",
            title: "terraform apply",
            box: {
              title: "Applying Changes",
              content: "Executes the actions proposed in the plan. Prompts for confirmation unless auto-approved with -auto-approve flag."
            }
          },
          {
            type: "content",
            title: "terraform destroy",
            box: {
              title: "Cleanup",
              content: "Destroys all resources defined in the configuration. Use with caution as this permanently removes infrastructure."
            },
            note: { text: "Always backup important data before destroying resources" }
          },
          {
            type: "topic-title",
            title: "HCL Syntax",
            subtitle: "HashiCorp Configuration Language"
          },
          {
            type: "content",
            title: "Basic Syntax",
            box: {
              title: "HCL Structure",
              content: "HCL uses blocks to define configuration. Each block has a type, labels, and a body containing arguments."
            },
            note: { text: "HCL is designed to be human-readable and machine-friendly" }
          },
          {
            type: "diagram",
            title: "HCL Block Structure",
            content: "resource \"aws_instance\" \"web\" {\n  ami           = \"ami-12345678\"\n  instance_type = \"t3.micro\"\n  tags = {\n    Name = \"WebServer\"\n  }\n}\n\n# Block parts:\n# - Type: resource\n# - Labels: aws_instance, web\n# - Arguments: ami, instance_type, tags",
            note: { text: "Arguments can be strings, numbers, booleans, or complex types" }
          },
          {
            type: "content",
            title: "Data Types",
            box: {
              title: "Supported Types",
              list: [
                { emoji: "🔤", text: "String - Text values in quotes" },
                { emoji: "🔢", text: "Number - Integer or float" },
                { emoji: "✅", text: "Boolean - true/false" },
                { emoji: "📋", text: "List - Ordered collection [item1, item2]" },
                { emoji: "📦", text: "Map - Key-value pairs {key = value}" }
              ]
            }
          },
          {
            type: "content",
            title: "Expressions",
            box: {
              title: "Using Expressions",
              content: "Expressions reference values, perform operations, and transform data. They can use functions, operators, and interpolation."
            }
          },
          {
            type: "topic-title",
            title: "Variables & Modules",
            subtitle: "Reusable Configuration"
          },
          {
            type: "content",
            title: "Input Variables",
            box: {
              title: "Variable Definition",
              content: "Variables make configurations flexible and reusable. Define type, default value, and description for each variable."
            }
          },
          {
            type: "content",
            title: "Variable Types",
            box: {
              title: "Type Constraints",
              list: [
                { emoji: "str", text: "string - Single text value" },
                { emoji: "num", text: "number - Integer or decimal" },
                { emoji: "bool", text: "boolean - true or false" },
                { emoji: "list", text: "list - Ordered sequence" },
                { emoji: "map", text: "map - Key-value pairs" },
                { emoji: "obj", text: "object - Complex structured data" }
              ]
            }
          },
          {
            type: "content",
            title: "Output Values",
            box: {
              title: "Exposing Values",
              content: "Output values expose values from child modules to the root module or make them accessible via terraform output command."
            },
            note: { text: "Use sensitive = true to hide outputs in console" }
          },
          {
            type: "content",
            title: "Modules",
            box: {
              title: "Code Reusability",
              content: "Modules are containers for multiple resources used together. They enable code reuse, organization, and abstraction."
            },
            note: { text: "Use modules from Registry or create custom modules" }
          },
          {
            type: "content",
            title: "Module Composition",
            box: {
              title: "Best Practices",
              list: [
                { emoji: "📁", text: "Small, focused modules" },
                { emoji: "🔗", text: "Loose coupling via variables" },
                { emoji: "📦", text: "Version pinned modules" },
                { emoji: "📚", text: "Document inputs and outputs" }
              ]
            }
          },
          {
            type: "topic-title",
            title: "State Management",
            subtitle: "Tracking Infrastructure"
          },
          {
            type: "content",
            title: "What is State?",
            box: {
              title: "Terraform State",
              content: "Terraform uses state to map real-world resources to your configuration, track metadata, and improve performance."
            },
            note: { text: "State is stored in a state file (terraform.tfstate)" }
          },
          {
            type: "content",
            title: "Local vs Remote State",
            box: {
              title: "State Storage Options",
              list: [
                { emoji: "💻", text: "Local - Store on disk (default)" },
                { emoji: "☁️", text: "Remote - S3, Azure Blob, GCS" },
                { emoji: "🔒", text: "Remote enables team collaboration" },
                { emoji: "🔐", text: "Enable state locking for safety" }
              ]
            }
          },
          {
            type: "content",
            title: "State Locking",
            box: {
              title: "Concurrency Safety",
              content: "State locking prevents concurrent operations that could corrupt state. Supported by backends like S3, Azure, and Terraform Cloud."
            },
            note: { text: "Always enable state locking for team workflows" }
          },
          {
            type: "content",
            title: "Workspaces",
            box: {
              title: "Multiple Environments",
              content: "Workspaces allow multiple states in the same configuration. Useful for managing dev, staging, and production environments."
            }
          },
          {
            type: "topic-title",
            title: "Best Practices",
            subtitle: "Production-Ready Terraform"
          },
          {
            type: "content",
            title: "Organization",
            box: {
              title: "Directory Structure",
              list: [
                { emoji: "📂", text: "Separate environments (dev/staging/prod)" },
                { emoji: "📂", text: "Module-based architecture" },
                { emoji: "📂", text: "Backend configuration separate" },
                { emoji: "📂", text: "Version control-friendly layout" }
              ]
            }
          },
          {
            type: "content",
            title: "Version Control",
            box: {
              title: "Git Best Practices",
              list: [
                { emoji: "🙈", text: "Add .terraform to .gitignore" },
                { emoji: "🔒", text: "Never commit state files" },
                { emoji: "📝", text: "Meaningful commit messages" },
                { emoji: "🔀", text: "Use branches for changes" }
              ]
            }
          },
          {
            type: "content",
            title: "Security",
            box: {
              title: "Secure Configuration",
              list: [
                { emoji: "🔐", text: "Never hardcode secrets in .tf files" },
                { emoji: "🗝️", text: "Use environment variables or Vault" },
                { emoji: "🔒", text: "Enable state encryption" },
                { emoji: "👥", text: "Use least-privilege IAM roles" }
              ]
            }
          },
          {
            type: "content",
            title: "Terraform Cloud & Enterprise",
            box: {
              title: "Managed Solutions",
              content: "Terraform Cloud provides remote execution, state management, and a private registry. Enterprise adds SSO, policy enforcement, and custom support."
            },
            note: { text: "Free tier available for small teams" }
          },
          {
            type: "topic-title",
            title: "Advanced Features",
            subtitle: "Level Up Your Terraform"
          },
          {
            type: "content",
            title: "Provisioners",
            box: {
              title: "Custom Actions",
              content: "Provisioners execute scripts or commands on created resources. Use sparingly - prefer cloud-init or startup scripts."
            },
            note: { text: "Last resort - native cloud features are preferred" }
          },
          {
            type: "content",
            title: "Functions",
            box: {
              title: "Built-in Functions",
              list: [
                { emoji: "🔢", text: "Numeric - min, max, floor, ceil" },
                { emoji: "🔤", text: "String - lower, upper, trim, join" },
                { emoji: "📋", text: "Collection - length, keys, values, merge" },
                { emoji: "🔄", text: "Conversion - tolist, tomap, jsonencode" }
              ]
            }
          },
          {
            type: "content",
            title: "Dynamic Blocks",
            box: {
              title: "Iterative Configuration",
              content: "Dynamic blocks generate nested configuration blocks programmatically. Replace repeated blocks with a dynamic iteration."
            }
          },
          {
            type: "content",
            title: "for_each & count",
            box: {
              title: "Resource Multiplication",
              list: [
                { emoji: "🔢", text: "count - Simple numeric iteration" },
                { emoji: "🔄", text: "for_each - Set or map-based iteration" },
                { emoji: "📋", text: "each.key and each.value access" }
              ]
            }
          },
          {
            type: "topic-title",
            title: "Testing & CI/CD",
            subtitle: "Automated Workflows"
          },
          {
            type: "content",
            title: "Terraform Validate",
            box: {
              title: "Syntax Checking",
              content: "terraform validate checks syntax and internal consistency without accessing remote services. Run before any plan or apply."
            }
          },
          {
            type: "content",
            title: "Terraform fmt",
            box: {
              title: "Code Formatting",
              content: "terraform fmt formats configuration files according to standard style. Use -recursive for entire directories."
            },
            note: { text: "Run fmt before committing code" }
          },
          {
            type: "content",
            title: "Terraform Test",
            box: {
              title: "Module Testing",
              content: "Terraform test runs test cases defined in .tf test files. Validates that modules work as expected with different inputs."
            }
          },
          {
            type: "content",
            title: "CI/CD Integration",
            box: {
              title: "Pipeline Integration",
              list: [
                { emoji: "🔧", text: "GitHub Actions workflow" },
                { emoji: "🔧", text: "GitLab CI pipeline" },
                { emoji: "🔧", text: "Jenkins automation" },
                { emoji: "🔧", text: "Azure DevOps" }
              ]
            }
          },
          {
            type: "topic-title",
            title: "Troubleshooting",
            subtitle: "Debugging Terraform"
          },
          {
            type: "content",
            title: "Common Issues",
            box: {
              title: "Frequent Problems",
              list: [
                { emoji: "🔄", text: "State drift - manual changes to resources" },
                { emoji: "🔒", text: "Lock contention - concurrent applies" },
                { emoji: "❌", text: "Provider version conflicts" },
                { emoji: "📋", text: "Missing required attributes" }
              ]
            }
          },
          {
            type: "content",
            title: "terraform graph",
            box: {
              title: "Dependency Visualization",
              content: "Generates a visual representation of resource dependencies. Useful for understanding complex configurations."
            }
          },
          {
            type: "content",
            title: "Debug Mode",
            box: {
              title: "TF_LOG Environment Variable",
              content: "Set TF_LOG=DEBUG for detailed debugging output. Use TF_LOG_PATH to write logs to a file."
            },
            note: { text: "Logs contain sensitive information - handle carefully" }
          },
          {
            type: "topic-title",
            title: "Ecosystem",
            subtitle: "Related Tools & Integrations"
          },
          {
            type: "content",
            title: "Terraform vs Alternatives",
            box: {
              title: "Comparison",
              list: [
                { emoji: "📦", text: "CloudFormation - AWS native, JSON/YAML" },
                { emoji: "📦", text: "ARM Templates - Azure native" },
                { emoji: "📦", text: "Deployment Manager - GCP native" },
                { emoji: "📦", text: "Pulumi - General-purpose languages" },
                { emoji: "📦", text: "Ansible - Agent-based, procedural" }
              ]
            }
          },
          {
            type: "content",
            title: "Terragrunt",
            box: {
              title: "Terraform Wrapper",
              content: "Terragrunt provides additional tooling for Terraform - DRY configurations, remote state management, and hooks."
            },
            note: { text: "Popular for large mono-repos" }
          },
          {
            type: "content",
            title: "Terraform CDK",
            box: {
              title: "Programmatic Definitions",
              content: "Cloud Development Kit (CDK) allows defining infrastructure in TypeScript, Python, Go, Java, or C# instead of HCL."
            }
          },
          {
            type: "topic-title",
            title: "Summary",
            subtitle: "Key Takeaways"
          },
          {
            type: "content",
            title: "What We Learned",
            box: {
              title: "Core Concepts",
              list: [
                { emoji: "✅", text: "Infrastructure as Code principles" },
                { emoji: "✅", text: "Terraform workflow and commands" },
                { emoji: "✅", text: "HCL syntax and expressions" },
                { emoji: "✅", text: "Variables, modules, and state" },
                { emoji: "✅", text: "Best practices and testing" }
              ]
            }
          },
          {
            type: "qa",
            title: "Questions & Answers",
            subtitle: "Let's discuss!"
          },
          {
            type: "thank-you",
            title: "Thank You!",
            message: "BUDE Global Tech Presentations",
            contact: "https://github.com/BUDEGlobalEnterprise"
          }
        ]
      }
    ]
  }
};

fs.writeFileSync('C:/Github/bude-global-tech-presentations/presentations/intro-terraform.json', JSON.stringify(json, null, 2), 'utf8');
console.log('Terraform presentation with 50+ slides created successfully!');