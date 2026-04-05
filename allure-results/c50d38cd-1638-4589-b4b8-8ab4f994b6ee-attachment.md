# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.js >> E-commerce Checkout Flow >> User should see validation error on invalid login @negative
- Location: tests\checkout.spec.js:60:3

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://www.saucedemo.com/
Call log:
  - navigating to "https://www.saucedemo.com/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - strong [ref=e9]: www.saucedemo.com
      - text: ’s server IP address could not be found.
    - generic [ref=e10]:
      - paragraph [ref=e11]: "Try:"
      - list [ref=e12]:
        - listitem [ref=e13]: Checking the connection
        - listitem [ref=e14]:
          - link "Checking the proxy, firewall, and DNS configuration" [ref=e15] [cursor=pointer]:
            - /url: "#buttons"
        - listitem [ref=e16]:
          - link "Running Windows Network Diagnostics" [ref=e17] [cursor=pointer]:
            - /url: javascript:diagnoseErrors()
    - generic [ref=e18]: ERR_NAME_NOT_RESOLVED
  - generic [ref=e19]:
    - button "Reload" [ref=e21] [cursor=pointer]
    - button "Details" [ref=e22] [cursor=pointer]
```

# Test source

```ts
  1  | const { Logger } = require('../utils/Logger');
  2  | 
  3  | class BasePage {
  4  |   /**
  5  |    * @param {import('@playwright/test').Page} page 
  6  |    */
  7  |   constructor(page) {
  8  |     this.page = page;
  9  |   }
  10 | 
  11 |   async navigate(url) {
  12 |     Logger.info(`Navigating to ${url}`);
> 13 |     await this.page.goto(url);
     |                     ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://www.saucedemo.com/
  14 |   }
  15 | 
  16 |   async clickElement(locator) {
  17 |     Logger.info(`Clicking on element: ${locator}`);
  18 |     const el = this.page.locator(locator);
  19 |     await el.waitFor({ state: 'visible' });
  20 |     await el.click();
  21 |   }
  22 | 
  23 |   async fillInput(locator, text) {
  24 |     Logger.info(`Filling input: ${locator} with value: [REDACTED]`);
  25 |     const el = this.page.locator(locator);
  26 |     await el.waitFor({ state: 'visible' });
  27 |     await el.fill(text);
  28 |   }
  29 | 
  30 |   async getText(locator) {
  31 |     const el = this.page.locator(locator);
  32 |     await el.waitFor({ state: 'visible' });
  33 |     const text = await el.innerText();
  34 |     Logger.info(`Retrieved text from ${locator}: ${text}`);
  35 |     return text;
  36 |   }
  37 | 
  38 |   async isVisible(locator) {
  39 |     const el = this.page.locator(locator);
  40 |     const visible = await el.isVisible();
  41 |     Logger.info(`Element ${locator} visibility: ${visible}`);
  42 |     return visible;
  43 |   }
  44 | }
  45 | 
  46 | module.exports = { BasePage };
  47 | 
```