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

FROM nginx:1.14.2
COPY --from=build-env /app/build /usr/share/nginx/html
RUN chgrp -R 0 /etc/nginx/ /var/cache/nginx /var/log/nginx  && \ 
    chmod -R g+rwX /etc/nginx/ /var/cache/nginx /var/log/nginx

# users are not allowed to listen on priviliged ports
RUN sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf

# comment user directive as master process is run as user in OpenShift random UID
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
