const express = require('express');
const app = express();
const route = require('./routes/user');
const tasks = require('./routes/taskRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const cors = require('cors');
require('dotenv').config();
var bodyParser = require('body-parser');


// Middleware
app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors());
app.use('/api', route);
// root route
//This is called mounting the router  =>  So mounting a new router (taskRouter) on a route ('/api/v1/tasks').
app.use('/api/v1', tasks); //we created basically a sub application,


app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
