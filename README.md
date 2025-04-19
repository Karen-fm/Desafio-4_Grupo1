# Desafio4_Grupo1

# Desenvolvido como parte de um desafio da mentoria do Júlio de Lima.
Nosso objetivo é introduzir o uso da ferramenta Playwright, destacando seus recursos básicos e orientando novos usuários a realizarem testes end-to-end de maneira simples e eficiente.

# Tutorial de Uso da Ferramenta Playwright
# Sobre a Ferramenta
O Playwright é uma ferramenta de automação de testes criada pela Microsoft, que permite testar aplicações web em navegadores como Chromium, Firefox e WebKit. Suporta linguagens como JavaScript, TypeScript, Python, Java e C#, oferecendo recursos como execução paralela, captura de screenshots, gravação de vídeos e testes em navegadores headless.

# Vantagens da Utilização
Compatibilidade Multi-Navegador: O Playwright suporta Chromium, Firefox e WebKit, permitindo testes abrangentes em diferentes navegadores. 
Velocidade e Estabilidade: Sua arquitetura eficiente e robusta oferece alta velocidade de execução e estabilidade nos testes.
API Moderna: O Playwright utiliza uma API assíncrona baseada em Promises, tornando os testes mais legíveis e concisos.
Suporte a Dispositivos Móveis: Possui recursos integrados para emulação de dispositivos móveis, ampliando a cobertura de testes.
Eficiência e Rapidez: A automação permite a execução de testes repetitivos e complexos em minutos, economizando tempo valioso. Identificação Precoce de Problemas: Defeitos são detectados rapidamente, possibilitando correções antes que atinjam o ambiente de produção.
Maior Cobertura de Testes: Teste uma variedade de cenários para garantir que seu software funcione conforme o esperado em diferentes situações. Registros Detalhados: Relatórios precisos e detalhados ajudam a entender o status dos testes e os problemas encontrados.
Automatizar testes com o Playwright traz vantagens significativas para equipes de desenvolvimento e QA.

# Tutorial de Uso

# Pré Requisitos:

Instalando o Node.js e VSCode.

# Passo 1: Instalação do Playwright
1.	Criar uma pasta do projeto em sua máquina. O projeto ficará dentro deste arquivo;
2.	Abrir a pasta com o VSCode ou outra IDE;
3.	Abra o terminal ou bash;
4.	Rodar o comando: 
yarn create playwright
5.	Escolha a opção Javascript;
6.	Aperte enter para todas as demais opções;
7.	Verificar se o playwright foi instalado com sucesso:
npx playwright --version
Obs: O Playwright terá sido instalado com sucesso caso apareça a versão de instalação no terminal.
8.	Siga as instruções para criar o projeto com a estrutura básica

# Passo 2: Configuração Inicial
1.	Navegue até o diretório do projeto criado.
2.	Abrir arquivo playwright.config.js
3.	Comente o código destacado para realizar os testes apenas no Chrome;
 
4.	Agora, você pode rodar seus testes com o comando:
yarn playwright test --ui 
ou 
yarn playwright test --headed 
Se você quiser rodar testes específicos, pode especificar o arquivo de teste:
yarn test tests/example.spec.ts
5.	Esse comando abrirá o relatório diretamente no navegador, permitindo que você visualize os resultados de todos os testes.
npx playwright show-report.
6.	Na variável use: configure o atributo baseURL para o valor:
baseURL: 'http://165.227.93.41/'

# Exemplos de Utilização
Utilizamos a Lojinha (http://165.227.93.41/lojinha-web/v2/) para mostrar exemplos práticos com Playwright.  

# 1.	Login bem sucedido
Dentro da pasta tests crie um arquivo chamado login-sucedido.spec.js e cole o comando: 

const { test, expect } = require('@playwright/test');
const config = require("../local.env.json");

test(‘Login sucesso', async ({ page }) => {
    // Navegar para a página de login.
    await page.goto('/lojinha-web/v2/');

    // Valida se o título realmente apareceu na tela e se esse título tem a palavra lojinha.
    await expect(page).toHaveTitle(/Lojinha/);

    //clica no campo ou elemento tipo usuario.
    await page.getByText('Usuário').click();

    // Localiza o campo "Usuário", e preenche com o texto "admin".
    await page.getByLabel('Usuário').fill(config.username);

    //clica no campo ou elemento tipo senha.
    await page.getByText('Senha').click();

    //Localiza o campo "Senha" e preenche campo com o texto "admin", que é o valor da senha.
    await page.getByLabel('Senha').fill(config.senha);

    //Localiza o botão com o nome "Entrar", clica nele para realizar o login com os dados inseridos anteriormente.
    await page.getByRole('button', { name: 'Entrar' }).click();

    // valida que o login foi realizado com o nome do usuário na tela
    await expect(page.locator('text=Boas vindas, admin!')).toBeVisible();

});


