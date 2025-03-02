const fs = require("fs");

// Read tasks from file
const fetchTodos = () => {
  try {
    if (!fs.existsSync("tasks-data.json")) return [];
    const data = fs.readFileSync("tasks-data.json", "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

// Save tasks to file
const saveTodos = (todos) => {
  fs.writeFileSync("tasks-data.json", JSON.stringify(todos));
};

// Add a new task with a title and priority (default is "medium")
const addTodo = (title, priority = "medium") => {
  const todos = fetchTodos();
  const validPriorities = ["high", "medium", "low"];
  if (!validPriorities.includes(priority)) {
    console.log("Invalid priority. Use 'high', 'medium', or 'low'.");
    return;
  }
  const todo = { title, status: "pending", priority };
  if (todos.some(t => t.title === title)) {
    console.log("Task already exists!");
    return;
  }
  todos.push(todo);
  saveTodos(todos);
  console.log(`Task added: "${title}" with priority "${priority}"`);
};

// Update the status of a task
const updateStatus = (title, status) => {
  const validStatuses = ["pending", "in-progress", "done"];
  if (!validStatuses.includes(status)) {
    console.log("Invalid status. Use 'pending', 'in-progress', or 'done'.");
    return;
  }
  let todos = fetchTodos();
  let found = false;
  todos = todos.map(todo => {
    if (todo.title === title) {
      found = true;
      return { ...todo, status };
    }
    return todo;
  });
  if (found) {
    saveTodos(todos);
    console.log(`Task "${title}" updated to status "${status}"`);
  } else {
    console.log("Task not found!");
  }
};

// Update the priority of a task
const updatePriority = (title, priority) => {
  const validPriorities = ["high", "medium", "low"];
  if (!validPriorities.includes(priority)) {
    console.log("Invalid priority. Use 'high', 'medium', or 'low'.");
    return;
  }
  let todos = fetchTodos();
  let found = false;
  todos = todos.map(todo => {
    if (todo.title === title) {
      found = true;
      return { ...todo, priority };
    }
    return todo;
  });
  if (found) {
    saveTodos(todos);
    console.log(`Task "${title}" updated to priority "${priority}"`);
  } else {
    console.log("Task not found!");
  }
};

// Search tasks by keyword in the title
const searchTodo = (keyword) => {
  const todos = fetchTodos();
  const results = todos.filter(todo =>
    todo.title.toLowerCase().includes(keyword.toLowerCase())
  );
  if (results.length === 0) {
    console.log(`No tasks found with keyword "${keyword}"`);
  } else {
    console.log(`Found ${results.length} task(s) matching "${keyword}":`);
    results.forEach(logTodo);
  }
};

// List all tasks (sorted by status and priority) in one column
const listTodos = () => {
  let todos = fetchTodos();
  // Sort by status and then by priority
  todos.sort((a, b) => {
    const statusOrder = { "in-progress": 1, "pending": 2, "done": 3 };
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return (statusOrder[a.status] - statusOrder[b.status]) ||
           (priorityOrder[a.priority] - priorityOrder[b.priority]);
  });
  console.log("All Tasks:");
  todos.forEach(logTodo);
};

// List tasks by a specific status
const listByStatus = (status) => {
  const todos = fetchTodos();
  const results = todos.filter(todo => todo.status === status);
  if (results.length === 0) {
    console.log(`No tasks found with status "${status}"`);
  } else {
    console.log(`Tasks with status "${status}":`);
    results.forEach(logTodo);
  }
};

// Utility function to print a task
const logTodo = (todo) => {
  console.log("--------------");
  console.log(`Title: ${todo.title}`);
  console.log(`Status: ${todo.status}`);
  console.log(`Priority: ${todo.priority}`);
  console.log("--------------");
};

module.exports = {
  addTodo,
  updateStatus,
  updatePriority,
  searchTodo,
  listTodos,
  listByStatus,
  logTodo
};
