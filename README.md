Welcome to Serenade's TODO app, version 1!
`by Matias Urbano`

# Introduction

This small, 2-page app helps us track our pending TO-DOs across projects.

We have completed all the frontend features we needed, so don't worry about any of the UI - even if it doesn't look great yet.

The app has two pages, the [task board](http://localhost:3000/) and the [project board](http://localhost:3000/projects). 
Both pages use asynchronous calls to fetch data from the backend.

The backend has 3 API endpoints:
- /api/tasks
- /api/projects
- /api/done

These are implemented as Next.JS API routes - you can find them under src/pages/api

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


# Exercises

* Feel free to modify any of the files in this whole project when completing these exercises.
* Complete the exercises as if you were writing code for production. So whatever you would normally do for code going into PROD - the same should apply here.
* You shouldn't need to change any of the frontend.

### How to submit

When you have completed the exercises, please commit into a private GitHub repo and tag the following github usernames as collaborators so we can review.

* rupperyes
* surenw-serenade


## 1. Filter tasks by title

The tasks board page in http://localhost:3000/ has a filtering feature based on task title.

The frontend is sending the query parameter correctly to the /api/tasks endpoint, but we haven't done the backend part yet.

We should:
 - Complete the filtering feature based on the query parameter in the /api/tasks endpoint
 - Make sure this is safe and doesn't pose a security risk
 - Make sure it's as efficient as possible


## 2. Pagination types

Both API endpoints (/api/projects and /api/tasks) return a very similar JSON shape, which is typed in the index.d.ts file
in the root of the project. 

As we're getting ready to add more routes and types, we'd like to reduce redundancy and duplication and maybe come up
with a new type that can encompass any paginated response types in the future. Could you help with this?


## 3. Projects API improvements

The projects page in http://localhost:3000/projects fetches all the data from the /api/projects endpoint.

This is working well in our local, but when doing load testing with a lot of projects and tasks we saw a serious performance degradation.

We should make sure this API is as performant as possible, as it will be under heavy load.

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

