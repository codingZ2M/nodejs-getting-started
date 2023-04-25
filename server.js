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


  app.post('/users', (req, res) => {
    const {password, username} = req.body
    if(!password || !username) {
      res.sendStatus(400)
      return
    }
    res.send({userId: 1})
    }); 
 


// Start the server and listen on port 3000 for incoming requests.
   app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

  module.exports = app;