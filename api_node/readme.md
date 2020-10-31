# Timemanager API

## Requirements

- Nodejs 14.x
- PostgreSQL 8.4

## Installation

- Run `npm install` to download the dependencies
- Run PostgreSql server
- Run `createdb -U postgres timemanager_api_dev` to create the database
- Run `sequelize db:migrate` to create or update table from migrations
- Run `sequelize db:seed:all` to import default data in tables

## Start Server

- Run `npm start`

## Informations
- To create PostgreSQL database :
`createdb -U postgres timemanager_api_dev`
- To create a table :
`sequelize model:generate --name WorkingTime --attributes start:date,end:date,userId:integer`
- To create fake data in table :
`sequelize seed:generate --name User`
- To remove all tables :
`sequelize db:migrate:undo:all`
- To remove all data in tables :
`sequelize db:seed:undo:all`