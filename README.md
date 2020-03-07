# AceleraDev 2 - React - Kroton

## Squad 1

- Alessandra Alves Montanher
- Alecsandro Rocha Squarcini
- Bruno Delacqua
- Cleiton José Osti
- Henrique Degrecci Guilmo

## PROJETO FINAL - Central de Erros

### Objetivo

Em projetos modernos é cada vez mais comum o uso de arquiteturas baseadas em serviços ou microsserviços. Nestes ambientes complexos, erros podem surgir em diferentes camadas da aplicação (backend, frontend, mobile, desktop) e mesmo em serviços distintos. Desta forma, é muito importante que os desenvolvedores possam centralizar todos os registros de erros em um local, de onde podem monitorar e tomar decisões mais acertadas. Neste projeto vamos implementar um sistema para centralizar registros de erros de aplicações. O projeto deve ser implementado utilizando a tecnologia base da aceleração (React).

## Instalando

### Pré-requisitos

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install#windows-stable)

Na pasta do projeto execute:

```sh
yarn
```

### Modo de desenvolvimento

Com as depêndencias instaladas execute:

```sh
yarn start
```

## Deploy

Para fazer o deploy, será necessária a ferramenta `now`, para baixar execute:

```sh
yarn global add now
```

Antes de fazer deploy, certifique de estar logado com o time `squad-1-ad-react-kroton-2`, executando o comando:

```sh
now switch
```

Quando no time, execute na raiz do projeto para efetuar o deploy:

```sh
now
```

## Ferramentas utilizadas

### Firebase

Disponibiliza algumas aplicações que ajudam no desenvolvimento, sendo elas:

- Firebase auth: responsável pelos métodos de cadastro, login, recuperação de senha e tratamentos de sessão do usuário
- Firestore: responsável por armazenar os dados de alertas, permite armazenar e obter esses dados de forma "assistida".
- Cloud functions: funções que podem ser chamadas fora de aplicação com objetivos unicos, exemplo: armazenamento de usuários na firestore e inserção de dados de alertas no usuário.

### create react app

Ferramenta que inicia uma aplicação react sem necessidade de fazer configurações, caso exista a necessidade de personalizar as configurações, permite ejetar seus scripts.

### Material-UI

Biblioteca com componentes visuais prontos, conseguimos montar com agilidade uma interface visualmente gratificante e com padrões de layout definidos pela própria biblioteca.

### Prettier

Formatador que ajuda a manter o padrão por todo nosso código, independente do editor ou sistema operacional.

### Now

Para fazer os builds de deploy e o host da nossa aplicação utilizamos o now, com ele conseguimos fazer o deploy sem a necessidade de fazer configurações.
