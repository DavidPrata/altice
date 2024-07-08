# Dockerfile do frontend para desenvolvimento
FROM node:18-alpine

WORKDIR /app

# Instala as dependências do Angular
COPY package.json package-lock.json ./
RUN npm install

# Copia todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Inicia o servidor de desenvolvimento com live reload
CMD ["npm", "start"]
