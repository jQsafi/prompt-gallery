---
id: "rest-api-test-project"
title: "REST API Test Project Boilerplate"
description: "Generate a full Node.js project for testing a REST API with Jest and Supertest."
category: "coding"
tags: ["rest", "api", "testing", "boilerplate"]
model_compatibility: ["GPT-4", "Claude-3.5"]
version: "1.0.0"
last_updated: "2024-03-14"
usage_count: 5
---

# Prompt Description
Generates a complete Node.js + Supertest + Jest boilerplate for testing a REST API.

# The Prompt
```text
Generate a professional test project for a REST API with the following details:
Base URL: {{api_base_url}}
Endpoints to test: {{endpoints_list}}

Requirements:
1. Use Node.js, Jest, and Supertest.
2. Include a helper for handling JWT authentication.
3. Structure the project with a separate 'tests' and 'utils' folder.
4. Provide a sample test case for a GET and POST request.
```

# Documentation
Fill in the `api_base_url` (e.g., https://api.example.com/v1) and a comma-separated list of `endpoints_list` (e.g., /users, /products, /orders).
