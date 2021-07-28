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
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
# EXPOSE 3000
# CMD [ "npm", "run", "start" ]