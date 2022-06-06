<h1 align="center">
Task List App
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux, Nodejs
</p>

> The application includes the following features:
> - User Registration
> - User Authentication (login/logout)
> - Visualize, add, edit and remove user projects
> - Visualize, add, edit and remove tasks associated with the projects
>

> It follows the rules:
> - One user may have several projects
> - One user can access his projects only
> - Each project may include multiple tasks
> - Each task must have a description, creation date and finish date
> - The user needs to have a simple option to mark the tasks as completed when accessing the task list
> - Each task should have its termination date visible as a tooltip, if available, and some visual way of identifying
its status
> - A task that was defined as finished should not be edited nor removed
> - When a task or Project is added our deleted, the page should not fully refresh, so that users have a good
experience.

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)

### Prepare your env

The current client-side env variables are:

- PORT=3000
- REACT_APP_API_URL="http://localhost:8000/api"

If this doesn't correspond to your needs, remember to change it before you start your client


### Start

```terminal
$ cd client   // go to client folder
$ npm i       // npm install packages
$ npm start // run it locally
```

## Server-side usage(PORT: 8000)

### Prepare your env

The current server env variables are:

- MONGODB_URI="mongodb://127.0.0.1:27017"
- ORIGIN_URL="http://localhost:3000"
- JWT_SECRET="task-manager-secret"

If this doesn't correspond to your needs, remember to change it before you start your server

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start // run it locally
```

### License
[MIT]