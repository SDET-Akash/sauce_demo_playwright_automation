## What’s Covered

Login functionality (valid and invalid scenarios)
Add product to cart
Complete checkout flow
Order confirmation validation


## Getting Started
 1. Install dependencies

npm install


2. Install Playwright browsers

npx playwright install


3. Setup environment

Make sure `.env.qa` file is present with:

BASE_URL=https://www.saucedemo.com
TEST_USER=standard_user
TEST_PASSWORD=secret_sauce

## Running Tests

Run all tests:

npx playwright test

## Run a specific test:

npx playwright test tests/checkout.spec.js


Run in headed mode:

npx playwright test --headed

## Reports

To open HTML report:

npx playwright show-report

## Framework Approach

I followed the Page Object Model (POM) to keep the code clean and maintainable.

Test files contain only the flow and assertions
Page classes handle UI interactions
BasePage contains common reusable methods like click, fill, etc.
Utilities are used for logging and environment handling

