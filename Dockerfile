FROM node:12-alpine
RUN apk update & apk upgrade
RUN apk add libtool automake autoconf nasm
WORKDIR /app
RUN cd /app
COPY . /app
RUN pwd
RUN ls -al
RUN npm install
RUN npm run build


FROM nginx:1.19
EXPOSE 80
COPY ./infra/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]