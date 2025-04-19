const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/loginPage');

test.describe('Login Tests', () => {
  test('Deve fazer login com sucesso', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.acessarPaginaLogin();
    await loginPage.fazerLogin('admin', 'admin');

    // Verifica se a URL após o login é a esperada
    await expect(page).toHaveURL('/lojinha-web/v2/produto'); 
    await expect(page.locator('text=Boas vindas, admin!')).toBeVisible();
  });

  test('Deve falhar ao tentar login com credenciais inválidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.acessarPaginaLogin();
    await loginPage.fazerLogin('usuarioInvalido', 'senhaInvalida');

    // Verifica se uma mensagem de erro é exibida
    await expect(page.locator('text=Falha ao fazer o login')).toBeVisible(); 
  });
});
