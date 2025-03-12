const express = require('express')
const typesRoute = express.Router()
const TypesHandler = require('../dacs/advertisementTypes.dac')


typesRoute.post('/',TypesHandler.addTypes)
typesRoute.get('/',TypesHandler.getTypes)
typesRoute.put('/tid/:id',TypesHandler.updateTypes)
typesRoute.delete('/tid/:id',TypesHandler.removeTypes)


module.exports = typesRoute;