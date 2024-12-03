import { WebDriver, Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

describe('Selenium - FinanceTable Component', () => {
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

  it('verifica exibição das transações', async () => {
    const tabelaTransacoes = await driver.wait(
      until.elementLocated(By.css('table')),
      5000
    );

    const linhas = await tabelaTransacoes.findElements(By.css('tbody tr'));

    expect(linhas.length).toBeGreaterThan(0);

    const primeiraCelula = await linhas[0].findElements(By.css('td'));
    const textoPrimeiraCelula = await primeiraCelula[0].getText();
    
    expect(textoPrimeiraCelula).toBeTruthy();
  });

  it('verifica mensagem de nenhuma transação', async () => {
    const mensagemSemTransacoes = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Nenhuma transação encontrada')]")),
      5000
    );

    expect(await mensagemSemTransacoes.isDisplayed()).toBe(true);
  });

});