// 7.b  Selenium test for the multiplication table webpage
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

const URL = process.env.APP_URL || 'http://localhost:3000';

async function runTests() {
  const options = new chrome.Options();
  if (process.env.HEADLESS === 'true') options.addArguments('--headless=new');

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    console.log('Opening application...');
    await driver.get(URL);
    await driver.wait(until.elementLocated(By.id('number')), 10000);
    const title = await driver.findElement(By.id('title')).getText();
    assert.strictEqual(title, 'Multiplication Table');
    console.log('PASS: Page loaded');

    // Test 1: valid number
    await driver.findElement(By.id('number')).clear();
    await driver.findElement(By.id('number')).sendKeys('7');
    await driver.findElement(By.id('generate')).click();
    await driver.wait(async () => {
      const rows = await driver.findElements(By.css('#result-table tr'));
      return rows.length === 10;
    }, 10000);
    const rows = await driver.findElements(By.css('#result-table tr'));
    assert.strictEqual(await rows[0].getText(), '7 x 1 = 7');
    assert.strictEqual(await rows[9].getText(), '7 x 10 = 70');
    console.log('PASS: Table for 7 generated correctly (10 rows)');

    // Test 2: empty input shows an error
    await driver.findElement(By.id('number')).clear();
    await driver.findElement(By.id('generate')).click();
    await driver.wait(async () => (await driver.findElement(By.id('error')).getText()) !== '', 10000);
    console.log('PASS: Error shown for empty input');

    console.log('SELENIUM TESTS PASSED');
  } finally {
    await driver.quit();
  }
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
