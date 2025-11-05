# 🤝 Contributing to Bude Global Tech Presentations

We welcome and appreciate your contributions to the Bude Global Tech Presentations project! By contributing, you help us grow our knowledge base and foster a collaborative learning environment.

Please take a moment to review this document to understand how to contribute effectively.

## 🌟 How to Contribute

There are several ways you can contribute to this project:

1.  **Add a New Presentation**: Share your technical knowledge by adding a new presentation.
2.  **Improve Existing Presentations**: Enhance the content, clarity, or accuracy of current presentations.
3.  **Report Bugs**: Help us identify and fix issues in the platform or presentations.
4.  **Suggest Features**: Propose new ideas to improve the presentation loader or overall experience.
5.  **Improve Documentation**: Enhance this `CONTRIBUTING.md`, `README.md`, or other project documentation.

## ➕ Adding a New Presentation

If you wish to add a new technical presentation, please follow these steps:

### 1. Fork the Repository

First, fork this repository to your GitHub account.

### 2. Clone Your Fork

Clone your forked repository to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/bude-global-tech-presentations.git
cd bude-global-tech-presentations
```

### 3. Create a New Branch

Create a new branch for your presentation. Use a descriptive name, e.g., `feat/add-intro-to-blockchain` or `docs/update-react-presentation`:

```bash
git checkout -b feat/your-presentation-title
```

### 4. Create Your Presentation JSON File

-   Navigate to the `presentations/` directory.
-   Create a new `.json` file for your presentation (e.g., `intro-blockchain.json`).
-   **Structure**: Ensure your JSON content follows the structure of existing presentation files (e.g., `templates/sample-presentation.json`). Each presentation should have a `presentation` object containing `topics`, and each topic should have `slides`.
-   **Content**:
    -   `title`: The main title of your presentation.
    -   `description`: A brief summary of what your presentation covers.
    -   `keywords`: An array of relevant keywords for search and categorization.
    -   `slides`: An array of slide objects, each with a `type`, `title`, and `content` (or other specific fields based on slide type).

### 5. Update `presentations.js`

-   Open the `presentations.js` file located in the root directory.
-   Add a new entry to the `PRESENTATIONS_CONFIG` array for your presentation.
-   Ensure the `file` path, `title`, `description`, and `keywords` are accurate and descriptive.

    ```javascript
    // Example entry in presentations.js
    {
      file: "presentations/intro-blockchain.json",
      title: "Introduction to Blockchain",
      description: "A beginner-friendly guide to blockchain technology and its applications.",
      keywords: ["blockchain", "cryptocurrency", "decentralization", "web3"],
    },
    ```

### 6. Test Your Changes Locally

Before submitting, open `index.html` in your browser and verify that:

-   Your new presentation appears in the selector.
-   You can search for it using its title, description, or keywords.
-   The presentation loads correctly and all slides are displayed as expected.

### 7. Commit Your Changes

Stage your new `.json` file and the updated `presentations.js` file, then commit them with a clear and concise message.

```bash
git add presentations/intro-blockchain.json presentations.js
git commit -m "feat: add introduction to blockchain presentation"
```

### 8. Push to Your Fork

```bash
git push origin feat/your-presentation-title
```

### 9. Create a Pull Request (PR)

-   Go to your forked repository on GitHub.
-   Click on the "Compare & pull request" button.
-   Provide a clear and detailed description of your changes in the pull request. Explain what your presentation is about and any specific features or topics it covers.
-   Submit your pull request.

## 🐛 Reporting Bugs

If you find a bug, please open an issue on GitHub. When reporting a bug, please include:

-   A clear and concise description of the bug.
-   Steps to reproduce the behavior.
-   Expected behavior.
-   Screenshots or error messages (if applicable).
-   Your operating system and browser.

## 💡 Suggesting Features

We'd love to hear your ideas for new features! Please open an issue on GitHub and describe:

-   The feature you'd like to see.
-   Why you think it would be valuable.
-   Any potential solutions or approaches.

## 📝 Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md - *To be created*). By participating in this project, you agree to abide by its terms.

## 🙏 Thank You!

Thank you for your interest in contributing to Bude Global Tech Presentations. Your efforts help make this a valuable resource for everyone!
