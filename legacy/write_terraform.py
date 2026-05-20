import json

terraform_json = """{
  "presentation": {
    "topics": [
      {
        "id": "title",
        "title": "Title",
        "slides": [
          {
            "type": "title",
            "title": "Terraform Deep Dive",
            "subtitle": "Infrastructure as Code for Modern Cloud Platforms",
            "backgroundImage": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          }
        ]
      }
    ]
  }
}"""

with open(
    "C:/Github/bude-global-tech-presentations/presentations/intro-terraform.json",
    "w",
    encoding="utf-8",
) as f:
    f.write(terraform_json)
print("Done")
