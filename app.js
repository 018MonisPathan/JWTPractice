const express = require('express')
const cors = require('cors');
const path = require('path');

const PORT = 5000;

var app = express()

require('./configuration/db')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors)

console.log('running at port ' + PORT);

app.listen(PORT)