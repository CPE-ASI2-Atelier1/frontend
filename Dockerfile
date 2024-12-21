# ------------------ BUILD -----------------------
FROM node:18-alpine3.17 as build
WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig*.json .
COPY vite.config.ts .
COPY index.html .
COPY src ./src

#RUN npm install
#RUN npm run build TODO : add ts compilation : npx tsc -b
RUN npm install
RUN npx vite build

# ------------------ PROXY ----------------------
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/nginx.conf.template

RUN apk add --no-cache gettext
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 8080
CMD ["/docker-entrypoint.sh"]
