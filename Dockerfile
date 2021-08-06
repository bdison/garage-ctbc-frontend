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

RUN chgrp -R 0 /etc/nginx/ /var/cache/nginx /var/run /var/log/nginx && \ 
    chmod -R g+rwX /etc/nginx/ /var/cache/nginx /var/run /var/log/nginx

# users are not allowed to listen on priviliged ports
# RUN sed -i.bak 's/listen\(.*\)80;/listen 8081;/' /etc/nginx/conf.d/default.conf

# comment user directive as master pr=ocess is run as user in OpenShift random UID
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]
