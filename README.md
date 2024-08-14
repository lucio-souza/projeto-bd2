### Documentação da Aplicação de Gestão de Pedidos

#### Sumário
1. [Introdução](#introducao)
2. [Arquitetura da Aplicação](#arquitetura)
3. [Configuração do Ambiente](#configuracao)
4. [Estrutura de Diretórios](#estrutura)
5. [Endpoints da API](#endpoints)
6. [Modelos de Dados](#modelos)
7. [Repositórios](#repositorios)
8. [Controladores](#controladores)
9. [Rotas](#rotas)
10. [Interface do Usuário](#interface)
11. [Mapeamento com Leaflet](#leaflet)
12. [Conclusão](#conclusao)

---

<a id="introducao"></a>
### 1. Introdução

Esta documentação descreve uma aplicação de gestão de pedidos que inclui APIs para gerenciar pedidos, um banco de dados relacional utilizando Sequelize como ORM, e uma interface de usuário para visualizar e manipular dados de pedidos, incluindo integração com mapas para capturar e exibir a localização geográfica dos pedidos.

---

<a id="arquitetura"></a>
### 2. Arquitetura da Aplicação

A aplicação é construída usando a seguinte arquitetura:

- **Backend**: Node.js com Express.js para a criação de APIs RESTful.
- **Banco de Dados**: PostgreSQL utilizando Sequelize para a modelagem e interação com o banco de dados.
- **Frontend**: JavaScript e HTML para a interface do usuário, com integração de mapas usando a biblioteca Leaflet.
- **Controle de Versão**: Git para gerenciamento de código.

---

<a id="configuracao"></a>
### 3. Configuração do Ambiente

Para configurar e executar a aplicação localmente, siga os passos abaixo:

1. **Clone o Repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-repositorio>
   ```

2. **Instale as Dependências:**
   ```bash
   npm install
   ```

3. **Configuração do Banco de Dados:**
   - Crie um banco de dados PostgreSQL.
   - Modifique as credenciais de conexão no arquivo `Connection.js`.

4. **Inicie o Servidor:**
   ```bash
   npm start
   ```
   O servidor estará disponível em `http://localhost:3000`.

---

<a id="estrutura"></a>
### 4. Estrutura de Diretórios

A estrutura de diretórios da aplicação é a seguinte:

```
/src
├── /controllers
│   └── PedidoController.js
├── /database
│   └── Connection.js
├── /model
│   └── Pedido.js
├── /repositories
│   └── PedidoRepository.js
├── /routers
│   └── routes.js
├──  /view
|    ├── /imagens
|    ├── /css
|    ├── /js
|    ├── index.html
|    └── editar.html
|
└── server.js
```

---

<a id="endpoints"></a>
### 5. Endpoints da API

#### **GET `/pedidos`**
- **Descrição**: Retorna a lista de todos os pedidos.
- **Resposta**: JSON com os dados dos pedidos.

#### **GET `/pedidos/:cpf`**
- **Descrição**: Retorna um pedido específico baseado no CPF do cliente.
- **Parâmetros**: `cpf` - CPF do cliente.
- **Resposta**: JSON com os dados do pedido correspondente.

#### **POST `/pedidos`**
- **Descrição**: Cria um novo pedido.
- **Corpo da Requisição**: JSON com os dados do pedido.
- **Resposta**: JSON com os dados do pedido criado.

  - **Body:**
  ```json
  {
    "restaurante": "Nome do Restaurante",
    "cliente": "Nome do Cliente",
    "cpf": "000.000.000-00",
    "descricaoPedido": "Descrição do pedido",
    "localizacao": {
      "type": "Point",
      "coordinates": [longitude, latitude]
    }
  }
  ```


#### **PUT `/pedidos/:id`**
- **Descrição**: Atualiza os dados de um pedido existente.
- **Parâmetros**: `id` - ID do pedido.
- **Corpo da Requisição**: JSON com os dados atualizados.
- **Resposta**: JSON com os dados do pedido atualizado.

  - **Body:**
  ```json
  {
    "restaurante": "Nome do Restaurante",
    "cliente": "Nome do Cliente",
    "descricaoPedido": "Descrição do pedido",
    "localizacao": {
      "type": "Point",
      "coordinates": [longitude, latitude]
    }
  }
  ```


#### **DELETE `/pedidos/:id`**
- **Descrição**: Deleta um pedido específico.
- **Parâmetros**: `id` - ID do pedido.
- **Resposta**: Mensagem de sucesso ou erro.

---

<a id="modelos"></a>
### 6. Modelos de Dados

#### **Pedido Model**
Representa a tabela de pedidos no banco de dados.

- **Atributos:**
  - `id` (UUID): Identificador único do pedido.
  - `restaurante` (STRING): Nome do restaurante.
  - `cliente` (STRING): Nome do cliente.
  - `cpf` (STRING): CPF do cliente (único).
  - `descricaoPedido` (STRING): Descrição do pedido.
  - `localizacao` (GEOMETRY): Localização geográfica do pedido.

---

<a id="repositorios"></a>
### 7. Repositórios

#### **PedidoRepository**
Classe responsável por interagir com o banco de dados para operações relacionadas ao modelo `Pedido`.

- **Métodos:**
  - `getAllPedidos()`: Retorna todos os pedidos.
  - `getPedidoByCpfClient(cpf)`: Retorna um pedido específico com base no CPF do cliente.
  - `createPedido(newPedidoData)`: Cria um novo pedido.
  - `updatePedido(updatedData, id)`: Atualiza um pedido existente com base no ID.
  - `deletePedido(id)`: Deleta um pedido com base no ID.

---

<a id="controladores"></a>
### 8. Controladores

#### **PedidoController**
Controlador que gerencia as requisições HTTP relacionadas aos pedidos.

- **Métodos:**
  - `list(req, res)`: Manipula requisições GET para listar todos os pedidos.
  - `find(req, res)`: Manipula requisições GET para encontrar um pedido pelo CPF do cliente.
  - `add(req, res)`: Manipula requisições POST para criar um novo pedido.
  - `update(req, res)`: Manipula requisições PUT para atualizar um pedido existente.
  - `delete(req, res)`: Manipula requisições DELETE para remover um pedido.

---

<a id="rotas"></a>
### 9. Rotas

As rotas definem os endpoints expostos pela API e são configuradas no arquivo `routes.js`.

- **GET `/pedidos`** - Listagem de pedidos.
- **POST `/pedidos`** - Criação de pedido.
- **GET `/pedidos/:cpf`** - Busca de pedido por CPF.
- **PUT `/pedidos/:id`** - Atualização de pedido por ID.
- **DELETE `/pedidos/:id`** - Exclusão de pedido por ID.

---

<a id="interface"></a>
### 10. Interface do Usuário

A interface do usuário é construída em HTML e JavaScript e inclui:

- **index.html**: Página principal onde os pedidos são listados e gerenciados.
- **editar.html**: Página para editar pedidos existentes.

---

<a id="leaflet"></a>
### 11. Mapeamento com Leaflet

A aplicação utiliza a biblioteca **Leaflet** para integração com mapas. A localização dos pedidos é capturada e exibida em um mapa interativo.

- **Configuração do Mapa**: No arquivo `map.js`, o mapa é inicializado com uma visualização centrada e um marcador que pode ser arrastado para definir a localização.
- **Integração com a API**: A localização capturada no mapa é enviada para o backend através das requisições POST/PUT, onde a localização é armazenada como um campo do tipo `GEOMETRY`.

---

<a id="conclusao"></a>
### 12. Conclusão

Esta aplicação de gestão de pedidos oferece funcionalidades robustas para o gerenciamento de dados de pedidos, incluindo integração com mapas para captura de localização. A documentação apresentada fornece uma visão geral completa para desenvolvedores que desejam compreender, modificar ou expandir a aplicação.

Para contribuições ou dúvidas, por favor, entre em contato através do repositório oficial da aplicação.
