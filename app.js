const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');

const errorController = require('./controllers/error');

const frontendRoutes = require('./routes/frontend');
const apiRoutes = require('./routes/api');

const PORT = process.env.PORT || 3000;

// init app
const app = express();

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// serve bootstrap & jquery
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// middleware
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(logger('dev'));

// allow the server to accept requests from external clients for api endpoints
const corsOptions = {
    methods: "GET, POST, PUT, DELETE, OPTIONS"
}
app.use(cors(corsOptions));

// frontend route
app.use('/', frontendRoutes);

// api endpoint route
app.use('/api', apiRoutes);

// error route
app.use(errorController.get404);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

module.exports = app;