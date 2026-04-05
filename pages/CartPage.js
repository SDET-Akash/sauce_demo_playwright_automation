const { BasePage } = require('./BasePage');
const { Logger } = require('../utils/Logger');

class CartPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.checkoutButton = '[data-test="checkout"]';
    this.continueShoppingButton = '[data-test="continue-shopping"]';
    this.cartItems = '.cart_item';
  }

  async proceedToCheckout() {
    Logger.info('Proceeding to checkout from the cart page');
    await this.clickElement(this.checkoutButton);
  }

  async continueShopping() {
    Logger.info('Clicking continue shopping from cart');
    await this.clickElement(this.continueShoppingButton);
  }

  //get cart count
  async getCartItemCount() {
    const count = await this.page.locator(this.cartItems).count();
    Logger.info(`Cart contains ${count} items`);
    return count;
  }

  // validate cart
  async validateCartItems(expectedCount) {
    const actualCount = await this.getCartItemCount();

    if (actualCount !== expectedCount) {
      throw new Error(`Expected ${expectedCount} items but found ${actualCount}`);
    }

    Logger.info('Cart validation successful');
  }
}

module.exports = { CartPage };