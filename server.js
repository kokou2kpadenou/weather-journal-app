const express = require("express");

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require("body-parser");

// Middleware
//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

const port = 5000;

// Spin up the server
const server = app.listen(port, listening);

// Callback function to debug the server
function listening() {
  console.log(`Weather journal server on localhost: ${port}`);
}
