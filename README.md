# Todo App Express

A simple Express.js Todo application with a REST API and web interface.

## Features

- Create, read, update, and delete todos
- Simple web interface
- RESTful API
- Docker support

## Running with Docker

### Build the Docker image

```bash
docker build -t todo-app-express .
```

### Run the container

```bash
docker run -p 3000:3000 -d --name todo-app todo-app-express
```

This will start the application and expose it on port 3000.

### Access the application

- Web interface: http://localhost:3000
- API: http://localhost:3000/api/todos

### Stop the container

```bash
docker stop todo-app
```

### Remove the container

```bash
docker rm todo-app
```

## Running locally without Docker

### Install dependencies

```bash
npm install
```

### Start the application

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo