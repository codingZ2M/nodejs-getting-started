const express = require('express');
const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;

// Define a custom middleware function
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
    next();
};

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
 
 app.post('/users', (req, res) => {
   const { name, email } = req.body;
     res.send(`Name: ${name}, Email: ${email}`);
 });

  /* Setting up error handling middleware using the app.use() - This will catch any errors that occur in our routes or middleware and respond with a 500 status code and a message */
  app.use((err, req, res, next) => {   
    const {name, email} = req.body;
    if(!name || !email) {
        res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack});
     throw new Error("All Fileds Are Mandatory!");
    }
});

// Start the server and listen on port 3000 for incoming requests.
   app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });