const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/loginPage');
const { ProdutoPage } = require('../page-objects/produtoPage');

test.describe('Produto Tests', () => {
  test('Deve adicionar um produto com sucesso', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const produtoPage = new ProdutoPage(page);

    // Primeiro, faz login no sistema
    await loginPage.acessarPaginaLogin();
    await loginPage.fazerLogin('admin', 'admin');

    // Depois, adiciona um produto
    await produtoPage.adicionarProduto('Produto Teste', '100', 'Azul, Amarelo');

    // Verifica se uma mensagem de sucesso é exibida
    await expect(page.locator('text=Produto adicionado com sucesso')).toBeVisible();
  });
});
