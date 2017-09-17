const express = require('express');
const app = express();
const bodyParser = require('body-parser')
var path = require('path');

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Temporary for demo purposes
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
require('./getDeviceData.js')(app);

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})