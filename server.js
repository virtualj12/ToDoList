const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// enable CORS
app.use(cors());

// parse application/json
app.use(bodyParser.json());

// create an array to store the tasks
let tasks = [];

// handle GET requests to retrieve all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// handle POST requests to add a new task
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(newTask);
});

// handle PUT requests to update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  tasks = tasks.map(task => {
    if (task.id === taskId) {
      return updatedTask;
    } else {
      return task;
    }
  });
  res.json(updatedTask);
});

// handle DELETE requests to remove a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: 'Task removed successfully' });
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
