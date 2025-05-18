FROM node:20 as build

WORKDIR /app

COPY package*.json ./

# Сначала установите конкретную версию ajv
RUN npm install ajv@8.11.0 --legacy-peer-deps
# Затем установите остальные зависимости
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
