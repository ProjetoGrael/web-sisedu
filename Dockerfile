FROM nginx:stable-alpine3.17-slim
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/web-sisedu /usr/share/nginx/html