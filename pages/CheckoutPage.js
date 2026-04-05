const { BasePage } = require('./BasePage');
const { Logger } = require('../utils/Logger');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors
    this.firstNameInput = '[data-test="firstName"]';
    this.lastNameInput = '[data-test="lastName"]';
    this.postalCodeInput = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.finishButton = '[data-test="finish"]';
    this.completeHeader = '.complete-header';
  }

  async fillCheckoutInformation(firstName, lastName, zipCode) {
    Logger.info('Filling checkout details');
    await this.fillInput(this.firstNameInput, firstName);
    await this.fillInput(this.lastNameInput, lastName);
    await this.fillInput(this.postalCodeInput, zipCode);
    await this.clickElement(this.continueButton);
  }

  async finishCheckout() {
    Logger.info('Completing purchase');
    await this.clickElement(this.finishButton);
  }

  async getCompletionMessage() {
    return await this.getText(this.completeHeader);
  }
}

module.exports = { CheckoutPage };
