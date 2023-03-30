const express = require('express');
const EventEmitter = require('events');

const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;


// Define a custom middleware function
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
    next();
};


// Creating a new Event Emitter
const  eventEmitter = new EventEmitter();
// Rregistering an event listener for the 'userCreated' event
eventEmitter.on('userCreated', (userData) => {
  console.log(`New user created: ${userData.name}`);
});

// Rregistering an event listener for the 'userUpdated' event
eventEmitter.on('userUpdated', (userId, updatedUserData) => {
  console.log(`User ${userId} updated with new data: ${JSON.stringify(updatedUserData)}`);
});

// Rregistering an event listener for the 'userDeleted' event
eventEmitter.on('userDeleted', (userId) => {
  console.log(`User ${userId} deleted`);
});




// Using the custom middleware function with 'app.use' for all requests
   app.use(logger); 
// Using the pre-defined middleware function with 'app.use' to parse incoming request data as JSON and URL-encoded data.
   app.use(express.json());



// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
  });

  
  app.get('/users/:userId/:email', (req, res) => {
    const { userId, email } = req.params;
      res.send(`User ID: ${userId} Email: ${email}`);
 });

 
// Example route for creating a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // Save the new user to the database
  const newUser = { name, email };

  // Emit the 'userCreated' event with the new user data
  eventEmitter.emit('userCreated', newUser);

  res.status(201).json(newUser);
});


// Example route for updating an existing user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;

  // Update the user in the database
  // ...

  // Emit the 'userUpdated' event with the updated user data
  eventEmitter.emit('userUpdated', id, updatedUserData);

  res.status(200).json(updatedUserData);
});



// Example route for deleting an existing user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  // Delete the user from the database
  // ...

  // Emit the 'userDeleted' event with the deleted user's ID
  eventEmitter.emit('userDeleted', id);

  res.status(204).send();
});



// Start the server and listen on port 3000 for incoming requests.
   app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });