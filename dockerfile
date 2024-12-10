FROM node
WORKDIR /entregafinalfuentesbe3
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4001
CMD ["npm","start"]