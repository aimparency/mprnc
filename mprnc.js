const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const apiRouter = require('./api-router.js');


var port = 3001
var clientFiles = '../mprnc-ui/public'

app.use('/api', apiRouter)

app.listen(port)
console.log("mprnc running on port " + port); 
