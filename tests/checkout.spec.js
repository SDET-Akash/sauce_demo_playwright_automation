const { test, expect } = require('@playwright/test');
const { EnvLoader } = require('../utils/EnvLoader');
const testData = require('../data/testData.json');
const { Logger } = require('../utils/Logger');

// Import the Page Objects directly
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('E-commerce Checkout Flow', () => {

  test.beforeEach(async ({ page }) => {
    Logger.info('--- Starting Test Setup ---');
    // Instantiate just what we need for the setup
    const loginPage = new LoginPage(page);
    await loginPage.navigateToHome();
  });

  test('User should be able to successfully login and checkout an item @smoke', async ({ page }) => {
    // 1. Manually Instantiate all required Page Objects passing the current 'page'
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const username = EnvLoader.getTestUser();
    const password = EnvLoader.getTestPassword();
    const { firstName, lastName, postalCode } = testData.checkoutData;

    Logger.info('Executing Login');
    await loginPage.login(username, password);

    // Verify successful login by checking inventory page loaded
    await expect(page).toHaveURL(/.*inventory.html/);
    const isLoaded = await inventoryPage.verifyInventoryLoaded();
    expect(isLoaded).toBeTruthy();

    Logger.info('Executing Checkout Flow');

    // Add 3 random items
    const selectedItems = await inventoryPage.addRandomItemsToCart(3);
    await inventoryPage.goToCart();
    await cartPage.validateCartItems(3);
    // await page.waitForTimeout(5000);


    // Proceed to checkout from cart
    await cartPage.proceedToCheckout();

    // Fill check out info and finish
    await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
    await checkoutPage.finishCheckout();

    // Verify successful checkout
    const confirmation = await checkoutPage.getCompletionMessage();
    expect(confirmation).toBe('Thank you for your order!');
    Logger.info('--- Test Completed Successfully ---');
  });

  test('User should see validation error on invalid login @negative', async ({ page }) => {
    // Instantiate Page Object
    const loginPage = new LoginPage(page);

    Logger.info('Executing Invalid Login Flow');
    await loginPage.login('invalid_user', 'wrong_password');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

});
