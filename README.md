Duplo Order Manager Challenge
==========================================
## Getting Started

# Running the application
- clone repo
- checkout to dev branch
- `npm install` to install necessary dependencies
- create a .env file at the root of the project and copy value from .env.example file into it. (set the values for your environmental variables)
- `npm run db:migrate:dev` to migrate the tables to the database
- `npm run db:seed` to populate seed data to the db
- `npm run start:dev` to start the application

* You should now have the api running at http://localhost:3000 and the swagger doc running at http://localhost:3000/api/v1/docs

# running with docker
- have docker installed
- clone repo
- checkout to dev branch
- `npm install` to install necessary dependencies
- create a .env file at the root of the project and copy value from .env.example file into it. (set the values for your environmental variables)
- From the root of the project, run `docker-compose up -d --build`
- wait for some minutes
- you should have a PostgreSQL container running
- you should have the app container running
- you should have a redis instance running

 * You should now have the api running at http://localhost:3000 and the swagger doc running at http://localhost:3000/api/v1/docs
