FROM node:22.13.0-alpine


WORKDIR /app

COPY . .

#Vérifier les versions de Node.js et npm
RUN node -v && npm -v

RUN npm install

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf