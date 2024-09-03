FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.17.9-alpine as runtime

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/
COPY --from=build /app/dist/ /var/www

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