# 2.	Login com falha
Dentro da pasta tests crie um arquivo chamado login-falha.spec.js e cole o comando: 
// Importa as funções necessárias do Playwright
const { test, expect } = require('@playwright/test');

// Define o teste para falha de login com credenciais inválidas
test('Falha de login com credenciais inválidas', async ({ page }) => {
  // Navega para a página de login
  await page.goto('/lojinha-web/v2/');

  // Valida que o título da página contém a palavra "Lojinha"
  await expect(page).toHaveTitle(/Lojinha/);

  // Clica no campo ou elemento "Usuário"
  await page.getByText('Usuário').click();

  // Preenche o campo "Usuário" com um valor inválido
  await page.getByLabel('Usuário').fill('usuarioInvalido');

  // Clica no campo ou elemento "Senha"
  await page.getByText('Senha').click();

  // Preenche o campo "Senha" com um valor inválido
  await page.getByLabel('Senha').fill('senhaInvalida');

  // Localiza e clica no botão "Entrar"
  await page.click("#btn-entrar");
  // Esperando por 1 segundo
  await page.waitForTimeout(1000);

  // Valida que o texto da mensagem de erro contém "Falha ao fazer o login"
  await expect(page.locator('text=Falha ao fazer o login')).toBeVisible(); 
});

Explicação das Funções e Comandos
●	test()
○	Função do Playwright para criar um teste. Aceita dois argumentos:
ᐨ	O nome do teste ('Falha de login com credenciais inválidas').
ᐨ	Uma função assíncrona que contém o código do teste.
●	page.goto()
○	Navega até a URL especificada (http://165.227.93.41/lojinha-web/v2/login).
●	page.fill()
○	Preenche um campo na página:
ᐨ	#usuario é o seletor do campo de usuário.
ᐨ	'usuarioInvalido' é o valor que será inserido no campo.
●	page.click()
○	Simula um clique no botão de login identificado pelo seletor button[type="submit"].
●	page.locator()
○	Localiza um elemento na página com base no seletor fornecido. No caso, o seletor é .mensagem-erro, que corresponde à mensagem de erro exibida após a falha de login.
●	textContent()
○	Obtém o texto interno de um elemento HTML. Nesse caso, o texto da mensagem de erro.
●	expect()
○	Função usada para validar resultados no teste. Aqui, verifica se o texto da mensagem de erro contém a frase 'Usuário e/ou senha inválidos'.


# 3.	Cadastro de um produto
Dentro da pasta tests crie um arquivo chamado produto.spec.js e cole o comando: 
const { test, expect } = require('@playwright/test');
const config = require("../local.env.json");
test('Cadastro de produto', async ({ page }) => {

    // Navegar para a página de login.
    await page.goto('/lojinha-web/v2/');

    // Valida se o título realmente apareceu na tela e se esse título tem a palavra lojinha.
    await expect(page).toHaveTitle(/Lojinha/);

    //clica no campo ou elemento tipo usuario.
    await page.getByText('Usuário').click();

    // Localiza o campo "Usuário", e preenche com o texto "admin".
    await page.getByLabel('Usuário').fill(config.username);

    //clica no campo ou elemento tipo senha.
    await page.getByText('Senha').click();

    //Localiza o campo "Senha" e preenche campo com o texto "admin", que é o valor da senha.
    await page.getByLabel('Senha').fill(config.senha);

    //Localiza o botão com o nome "Entrar", clica nele para realizar o login com os dados inseridos anteriormente.
    await page.getByRole('button', { name: 'Entrar' }).click();

    // valida que o login foi realizado com o nome do usuário na tela
    await expect(page.locator('text=Boas vindas, admin!')).toBeVisible();

    // Navega para página de cadastro de um novo "produto" da lojinha.
    await page.goto('http://165.227.93.41/lojinha-web/v2/produto');

    // Localiza o link de texto "Adicionar produto" na página e clica nele, redirecionando o usuário para 
    await page.locator('a', { hasText: 'Adicionar produto' }).click();
    await page.getByLabel('Nome do Produto').click();
    await page.getByLabel('Nome do Produto').fill('teste');
    await page.getByLabel('Valor do Produto').click();
    await page.getByLabel('Valor do Produto').fill('1,000');
    await page.getByLabel('Cores do Produto (Separadas').click();
    await page.getByLabel('Cores do Produto (Separadas').fill('azul');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.locator('text=Produto adicionado com sucesso')).toBeVisible();
    await page.getByRole('link', { name: 'Adicionar componente' }).click();
    await page.getByLabel('Nome do Componente de Produto').click();
    await page.getByLabel('Nome do Componente de Produto').fill('testes2');
    await page.getByLabel('Quantidade do Componente de').click();
    await page.getByLabel('Quantidade do Componente de').fill('1');
    await page.getByRole('link', { name: 'Salvar Componente' }).click();
    await expect(page.locator('text=Componente de produto adicionado com sucesso')).toBeVisible();

});


