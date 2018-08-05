const express = require('express')
const bodyParser = require('body-parser')

var apiRouter = express.Router(); 

apiRouter.use(bodyParser.urlencoded({extended: true}))
apiRouter.use(bodyParser.json())
apiRouter.get('/test', function(req, res){
	res.json({ message: "hey" })
})

module.exports = apiRouter
