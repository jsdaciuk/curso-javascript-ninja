'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const users = [
  { name: 'John Doe', username: 'john', age: 34 },
  { name: 'Jane Doe', username: 'jane', age: 23 },
  { name: 'Jim Doe', username: 'jim', age: 45 }
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:username', (req, res) => {
  const { username } = req.params;
  const user = users.find(user => user.username === username);
  if (user) {
    return res.json(user);
  }
  res.status(404).json({ error: 'User not found' });
});

app.post('/users', (req, res) => {
  const { name, username, age } = req.body;
  const newUser = { name, username, age };
  var hasUser = users.some(user => user.username === username);
  if (!hasUser) {
    users.push(newUser);
  }
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
