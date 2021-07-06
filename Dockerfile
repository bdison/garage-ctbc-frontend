FROM node:12-alpine
WORKDIR /app
COPY . .
RUN apk add --no-cache -t build-dependencies make gcc g++ python libtool autoconf automake \
    && cd $(npm root -g)/npm \
    && npm install fs-extra \
    && sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js \
    && npm install -g node-gyp \
    && npm install -g sodium@1.2.3 --unsafe-perm \
    && npm install -g argon2@0.14.0 --unsafe-perm \
    && apk del build-dependencies
RUN npm install
RUN npm run build

FROM nginx:1.19
EXPOSE 80
COPY ./infra/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]