const express = require('express');
const router = express.Router();
const todoModel = require('../models/todoModel');

// Get all todos
router.get('/', (req, res) => {
    const todos = todoModel.getAllTodos();
    res.json(todos);
});

// Get a specific todo
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todoModel.getTodoById(id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
});

// Create a new todo
router.post('/', (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTodo = todoModel.createTodo(req.body);
    res.status(201).json(newTodo);
});

// Update a todo
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTodo = todoModel.updateTodo(id, req.body);

    if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
});

// Delete a todo
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = todoModel.deleteTodo(id);

    if (!result) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(204).end();
});

module.exports = router;