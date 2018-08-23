const DB = require('./DB.js')

class InMemDB extends DB {
  constructor() { 
    super()
    this.data = {
      identities: [],
      ideas: [],
      connections: [],
      identityId: 0, 
      focussedIdeaId: 0
    } 
    this.generateRandomData()
  }
  
  generateRandomData(numberOfIdentities, ideasPerIdentity, connectionsPerIdentity) {
    numberOfIdentities = numberOfIdentities || 3;
    ideasPerIdentity = ideasPerIdentity || 40;
    connectionsPerIdentity = connectionsPerIdentity || 60;
    for(var identityCounter = 0; identityCounter < numberOfIdentities; identityCounter++) {
      var identity = {
        id: identityCounter,
        name: 'Identity' + identityCounter
      }
      this.data.identities.push(identity)
      for(var ideaCounter = 0; ideaCounter < ideasPerIdentity; ideaCounter++) {
        var id = ideasPerIdentity * identityCounter + ideaCounter 
        var idea = {
          id: id, 
          name: 'Idea' + id,
          description: '',
          importance: Math.random()
        }          
        this.data.ideas.push(idea)
      }
      for(var connectionCounter = 0; connectionCounter < connectionsPerIdentity; connectionCounter++) {
        var connection = {
          id: connectionCounter + identityCounter * connectionsPerIdentity,
          from: Math.floor(Math.random() * ideasPerIdentity * numberOfIdentities),
          to: Math.floor(Math.random() * ideasPerIdentity * numberOfIdentities),
          weight: Math.random()
        }
        this.data.connections.push(connection)
      }
    }
  }

  async getIdentity() {
    return this.data.identities.find(i => i.id === this.data.identityId)
  }

  async getFocussedIdeaId() {
    return this.data.ideas.find(i => i.id === this.data.focussedIdeaId).id
  }

  async focusIdea(ideaId) {
    this.data.focussedIdeaId = ideaId
  }

  async searchIdea(searchString) {
    this.data.ideas.filter(i => i.name.includes(searchString))
  }

  async getNearbyIdeasAndConnections(centerIdeaId, depth) {
    var ideasIds = await this.getNearbyIdeasIds(centerIdeaId, depth)
    var connections = await this.getRelevantConnections(ideasIds)
    return {
      ideas: (new Array(...ideasIds)).map(ideaId => this.data.ideas.find(i => i.id === ideaId)), 
      connections: connections
    }
  }

  async getNearbyIdeasIds(centerIdeaId, depth) {
    var nearbyIdeas = new Set([centerIdeaId])
    for(var level = 0; level < depth; level++) {
      console.log('logging nearby ideas level ' + level)
      var previous = nearbyIdeas 
      nearbyIdeas = new Set(previous)
      this.data.connections.forEach(
        c => {
          if(previous.has(c.from)) {
            nearbyIdeas.add(c.to)
          }
          else if (previous.has(c.to)) {
            nearbyIdeas.add(c.from)
          }
        }
      )
    }
    return nearbyIdeas
  }

  async getRelevantConnections(ideasIds) {
    return this.data.connections.filter(c => {
      if(ideasIds.has(c.from) && ideasIds.has(c.to)){
        console.log(c.from + ' - ' + c.to)
        return true
      } else {
        return false
      }
    })
  }

  async addIdea() {
  }

  async addConnection() {
  }

  async updateIdea() {
  }

  async updateConnection() {
  }

  async rmIdea() {
  }

  async rmConnection() {
  }
}

module.exports = InMemDB
