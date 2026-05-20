import json

content = """{
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
            "backgroundImage": "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
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
    f.write(content)
print("Done")
