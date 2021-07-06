FROM node:12-alpine
WORKDIR /app
COPY . .
RUN echo "@edge http://nl.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories

RUN apk update
RUN apk add \
        build-base \
        libtool \
        autoconf \
        automake \
        jq \
        openssh \
        python \
        libexecinfo-dev@edge
RUN npm install
RUN npm run build

FROM nginx:1.19
EXPOSE 80
COPY ./infra/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]