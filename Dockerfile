FROM node:12-alpine as build-env
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
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx
COPY --from=build-env /app/build /usr/share/nginx/html
# COPY ./infra/nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 5000