console.log("Welcome to Todo CLI");

const yargs = require("yargs");
const tasks = require("./todo");

const argv = yargs
  .command("addTodo", "Add a new todo", {
    title: { describe: "Task title", demandOption: true, type: "string" },
    priority: { describe: "Priority (high, medium, low)", type: "string", default: "medium" }
  })
  .command("updateStatus", "Update task status", {
    title: { describe: "Task title", demandOption: true, type: "string" },
    status: { describe: "New status (pending, in-progress, done)", demandOption: true, type: "string" }
  })
  .command("updatePriority", "Update task priority", {
    title: { describe: "Task title", demandOption: true, type: "string" },
    priority: { describe: "New priority (high, medium, low)", demandOption: true, type: "string" }
  })
  .command("listTodos", "List all tasks")
  .command("listByStatus", "List tasks by status", {
    status: { describe: "Status (pending, in-progress, done)", demandOption: true, type: "string" }
  })
  .command("search", "Search for a task", {
    keyword: { describe: "Keyword", demandOption: true, type: "string" }
  })
  .help()
  .argv;

const command = argv._[0];

if (!command) {
  console.log("No command provided!");
  console.log("Usage:");
  console.log("  node index.js addTodo --title='Buy groceries' --priority='high'");
  console.log("  node index.js updateStatus --title='Buy groceries' --status='done'");
  console.log("  node index.js updatePriority --title='Buy groceries' --priority='low'");
  console.log("  node index.js listTodos");
  console.log("  node index.js listByStatus --status='in-progress'");
  console.log("  node index.js search --keyword='assignment'");
  process.exit(1);
}

if (command === "addTodo") {
  tasks.addTodo(argv.title, argv.priority);
} else if (command === "updateStatus") {
  tasks.updateStatus(argv.title, argv.status);
} else if (command === "updatePriority") {
  tasks.updatePriority(argv.title, argv.priority);
} else if (command === "listTodos") {
  tasks.listTodos();
} else if (command === "listByStatus") {
  tasks.listByStatus(argv.status);
} else if (command === "search") {
  tasks.searchTodo(argv.keyword);
} else {
  console.log("Invalid command! Use 'node index.js --help' for available commands.");
}
