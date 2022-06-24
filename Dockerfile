FROM node:alpine
WORKDIR /code-to-geeks-api
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]
