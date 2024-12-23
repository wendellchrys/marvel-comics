# Marvel Comics

![Login](https://i.postimg.cc/Hx6WQHfp/image.png)
![Marvel Comics](https://i.postimg.cc/5yfvtx8b/image.png)

Este projeto é uma aplicação Next + TypeScript, que permite efetuar login com Google e Github, após o login é possível listar, filtrar e favoritar comics da Marvel. A aplicação inclui página para listagem de Comics com paginação, página para listagem de Comics com scroll infinito e modal para listagem dos favoritos!

## **Destaques**

- **Testes Unitários**: Cobertura completa de todos os componentes, páginas e utils.
- **Taiwind**: Foi utilizado o taiwind para a criação das classes e responsividade
- **Axios**: Requisições utilizando o axios, sendo chamadas pelo services/api. Cada chamada tem seu devido tratamento em caso de erro.

## **Páginas**

### Home
Página inicial que chama o componente de formulário de login

### ComicsPage
Página de listagem de Comics com Páginação.

### ComicsPageInfiniteScroll
Página de listagem de Comics com Scroll infinito.

## **Componentes**

### Loading
Componente de Loading que é utilizado enquanto as requisições estão sendo carregadas.

### ComicCard
Componente responsável por listar o card de um Comic.

### Modal
Componente responsável por exibir um modal, no qual é utilizado para exibir os favoritos (mas o componente está totalmente desacoplado, podendo ser usado em outros contextos).

### SearchInput
Componente responsável por exibir o campo de busca nas páginas de Comics.

### Sidebar
Componente responsável por exibir o sidebar lateral com o menu.

## **Utils**

### favoriteComics
Função responsável por salvar, acessar e remover os comics do localStorage.

### marvel
Função responsável por gerar URLs autenticadas para consumir a API da Marvel. Ele garante que cada requisição inclua os parâmetros de autenticação exigidos pela Marvel.

## **Services**

### api/marvel/actions
Serviço com cada rota de requisição separada.

## **Inicialização do Projeto**

Para inicializar o projeto, siga os passos abaixo:

1. **Clone o repositório:**
```bash
git clone https://github.com/wendellchrys/marvel-comics.git
```

2. **Navegue até o diretório do projeto:**
```bash
cd marvel-comics
```

3. **Instale as dependências:**
```bash
pnpm install
```

4. **Inicie o servidor de desenvolvimento:**
```bash
pnpm dev
```


Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.
