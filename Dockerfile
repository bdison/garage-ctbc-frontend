FROM nginx:alpine

# Install node.js
RUN apk update && \
    apk add nodejs npm python make curl g++
RUN apk add --no-cache \
    autoconf automake libtool bash libc6-compat libjpeg-turbo-dev libpng-dev nasm

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
RUN cp -r /app/build/. /usr/share/nginx/html
# COPY --from=build-env /app/build /usr/share/nginx/html
# COPY ./infra/nginx/default.conf /etc/nginx/conf.d/default.conf
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx
EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]
