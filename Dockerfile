FROM node:20-alpine AS build_stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS production_stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build_stage /app/dist /usr/share/nginx/html
EXPOSE 80