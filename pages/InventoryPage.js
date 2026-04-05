const { BasePage } = require('./BasePage');
const { Logger } = require('../utils/Logger');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors
    this.addToCartButton = (itemName) => `[data-test="add-to-cart-${itemName}"]`;
    this.cartIcon = '.shopping_cart_link';
    this.inventoryContainer = '.inventory_container';
    this.inventoryItems = '.inventory_item';

  }

  async verifyInventoryLoaded() {
    Logger.info('Verifying inventory page is loaded');
    return await this.isVisible(this.inventoryContainer);
  }

  async addItemToCart(itemNameSnakeCase) {
    Logger.info(`Adding item to cart: ${itemNameSnakeCase}`);
    await this.clickElement(this.addToCartButton(itemNameSnakeCase));
  }

  // Get all item names dynamically
  async getAllItemNames() {
    const items = await this.page.locator(this.inventoryItems).all();
    const itemNames = [];

    for (const item of items) {
      const button = item.locator('button');
      const dataTest = await button.getAttribute('data-test');

      if (dataTest && dataTest.startsWith('add-to-cart')) {
        itemNames.push(dataTest.replace('add-to-cart-', ''));
      }
    }

    return itemNames;
  }

  //Add 3 random items
  async addRandomItemsToCart(count = 3) {
    Logger.info(`Adding ${count} random items to cart`);

    const allItems = await this.getAllItemNames();

    const shuffled = allItems.sort(() => 0.5 - Math.random());
    const selectedItems = shuffled.slice(0, count);

    for (const item of selectedItems) {
      Logger.info(`Adding item: ${item}`);
      await this.addItemToCart(item);
    }

    return selectedItems;

  }


  async goToCart() {
    Logger.info('Navigating to cart');
    await this.clickElement(this.cartIcon);
  }
}

module.exports = { InventoryPage };
