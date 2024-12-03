import { WebDriver, Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

describe('Selenium - LoginPage Component', () => {
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
    await driver.get('http://localhost:5173'); 
  });

  it('verifica exibição dos elementos principais', async () => {

    const loginButton = await driver.findElement(By.id('Entrar'));
    expect(await loginButton.isDisplayed()).toBe(true);

    const registerButton = await driver.findElement(By.id('Cadastrar'));
    expect(await registerButton.isDisplayed()).toBe(true);

    const forgotPasswordLink = await driver.findElement(By.linkText('Esqueceu sua senha?'));
    expect(await forgotPasswordLink.isDisplayed()).toBe(true);
  });

  it('verifica mensagem de erro ao tentar login sem preencher os campos', async () => {
    const loginButton = await driver.findElement(By.id('Entrar'));
    await loginButton.click();

    const toastError = await driver.wait(
        until.elementLocated(By.css('[role="alert"]')),
        5000 
      );

    await driver.wait(until.elementIsVisible(toastError), 5000);
    const toastMessage = await toastError.getText();
    expect(toastMessage).toBe('Preencha todos os campos');
  });

  it('verifica mensagem de erro ao tentar login com credenciais inválidas', async () => {

    const cpfInput = await driver.findElement(By.name('cpf'));
    await cpfInput.sendKeys('476.947.660-42');

    const passwordInput = await driver.findElement(By.name('password'));
    await passwordInput.sendKeys('senhaErrada');

    const loginButton = await driver.findElement(By.id('Entrar'));
    await loginButton.click();

    const toastError = await driver.wait(
        until.elementLocated(By.css('[role="alert"]')),
        5000 
      );

    await driver.wait(until.elementIsVisible(toastError), 5000);
    const toastMessage = await toastError.getText();
    expect(toastMessage).toBe('CPF ou senha inválidos');
  });

  it('realiza login com credenciais válidas', async () => {
    const cpfInput = await driver.findElement(By.name('cpf'));
    await cpfInput.sendKeys('476.947.660-42');

    const passwordInput = await driver.findElement(By.name('password'));
    await passwordInput.sendKeys('Abcdefgh8');

    const loginButton = await driver.findElement(By.id('Entrar'));
    await loginButton.click();

    await driver.wait(until.urlIs('http://localhost:5173/home'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('http://localhost:5173/home');
  });

  it('verifica redirecionamento ao clicar em "CADASTRE-SE"', async () => {
    const registerButton = await driver.findElement(By.id('Cadastrar'));
    await registerButton.click();

    await driver.wait(until.urlIs('http://localhost:5173/cadastro-profissional'), 5000); // Ajuste a URL conforme necessário
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('http://localhost:5173/cadastro-profissional');
  });
});