<h1 align="center">Hamburgueria Pereira</h1>

### Descrição
Este projeto representa uma hamburgueria simples, onde cada cliente ao criar uma conta pode realizar pedidos.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### Rodando o Servidor

```bash
# Clone este repositório
$ git clone <https://github.com/joaosantosmedeiros/hamburgueria-Byte>

# Acesse a pasta do projeto no terminal/cmd
$ cd hamburgueria-Byte

# Instale as dependências
$ npm i

# Crie um arquivo .env no diretório raíz do projeto. Dentro dele coloque as seguintes variáveis:
DATABASE_URL="postgresql://{usuario}:{senha}@localhost:{port}/hamburgueria?schema=public"
PORT = 3000

#Você deve colocar o seu usario, senha e a porta que roda do Postgres onde está entre {}. Exemplo:
DATABASE_URL="postgresql://postgres:123@localhost:5432/hamburgueria?schema=public"

# Execute o comando para puxar o banco de dados
npx prisma migrate dev

# Execute a aplicação
$ npm run dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>

# Para cadastrar um admin, entre no banco de dados e execute a query
INSERT INTO public.user (id, email, password, is_admin, updated_at) VALUES
('ea46c210-a62a-4d27-841d-9570d2208cd4', 'adm', '$2a$10$RniGA2RNE8LCzx2srWa4XeZj9.jQ7wu2iv9gIomLhS/lxawV7eK92', true, '2023-04-20 09:42:59.711')

# Para logar, entre na rota http://localhost:3000/user/auth com o verbo POST preencha os campos 'email' e 'password' com "adm" e "adm".
```


## Endpoints
#### Você pode testar todos os endpoints diretamente no Postman ao importar [esse](https://github.com/joaosantosmedeiros/hamburgueria-Byte/files/11291177/Hamburgueria.postman_collection.zip) arquivo. Ele contém todas as rotas com os campos já predefinidos, a única coisa que precisa ser feita é colocar a informação. Você pode também editar as variáveis já colocadas, como 'url' e 'token_admm', 'token_user' e 'token_user2' para realizar testes.
<!--ts-->
   * Usuários
       * *POST* - /users/create -- Cria um usuário. No body, deve conter um objeto json com as propriedades **email** e **password**. Caso tudo ocorra bem, o servidor irá mandar como resposta o **TOKEN** jwt.
       * *GET* - /users/get/:id -- Exibe um usuário. Apenas um admin ou o próprio usuário pode ler a si mesmo.
       * *GET* - /users/get -- Exibe todos os usuários. Apenas um admin poderá entrar nessa rota.
       * *PUT* - /users/update/:id -- Atualiza um usuário. Um usuário pode atualizar apenas a si mesmo, podendo ou não enviar os campos **email** e **password**. Caso ele não envie um dos campos, a informação permanecerá a mesma.
       * *DELETE* - /users/delete/:id -- Deleta um usuário. Um usuário pode deletar apenas a si mesmo.
       * *POST* - /users/auth -- Autentica um usuário. O usuário deve enviar os campos **email** e **password**.

   * Produtos -- Todas as rotas devem ser acessadas com um token de um admin.
      * *POST* - /products/create -- Cria um produto. Deve conter um objeto json com as propriedades **name**, **description** e **price** (number).
      * *GET* - /products/get/:id -- Exibe um produto.
      * *GET* - /products/get -- Exibe todos os produtos.
      * *PUT* - /products/update/:id -- Atualiza um produto. Pode ou não conter os campos **name**, **description** e **price**. Caso não seja enviado um dos campos, a informação permanecerá a mesma.
      * *DELETE* - /products/delete/:id -- Deleta um produto.

   * Pedidos
      * *POST* - /order/create -- Cria um pedido. Deve ser feito com a autenticação de um cliente e conter um objeto json com as propriedades **productId** e **quantity** (number).
      * *GET* - /order/get/:id -- Exibe um pedido. Apenas o usuário que fez um pedido ou um admin pode acessá-lo.
      * *GET* - /order/get -- Exibe todos os pedidos. Apenas um admin pode acessá-lo.
      * *PUT* - /order/update/:id -- Atualiza um pedido. Pode ou não conter os campos **productId** e **quantity**. Caso não seja enviado um dos campos, a informação
        permanecerá a mesma. Apenas o usuário que fez o pedido pode atualizá-lo.
      * *DELETE* - /order/delete/:id -- Deleta um pedido. Apenas o cliente que fez esse pedido pode deletá-lo, caso o pedido esteja com o status como pendente.
      * *GET* - /order/accept/:id -- Aceita um pedido que está com o status pendente. Apenas um admin pode realizar essa operação.
      * *GET* - /order/deny/:id -- Recusa um pedido que está com o status pendente. Apenas um admin pode realizar essa operação.
<!--te-->

