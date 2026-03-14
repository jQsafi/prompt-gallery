# Product Requirements Document (PRD): Prompt Collection

## 1. Project Overview
**Prompt Collection** is a professional, high-performance Web GUI designed to manage, visualize, and interact with a library of prompts stored as Markdown files in a GitHub repository. It eliminates the need for a traditional backend by treating the GitHub repository as the primary data source.

## 2. Core Features
- **Interactive Dashboard**: A central hub showing high-level stats (prompt count, most used, category breakdown).
- **Data Visualization**: Real-time charts using Recharts/D3.js to visualize prompt usage and tag distribution.
- **Responsive Design**: Mobile-first UI that works seamlessly across all screen sizes (Termux-friendly).
- **User Authentication**: GitHub OAuth integration for authorized prompt contributions and private repository access.
- **API Integration**: Deep integration with the GitHub REST API for reading/writing prompts.
- **Real-Time Simulation**: Polling and GitHub Webhook support for syncing changes immediately.
- **Performance Optimization**: Lazy loading of prompts and client-side indexing for instant search.
- **Accessibility & Compatibility**: Adherence to WCAG standards and compatibility with all modern browsers.
- **Error Handling**: Centralized error boundaries and meaningful user feedback for API failures.

## 3. Technical Architecture (No-Backend)
- **Frontend**: React (TypeScript) + Vite + Vanilla CSS.
- **Data Source**: GitHub Repository (`data/` folder).
- **Indexing**: A GitHub Action generates a `prompts-index.json` on every push to the `main` branch.
- **State Management**: React Context or lightweight Zustand for global filtering and auth state.
- **Markdown Processing**: `gray-matter` for frontmatter extraction and `marked` for HTML rendering.

## 4. Markdown Standards & Schema
All prompt files MUST reside in `data/prompts/` and follow this template:

```markdown
---
id: "unique-slug"
title: "Human Readable Title"
category: "category-name"
tags: ["tag1", "tag2"]
model_compatibility: ["GPT-4", "Claude-3.5"]
version: "1.0.0"
last_updated: "YYYY-MM-DD"
usage_count: 0
---

# Prompt Description
Context and goal of the prompt.

# The Prompt
```text
The actual prompt content with {{variables}}.
\```

# Documentation
Instructions on how to use and refine this prompt.
```

## 5. Content Generation Rules
1. **Naming**: Filenames must be `kebab-case.md`.
2. **Variables**: Use double curly braces `{{variable_name}}` for dynamic inputs.
3. **Categories**: Must match predefined directories in `data/categories/`.
4. **Automated Documentation**: Documentation is pro-generated from the `# Documentation` section of each prompt.

## 6. Version Control & Deployment
- **Branching**: `main` is production; `drafts/` for new prompts.
- **Indexing Action**: `.github/workflows/index-prompts.yml` runs on every push to update the master index file.
- **Deployment**: Hosted on GitHub Pages or Vercel (static).
- **Output Format**: A statically generated, highly interactive single-page application (SPA).
