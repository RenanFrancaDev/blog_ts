setup inicial

npm i -y
npm i @types/node -D
npm install @types/express@latest --save-dev
npm i typescript -D
npm i ts-node-dev -D
npm i prisma -D
npm i @prisma/client
npm i eslint -D
npm i @typescript-eslint/eslint-plugin -D
npm i @typescript-eslit/eslint-parser -D
npm i @typescript-eslint/parser -D

- Criar tsconfig.ts
  npx tsc --init

* trocar strict para false

- Iniciar Eslint
  npx eslint --init

\*TypeScript versão 4

iniciar prisma:
npx prisma init --datasource-provider MySql
configura User
rodar a migrate

- criar tabela dentro do banco de dados:
  npx prisma migrate dev --name init

- Instalação JWT Token
  npm install jsonwebtoken bcryptjs @types/jsonwebtoken @types/bcryptjs --save
