<h1 align="center">Playwright API Testing Framework</h1>

<p align="center">
  A production-ready API test automation framework built with Playwright and TypeScript.
</p>

<p align="center">
  <a href="https://bondaracademy.com/programs/playwright-api-testing-mastery?utm_source=github&utm_medium=readme">
    <img src="https://img.shields.io/badge/Program-Playwright_API_Testing_Mastery-2D8CFF?style=for-the-badge" alt="Playwright API Testing Mastery">
  </a>
  <img src="https://img.shields.io/badge/Playwright-1.62-45BA4B?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
</p>

---

## About

This repository is the **final result of the [Playwright API Testing Mastery](https://bondaracademy.com/programs/playwright-api-testing-mastery?utm_source=github&utm_medium=readme) program at Bondar Academy**.

Every part of this framework is built from scratch during the program — step by step, with a detailed explanation of how each piece works and why it is designed this way. Use it as a reference implementation or as a starting template for your own API test suite.

👉 **[Join the program →](https://bondaracademy.com/programs/playwright-api-testing-mastery?utm_source=github&utm_medium=readme)**

## What's Inside

| Feature | Description |
| --- | --- |
| **Fluent request handler** | Chainable API client — `api.path().params().body().postRequest(201)` |
| **Custom expect matchers** | `shouldEqual`, `shouldMatchSchema` with rich failure output |
| **JSON schema validation** | AJV-powered response validation with auto-generated schemas |
| **API logger** | Full request/response context attached to failed tests |
| **Auth token fixture** | Worker-scoped token created once and reused across tests |
| **Multi-environment config** | Switch environments with `TEST_ENV=qa` |

```
├── helpers/            # Auth token creation
├── response-schemas/   # JSON schemas per endpoint
├── tests/              # Test specs
├── utils/              # Request handler, fixtures, logger, custom expect
└── api-test.config.ts  # Environment configuration
```

## Getting Started

```bash
npm install
npx playwright test           # run the suite
npx playwright show-report    # open the HTML report
```

Run against a different environment:

```bash
TEST_ENV=qa npx playwright test
```

---

<p align="center"><sub>Licensed under Apache 2.0 · <a href="https://bondaracademy.com?utm_source=github&utm_medium=readme">Bondar Academy</a></sub></p>
