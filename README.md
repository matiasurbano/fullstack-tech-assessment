# Project Tracking App

Author: `Matias Urbano`

# Tech Stack
- Typescript
- React
- Nextjs
- Prisma ORM (seeding & migrations)
- Docker

# Introduction

This small, 2-page app helps us track our pending tasks across projects.

The app has two pages, the [task board](http://localhost:3000/) and the [project board](http://localhost:3000/projects). 
Both pages use asynchronous calls to fetch data from the backend.

The backend has 3 API endpoints:
- /api/tasks
- /api/projects
- /api/done


## Environment Variables

Make sure the environment variables are in place copying them from the sample and then within `.env` file a define POSTGRES_USER and POSTGRES_PASSWORD of choice. 

 ```
 cp .env.sample .env
 ```

## Database Setup

Postgres up and running. This will use port 5432 in your machine, so make sure it's free.

### Without Docker
You can spin up your own Postgres instance and update the connection `DATABASE_URL` environemnt variable

### With Docker

The above database setting will be used to spin up a Postgres instance using docker.

```shell
docker-compose down && docker-compose up
```

## Create Database, Migrations and Seeding

To recreate the database and apply all the db migrations and initial seeding.

```
npx prisma migrate reset -f 
```

### Seeding
The seeding mechanism will be creating Projects and tasks base on the BULK_SEED_SIZE defined in the environemnt variables files, this will be useful later for to test it against a heavy load. The content for the Projects and Tasks are going to be randomly generated.

# How to run it

```shell
npm install
npm run dev
```

This installs all dependencies and starts serving the app in http://localhost:3000

We use PostgreSQL as our data store, so before the app is accessible we also need to spin it up: 


## Filtering tasks by title

The tasks board page in http://localhost:3000/ has a filtering feature based on task title.

The frontend is sending the query parameter correctly to the /api/tasks endpoint

## Projects Endpoint with Pagination
The Projects endpoint have a cursor-based pagination, Also indexes has been added to improve performance. 


# Changelog

1. Moved password to environment variables
    - removing passwords from repo
    - implementing .env
1. Implemented Prisma ORM
    - Define Schema
    - Create initial migration script
    - Seeding mechanism 
1. Updated all api endpoints to use the ORM
    - Refactoring and improving the handlers
1. Added createdAt, updatedAt audit purposes
1. Added Cursor-based Pagination
    - note: offset pagination does not scale
1. Added bulk seed with a BULK_SEED_SIZE enviroment variable to set the size of the dataset
1. Adding Generic Paginated Response
1. Added Debounce Search in ClientSide
1. Added 500 / 404 Default Pages
1. Improved pagination and add UI to Fetch next
1. Performance Improvements
