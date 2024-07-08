# Dockerfile do backend para desenvolvimento
FROM node:16-alpine

WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json ./

# Instalação das dependências (incluindo devDependencies para ferramentas de desenvolvimento)
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expor a porta onde o servidor Node.js estará escutando
EXPOSE 3000

# Comando para iniciar o servidor em modo de desenvolvimento
CMD ["node", "app.js"]
