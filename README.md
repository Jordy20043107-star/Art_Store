# E-commerce Automation Test with Playwright

This project contains an automated test script for an e-commerce website using Playwright with TypeScript, following the Page Object Model (POM) pattern.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

- Run all tests:
  ```bash
  npm test
  ```

- Run tests in headed mode (visible browser):
  ```bash
  npm run test:headed
  ```

## Test Flow

The test covers:
1. User registration with random data
2. Session validation
3. Product selection and cart addition
4. Checkout process
5. Order confirmation

## Project Structure

- `pages/`: Page Object Model classes
- `tests/`: Test specifications
- `playwright.config.ts`: Playwright configuration
- `tsconfig.json`: TypeScript configuration