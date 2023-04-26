FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run clean && npm run build

FROM node:18-alpine AS dev
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs 
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
WORKDIR /app
COPY . .
RUN npm ci
CMD ["npm","run","dev"]

FROM node:18-alpine AS production
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont 
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app
COPY --from=builder ./app/dist/ ./dist/
COPY package*.json ./
COPY ./public/ ./public/
COPY ./templates/ ./templates/
COPY .env ./
RUN npm ci --only=production --ignore-scripts
CMD ["npm", "start"]