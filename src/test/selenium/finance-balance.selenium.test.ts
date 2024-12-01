// ./src/test/selenium/finance-balance.selenium.test.ts
import { WebDriver, Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

describe('Selenium - FinanceBalance Component', () => {
  let driver: WebDriver;

  beforeAll(async () => {
    const options = new chrome.Options();
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  beforeEach(async () => {
    await driver.get('http://localhost:5173/financeiro');
  });

  it('verifica cálculo e exibição do balanço financeiro', async () => {
    const entradasElement = await driver.wait(
      until.elementLocated(By.css('[data-testid="entradas"]')),
      5000
    );
    const saidasElement = await driver.findElement(By.css('[data-testid="saidas"]'));
    const balancoElement = await driver.findElement(By.css('[data-testid="balanço"]'));

    const entradasTexto = await entradasElement.getText();
    const saidasTexto = await saidasElement.getText();
    const balancoTexto = await balancoElement.getText();

    expect(entradasTexto).toContain('R$');
    expect(saidasTexto).toContain('R$');
    expect(balancoTexto).toContain('R$');
  });


});