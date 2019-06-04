const CONFIG = require('./config/config');     //instantiate configuration variables

console.log("Environment:", CONFIG.app);

const express 		= require('express');
const logger 	    = require('morgan');
const bodyParser 	= require('body-parser');
const passport      = require('passport');
const pe            = require('parse-error');
const cors          = require('cors');
const mongoose      = require('mongoose');

const v1 = require('./routes/v1/')(express, passport);

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static('public'));

//Passport
app.use(passport.initialize());

// Connect to MongoDB
mongoose
	.connect(
		'mongodb://mongo:27017/docker-node-mongo',
		{ useNewUrlParser: true }
	)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));


//DATABASE
const models = require("./models");
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database:', CONFIG.db_name);
})
.catch(err => {
    console.error('Unable to connect to SQL database:',CONFIG.db_name, err);
});
if(CONFIG.app==='dev'){
    // models.sequelize.sync();
    models.sequelize.sync({ force: true }); //deletes all tables then recreates them useful for testing and development purposes
}

// CORS
app.use(cors());

// API Versioning
app.use('/v1', v1);


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});

const port = CONFIG.port || '3000';

//Listen to port
app.listen(port);
console.log("Listening to port: " + port);
