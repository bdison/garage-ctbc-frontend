FROM nginx:1.19
EXPOSE 80
COPY . /app
COPY app/build /usr/share/nginx/html
RUN ls /usr/share/nginx/html
COPY ./infra/nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]