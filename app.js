const express = require('express')
const cors = require('cors');
const path = require('path');
const userpaths = require('./routes/userRoutes')
const PORT = 5000;
const mongoose = require('mongoose');
const passport = require('passport');

var app = express()

require('./configuration/db')

app.use(passport.initialize());
require('./models/User');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

require('./configuration/passport')(passport);

app.use(cors())
app.use(require('./routes'));

console.log('running at port ' + PORT);

app.listen(PORT)