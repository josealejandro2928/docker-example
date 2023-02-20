FROM node:18
ENV NODE_PORT 3000
WORKDIR /app
EXPOSE 3000
COPY index.js package.json package-lock.json /app/
COPY /api /app/api
RUN npm install
RUN npm install nodemon -g
CMD ["npm", "start"]