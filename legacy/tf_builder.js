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
          }
        ]
      }
    ]
  }
};
const jsonStr = JSON.stringify(json, null, 2);
fs.writeFileSync('C:/Github/bude-global-tech-presentations/presentations/intro-terraform.json', jsonStr, 'utf8');
console.log("File written successfully");