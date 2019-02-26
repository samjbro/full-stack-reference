FROM node:alpine
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm prisma:
CMD ["npm", "run", "start"]