FROM node:16-alpine
RUN apk add libtool automake autoconf nasm gcc
WORKDIR /app
RUN cd /app
COPY . /app
RUN pwd
RUN ls -al
RUN npm ci
RUN npm run build


FROM nginx:1.19
EXPOSE 80
COPY ./infra/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]