# ------------------ BUILD -----------------------
FROM node:18-alpine3.17 as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig*.json .
COPY vite.config.ts .
COPY index.html .
COPY src ./src

RUN npm install
RUN npm run build

# ------------------ LAUNCH ----------------------
FROM node:18-alpine3.17

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package.json .
COPY package-lock.json .

RUN npm install --production

CMD ["node", "dist/index.js"]
