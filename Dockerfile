FROM node:12-alpine
RUN apk add --no-cache \
    autoconf \
    automake \
    autoconf \
    libtool \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm i npm-run-all
RUN npm install
RUN npm run build
RUN ls -al

FROM nginx:1.19
EXPOSE 80
RUN ls -al
CMD COPY /build /usr/share/nginx/html
RUN ls /usr/share/nginx/html
COPY ./infra/nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]