const { Logger } = require('./Logger');

class EnvLoader {
  static getBaseUrl() {
    if (!process.env.BASE_URL) {
      Logger.error('BASE_URL environment variable is not defined.');
      throw new Error('BASE_URL not defined');
    }
    return process.env.BASE_URL;
  }

  static getTestUser() {
    return process.env.TEST_USER;
  }

  static getTestPassword() {
    return process.env.TEST_PASSWORD;
  }
}

module.exports = { EnvLoader };
