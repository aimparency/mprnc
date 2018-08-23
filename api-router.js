const express = require('express')
const bodyParser = require('body-parser')

const Database = require('./InMemDB.js')

var apiRouter = express.Router()
var db = new Database()

apiRouter.use(bodyParser.urlencoded({extended: true}))
apiRouter.use(bodyParser.json())

apiRouter.use((req) => {
  console.log('Received api request ' + req.url)
  req.next()
})

apiRouter.get('/test', function(req, res){
	res.json({ message: "hey" })
})

apiRouter.get('/getInitInfo', async function(req, res) {
  var identity 
  var focussedIdeaId
  try{
    var identityPromise = db.getIdentity()
    var focussedIdeaIdPromise = db.getFocussedIdeaId()
    identity = await identityPromise
    focussedIdeaId = await focussedIdeaIdPromise
    console.log(identity)
    console.log(focussedIdeaId)
  }
  catch(err){
    res.json({
      success: false,
      info: err
    })
    return
  }
  res.json({ 
    name: identity.name,
    focussedIdeaId: focussedIdeaId
  })
})

apiRouter.get('/getNearbyIdeasAndConnections', async function(req, res) {
  var ideasAndConnections
  try{
    ideasAndConnections = await db.getNearbyIdeasAndConnections(Number(req.query.ideaId), 3)
  } catch(err) {
    console.log(err + '\n' + new Error().stack);
    res.json({
      success: false, 
      info: 'failed to get nearby ideas and connections, error: ' + err
    })
    return
  }
  console.log(ideasAndConnections)
  res.json(ideasAndConnections)
})
  
module.exports = apiRouter
