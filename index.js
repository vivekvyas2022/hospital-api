const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const router = require('./routes/router');
const passport = require('passport');
const passportStratergy = require('./config/passport');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8000;

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
