FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run clean && npm run build

FROM node:18-alpine AS dev
WORKDIR /app
COPY . .
RUN npm ci
CMD ["npm","run","dev"]

FROM node:18-alpine AS production

WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package*.json ./
RUN npm install --production
CMD ["npm", "start"]