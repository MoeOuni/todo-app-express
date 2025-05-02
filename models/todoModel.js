// Simple in-memory todo store
let todos = [
    { id: 1, title: 'Learn Express.js', completed: false },
    { id: 2, title: 'Build a REST API', completed: false }
];

// Generate a new ID for a todo
function getNextId() {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
}

// Get all todos
exports.getAllTodos = () => {
    return todos;
};

// Get a specific todo by ID
exports.getTodoById = (id) => {
    return todos.find(todo => todo.id === id);
};

// Create a new todo
exports.createTodo = (todoData) => {
    const newTodo = {
        id: getNextId(),
        title: todoData.title,
        completed: todoData.completed || false
    };
    todos.push(newTodo);
    return newTodo;
};

// Update a todo
exports.updateTodo = (id, todoData) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) return null;

    const updatedTodo = { ...todos[todoIndex], ...todoData };
    todos[todoIndex] = updatedTodo;

    return updatedTodo;
};

// Delete a todo
exports.deleteTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) return false;

    todos.splice(todoIndex, 1);
    return true;
};