# 4.	Leitura produto cadastrado
Dentro da pasta tests crie um arquivo chamado produto-leitura.spec.js e cole o comando: 
const { test, expect } = require('@playwright/test');
const config = require("../local.env.json")

test('Validar produto cadastrado', async ({ page }) => {
  
  await page.goto('/lojinha-web/v2/')

  // login com os dados do usuário
  await page.fill("[id='usuario']", config.username)
  await page.fill("[id='senha']", config.senha)
  await page.click("[id='btn-entrar']")

  //Validar que o usuário foi direcionado a pagina correta
  await expect(page).toHaveURL('http://165.227.93.41/lojinha-web/v2/produto');
  await page.locator('a', { hasText: 'Adicionar produto' }).click();

  const nomeProduto = "Echelon502"

  await page.fill("[id='produtonome']", nomeProduto)
  await page.fill("[id='produtovalor']", "5000" )
  await page.fill("[id='produtocores']", "Vermelho")
  await page.click("[id='btn-salvar']")

await page.locator('a.waves-effect.waves-light.btn.grey', { hasText: 'Lista de Produtos' }).click();
 await expect(page).toHaveURL('http://165.227.93.41/lojinha-web/v2/produto');

  // Localize todos os produtos com o mesmo nome
  const produtos = page.locator(`ul li:has-text("${nomeProduto}")`);

  // Verifique se ao menos um produto foi encontrado
  const count = await produtos.count();
  if (count === 0) {
    throw new Error(`Nenhum produto com o nome "${nomeProduto}" foi encontrado.`);
  }

  // Iterar pelos produtos encontrados e realizar uma verificação em cada um
  // for (let i = 0; i < count; i++) {
  //   const produto = produtos.nth(i);
  //   await expect(produto).toBeVisible();
  //   console.log(`Produto ${i + 1} com o nome "${nomeProduto}" está visível.`);
  // }
});


# Melhores práticas - Segurança
Crie na pasta base o arquivo local.env.json
Cole o comando:
{
    "username": "nome_usuario",
    "senha": "senha_usuario"
}
Acesse o arquivo .gitignore e cole o comando local.env.json.

Atualize o valor das variáveis de acordo com as credenciais cadastradas no sistema.
Rode no terminal o comando npx playwright test para executar todos os casos de teste criados

# Links de Referência

Node.js - https://nodejs.org/en/
VSCode - https://code.visualstudio.com/download
Documentação Playwright - https://playwright.dev/docs/intro
Guia para Iniciantes em Testes com Playwright - https://playwright.dev/docs/test-intro
Repositório Playwright - Exemplos de Código no GitHub

