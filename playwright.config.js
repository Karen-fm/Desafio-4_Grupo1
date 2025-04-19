// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: 'http://165.227.93.41', // URL base do sistema a ser testado
    headless: false, // Executa os testes em modo headless (sem abrir navegador)
    viewport: { width: 1280, height: 720 }, // Define o tamanho da janela do navegador
    ignoreHTTPSErrors: true, // Ignora erros relacionados ao certificado HTTPS
  },
  timeout: 30000, // Tempo limite para cada teste (em milissegundos)
  retries: 0, // Tenta executar o teste novamente caso falhe
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]], // Configuração de relatórios
});
