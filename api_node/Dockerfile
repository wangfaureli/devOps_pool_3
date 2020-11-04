FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install &&\
    # createdb -U postgres timemanager_api_dev &&\
    npx sequelize init
    npx sequelize db:migrate &&\
    npm start &&\
    npx sequelize db:seed:all
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000
# CMD [ "npm", "start" ]