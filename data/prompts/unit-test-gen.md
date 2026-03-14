---
id: "unit-test-gen"
title: "AI Unit Test Generator"
description: "Create high-quality Jest unit tests for any JavaScript or TypeScript code snippet."
category: "coding"
tags: ["testing", "jest", "quality"]
model_compatibility: ["GPT-4", "Claude-3.5"]
version: "1.2.0"
last_updated: "2024-03-14"
usage_count: 128
---

# Prompt Description
Generate high-quality Jest unit tests for the provided JavaScript/TypeScript code.

# The Prompt
```text
Act as a senior software engineer. Write comprehensive unit tests for the following code using Jest:
{{code_snippet}}

Ensure:
1. All edge cases are covered.
2. Mocks are used for external dependencies.
3. Test names are descriptive.
```

# Documentation
Provide the code snippet you want to test. The output will be a complete `.test.ts` file.
