FROM node:alpine3.20 as build

# Build App

WORKDIR /app
COPY package.json ./  

RUN npm install

COPY . .

RUN npm run build


# Serve with Nginx

FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf * 
COPY --from=build /app/dist .

EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]