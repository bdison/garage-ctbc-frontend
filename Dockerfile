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
# COPY package.json /app
# RUN pwd
# RUN ls -al
# RUN npm install
COPY . /app
RUN ls -al
RUN npm install
RUN ls -al
RUN npm run build
RUN ls -al


FROM nginx:1.19
EXPOSE 80
COPY ./infra/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]