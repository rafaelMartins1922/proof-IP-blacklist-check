# PROOF IP Blacklist Checker

O IP Blacklist Checker é uma aplicação simples para listagem de IPs da rede Tor. 
Desenvolvida para o processo seletivo da PROOF, uma empresa de consultoria e serviços relacionados à Segurança da Informação, a aplicação exibe uma lista de IPs e permite a marcação de qualquer um deles como indesejável, adicionando-os à uma lista negra e assim permitindo que se filtre e exiba somente os desejáveis ou indesejáveis.
Os IPs são capturados das seguintes fontes:
● https://www.dan.me.uk/tornodes
● https://onionoo.torproject.org/summary?limit=5000

# Tabela de Conteúdo
1. [Tecnologias utilizadas](#tecnologias-utilizadas)
1. [Configuração e Inicialização](#configuração-e-inicialização)
1. [Uso](#uso)
1. [Arquitetura](#arquitetura)
1. [Autores](#autores)

# Tecnologias utilizadas

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

O projeto foi desenvolvido com as seguintes tecnologias, frameworks, runtimes e linguagens:
- [Next.js](https://nextjs.org/docs/getting-started), *versão 12.0.1*
- [Node.js](https://nodejs.org/en/docs/), *versão 16.13.0*
- [Express.js](https://expressjs.com/pt-br/), *versão 4.17.1*
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Docker](https://www.docker.com/), *versão 20.10.8*

As principais bibliotecas usadas foram:
- ![axios](https://www.npmjs.com/package/axios)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [node-dev](https://www.npmjs.com/package/node-dev)
- [sequelize](https://sequelize.org/)
- [sqlite3](https://www.sqlite.org/index.html)
- [react](https://pt-br.reactjs.org/)
- [react-bootstrap](https://react-bootstrap.github.io/)
- [react-icons](https://react-icons.github.io/react-icons/)

# Configuração e Inicialização
Para rodar o projeto, basta cloná-lo:

```bash
git clone https://github.com/rafaelMartins1922/proof-IP-blacklist-checker.git
```

E em seguida subir os containeres da aplicação com o docker:

```bash
docker-compose up
```

Caso queira rodar o projeto sem containeres, basta ir até a pasta do backend, e rodar os seguintes comandos:

```
npm install
cp .env.example .env
npm run migrate
npm run dev
```

Depois, deve-se entrar na pasta do front end e rodar:

```
npm install
npm run dev
```


# Uso
Após subir os containeres, a aplicação pode ser acessada a partir do navegador em http://localhost:3000
A lista de IPs pode ser vista na parte de baixo da pagina. Ela pode ser manipulada para mostrar todos os IPs, apenas IPs não bloqueados ou apenas IPs bloqueados (marcados como indesejáveis).

Para marcar um IP como bloqueado/indesejável, clique no ícone de bloqueio ao lado do IP.

![](https://i.imgur.com/AmP4AkU.png)

![](https://i.imgur.com/lWLThSg.png)




# Arquitetura
A aplicação funciona como uma página simples construída com o Next.js com alguns componentes da biblioteca react-bootstrap e uma api no back end servida e roteada com o Express.js consumindo um banco de dados SQLite com o ORM Sequelize. 

## Estrutura do back end

A API do back end possui a seguinte estrutura de arquivos e pastas:

```bash
│   .dockerignore
│   .env.example
│   .gitignore
│   Dockerfile
│   package-lock.json
│   package.json
│
└───src
    │   app.js
    │
    ├───config
    │       dotenv.js
    │       sequelize.js
    │
    ├───controllers
    │       .gitkeep
    │       IpController.js
    │
    ├───database
    │       migrate.js
    │
    ├───models
    │       .gitkeep
    │       BlacklistedIp.js
    │       DansApiCalls.js
    │       DansIp.js
    │       User.js
    │
    └───routes
            routes.js
```

Como se pode ver, o back end contém, na sua pasta raiz, os arquivos package.json e package-lock.json que rastream configurações, scripts, dependências, versões de dependências, etc. Contém também os aquivos .dockerignore e .gitignore, que indicam quais pastas e arquivos devem ser ignorados por operações do Docker e do Git, o Dockerfile, que determina as etapas para a criação da imagem Docker do back end, e o .env.example, que armazena variáveis de ambiente. 

Na pasta [src](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/tree/main/backend/src) encontram-se o resto dos arquivos.O app é servido a partir do arquivo [app.js](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/blob/main/backend/src/app.js), onde é carregado o express, configurados os formatos de corpo de requisição que devem ser aceitos e a porta a ser utilizada, além da importação das rotas da API.

Na pasta [config](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/tree/main/backend/src/config) tem-se os arquivos de configuaração do sequelize e do dotenv, a biblioteca que o sequelize usa para importação de variáveis de ambiente. O sequelize age como ORM, e é a partir dele que são configuradas as Models das quais são geradas as tabelas  do Banco de Dados.

Na pasta [controllers](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/tree/main/backend/src/controllers) encontram-se a controller da aplicação, onde estão as funções que lidam com as requisições aos endpoints.

Na pasta [database](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/tree/main/backend/src/database) há o script usado para migração do banco de dados, [migrate.js](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/blob/main/backend/src/database/migrate.js). Ele é executado quando os containeres da aplicação são subidos, a partir do comando ```npm run migrate```, e se baseia no sequelize para criar tabelas correspondentes às Models em um Banco de Dados SQLite.

Na pasta [Models](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/tree/main/backend/src/models) estão as Models usadas na criação de tabelas do Banco de Dados. E em [routes](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/tree/main/backend/src/routes) encontra-se [route.js](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/blob/main/backend/src/routes/routes.js), onde estão declaradas as rotas da aplicação.

## Estrutura do front end
A front end possui a seguinte estrutura de arquivos e pastas:
```
│   .dockerignore
│   .eslintrc.json
│   .gitignore
│   Dockerfile
│   next.config.js
│   package-lock.json
│   package.json
│
├───components
│       IPListSectionComponent.js
│       IpsTableComponent.js
│       LoadingSpinnerComponent.js
│       NavBarComponent.js
│       SocialIconsComponent.js
│       TopSectionComponent.js
│
├───context
│       globalState.js
│
├───pages
│       index.js
│       _app.js
│
├───public
│       cat-smile.jpg
│       favicon.ico
│       proof-logo.png
│       top-section-bg.png
│       vercel.svg
│
├───services
│       apiHost.js
│       IpService.js
│
└───styles
        globals.css
        Home.module.css
```

Além do Dockerfile, .dockerignore, .gitignore, package.json e package-lock.json, também presentes no back end, o a aplicação Next também contém o arquivo next.config.js, normalmente usado para configurações customizadas do Next.js e o eslintrc.json, para configuração do [ESLint](https://eslint.org/), um [Linter](https://sourcelevel.io/blog/what-is-a-linter-and-why-your-team-should-use-it) para o Javascript. Esses arquivos, assim como as pastas _pages_, _public_ e _styles_, são gerados por padrão pelo comando ```create-next-app```, usado para criar o projeto Next.js.

Na pasta [components](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/tree/main/frontend/components), temos diferentes componentes que são usados para gerar elementos de interface quando a aplicação está rodando.

Na pasta [pages](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/tree/main/frontend/pages) se econtram os arquivos [_app.js](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/blob/main/frontend/pages/_app.js), que prové um componente global dentro do qual os demais componentes são renderizados, e [index.js](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/blob/main/frontend/pages/index.js), a página principal da aplicação, responsável por invocar os componentes em _frontend/components_ e exibí-los como a interface da página.

Na pasta [public](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/tree/main/frontend/public) estão algumas imagens e ícones usadas na aplicação.

Na pasta [services] estão os arquivos [apiHost.js](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/blob/main/frontend/services/apiHost.js), que exporta uma string com o host local a ser usado para chamadas ao back end e [IpService](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/blob/main/frontend/services/IpService.js), onde estão as funções que realizam essas chamadas, invocadas nas páginas e componentes.

Na pasta [styles](https://github.com/rafaelMartins1922/proof-IP-blacklist-checker/tree/main/frontend/styles) estão os arquivos css com as estilizações da aplicação.




# Autores
- Rafael Maritns


