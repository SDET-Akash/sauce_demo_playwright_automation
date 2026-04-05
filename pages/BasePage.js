const { Logger } = require('../utils/Logger');

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page 
   */
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    Logger.info(`Navigating to ${url}`);
    await this.page.goto(url);
  }

  async clickElement(locator) {
    Logger.info(`Clicking on element: ${locator}`);
    const el = this.page.locator(locator);
    await el.waitFor({ state: 'visible' });
    await el.click();
  }

  async fillInput(locator, text) {
    Logger.info(`Filling input: ${locator} with value: [REDACTED]`);
    const el = this.page.locator(locator);
    await el.waitFor({ state: 'visible' });
    await el.fill(text);
  }

  async getText(locator) {
    const el = this.page.locator(locator);
    await el.waitFor({ state: 'visible' });
    const text = await el.innerText();
    Logger.info(`Retrieved text from ${locator}: ${text}`);
    return text;
  }

  async isVisible(locator) {
    const el = this.page.locator(locator);
    const visible = await el.isVisible();
    Logger.info(`Element ${locator} visibility: ${visible}`);
    return visible;
  }
}

module.exports = { BasePage };
