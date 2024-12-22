#!/bin/sh

# Remplacement des variables d'environnement dans la configuration Nginx
envsubst '${VITE_MONOLITH_URL} ${VITE_SCHEDULER_URL} ${VITE_SOCKET_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Démarrage de Nginx
exec nginx -g "daemon off;"