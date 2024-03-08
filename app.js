const express = require('express');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

app.use('/', routes);

// Connect to the database
require('dotenv').config();
const connectDB = require('./config/dbConfig');
connectDB();


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });

