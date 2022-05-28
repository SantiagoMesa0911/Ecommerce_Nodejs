const express = require('express');
const morgan = require('morgan');
const cookie = require('cookie-parser');
const { port } = require('./config');
const { connection } = require('./config/db');
const users = require('./routes/user');
const auth = require('./routes/auth');
const app = express();

connection();

//UTLIZANDO MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));
app.use(cookie());

users(app);
auth(app);

app.listen(port, () => {
  console.log(`El servidor esta corriendo en http://localhost${port}`);
});
