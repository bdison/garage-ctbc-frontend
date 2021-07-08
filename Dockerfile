FROM nginx:1.19
EXPOSE 80
RUN ls -al
CMD COPY /build /usr/share/nginx/html
COPY ./infra/nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]