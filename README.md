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

## Gerando dados falsos de alerta

Para inserir dados falsos em um usuário, faça uma requisição para a seguinte URL (pode ser feito direto pelo browser):

```
https://us-central1-squad-1-ad-react-kroton-2.cloudfunctions.net/createUserData/{userId}
```

O userId pode ser adquirido em https://console.firebase.google.com/ na aba Database, conforme a imagem:

![image](https://user-images.githubusercontent.com/11249408/75613746-10579100-5b10-11ea-8bcc-350f5e5b2696.png)
