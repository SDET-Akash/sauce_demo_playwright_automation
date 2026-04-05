const { BasePage } = require('./BasePage');
const { EnvLoader } = require('../utils/EnvLoader');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors
    this.usernameInput = '[data-test="username"]';
    this.passwordInput = '[data-test="password"]';
    this.loginButton = '[data-test="login-button"]';
    this.errorMessage = '[data-test="error"]';
  }

  async navigateToHome() {
    await this.navigate('/');
  }

  async login(username, password) {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }
}

module.exports = { LoginPage };
