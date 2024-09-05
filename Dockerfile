FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
