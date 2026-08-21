FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY database ./database
COPY scripts ./scripts
COPY src ./src
ENV NODE_ENV=production
EXPOSE 4000
CMD ["npm", "run", "start:production"]
