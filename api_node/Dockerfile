FROM node:14

# Create app directory
WORKDIR /home/app

COPY package.json /home/app
COPY package-lock.json /home/app

RUN npm install -g pg sequelize sequelize-cli
RUN npm install

# Bundle app source
COPY . /home/app

EXPOSE 4000

CMD ./start.sh