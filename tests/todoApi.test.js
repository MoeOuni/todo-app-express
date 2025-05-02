const request = require('supertest');
const app = require('../app');

describe('Todo API', () => {
    let createdTodoId;

    // Test GET /api/todos
    test('GET /api/todos should return all todos', async () => {
        const response = await request(app).get('/api/todos');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test POST /api/todos
    test('POST /api/todos should create a new todo', async () => {
        const newTodo = {
            title: 'Test todo item',
            completed: false
        };

        const response = await request(app)
            .post('/api/todos')
            .send(newTodo);

        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.completed).toBe(newTodo.completed);
        expect(response.body.id).toBeDefined();

        createdTodoId = response.body.id;
    });

    // Test GET /api/todos/:id
    test('GET /api/todos/:id should return a specific todo', async () => {
        // First ensure we have an ID from the POST test
        if (!createdTodoId) {
            const createResponse = await request(app)
                .post('/api/todos')
                .send({ title: 'Test todo for GET', completed: false });
            createdTodoId = createResponse.body.id;
        }

        const response = await request(app).get(`/api/todos/${createdTodoId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(createdTodoId);
    });

    // Test PUT /api/todos/:id
    test('PUT /api/todos/:id should update a todo', async () => {
        // First ensure we have an ID
        if (!createdTodoId) {
            const createResponse = await request(app)
                .post('/api/todos')
                .send({ title: 'Test todo for PUT', completed: false });
            createdTodoId = createResponse.body.id;
        }

        const updatedTodo = {
            title: 'Updated test todo',
            completed: true
        };

        const response = await request(app)
            .put(`/api/todos/${createdTodoId}`)
            .send(updatedTodo);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedTodo.title);
        expect(response.body.completed).toBe(updatedTodo.completed);
    });

    // Test DELETE /api/todos/:id
    test('DELETE /api/todos/:id should delete a todo', async () => {
        // First ensure we have an ID
        if (!createdTodoId) {
            const createResponse = await request(app)
                .post('/api/todos')
                .send({ title: 'Test todo for DELETE', completed: false });
            createdTodoId = createResponse.body.id;
        }

        const response = await request(app).delete(`/api/todos/${createdTodoId}`);
        expect(response.status).toBe(204);

        // Verify the todo is deleted
        const getResponse = await request(app).get(`/api/todos/${createdTodoId}`);
        expect(getResponse.status).toBe(404);
    });

    // Test error cases
    test('POST /api/todos should return 400 if title is missing', async () => {
        const response = await request(app)
            .post('/api/todos')
            .send({ completed: false });

        expect(response.status).toBe(400);
    });

    test('GET /api/todos/:id should return 404 for non-existent todo', async () => {
        const response = await request(app).get('/api/todos/9999');
        expect(response.status).toBe(404);
    });
});