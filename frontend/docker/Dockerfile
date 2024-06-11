FROM node:22-alpine
WORKDIR /app
# install and cache app dependencies
COPY frontend/package.json /app/package.json
RUN npm install

COPY frontend/ .
# start app
EXPOSE 3000
CMD ["npm", "start"]
