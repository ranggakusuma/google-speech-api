var express = require('express');
var cors = require('cors')
require('dotenv').config()
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const speechRouter = require('./routes/speechs')

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/speech',upload.single('data'), speechRouter)

// app.use('/users', usersRouter);


module.exports = app;
