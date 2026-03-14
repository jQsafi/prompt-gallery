# Prompt Collection 🧘

A serene, high-performance interface for managing your prompt library. This project follows a "No-Backend" architecture, treating your Git repository as the sacred text.

## ✨ Core Capabilities

While the interface is simple, the underlying engine possesses powerful features:

- **Dynamic Variables**: Use `{{variable_name}}` in your `.md` files. The interface will provide inputs to fill these, allowing you to customize prompts before use.
- **Syntax Highlighting**: Variables are automatically highlighted in the preview, making them easy to spot.
- **Live Preview**: As you fill in variables, the prompt preview updates in real-time.
- **One-Click Copy**: A "Copy to Clipboard" button lets you grab the fully processed prompt instantly.
- **Markdown-Native**: The entire collection is just a folder of `.md` files, making it portable, version-controllable, and easy to edit.

## 🚀 Getting Started
1. **Navigate to project**: `cd prompt-collection`
2. **Start Development Server**: `npm run dev`
3. **Open the browser**: Usually at `http://localhost:5173`

The main page will display a simple list of all prompts found in the `data/prompts` directory. Clicking a prompt will reveal its content and interactive features.
