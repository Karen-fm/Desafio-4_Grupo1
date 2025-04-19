class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator('#usuario'); // Localiza o campo de usuário
      this.passwordInput = page.locator('#senha'); // Localiza o campo de senha
      this.loginButton = page.locator('button[type="submit"]'); // Localiza o botão de login
    }
  
    async acessarPaginaLogin() {
      await this.page.goto('/lojinha-web/v2/'); // Acessa a URL de login
    }
  
    async fazerLogin(username, password) {
      await this.usernameInput.fill(username); // Preenche o campo de usuário
      await this.passwordInput.fill(password); // Preenche o campo de senha
      await this.loginButton.click(); // Clica no botão de login
    }
  }
  
  module.exports = { LoginPage };
  