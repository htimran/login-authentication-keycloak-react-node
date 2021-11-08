const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const CONSTANT_VARIABLE = require('./constants/constants');

const app = express();

// ---------------------------------- App Configuration

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

// ---------------------------------- Routes
app.use('/', require('./routes/index.js'));
app.use('/user', require('./routes/user.js'));

app.listen(CONSTANT_VARIABLE.PORT, function () {
  console.log("Server is listening on Port: ", CONSTANT_VARIABLE.PORT);
})


