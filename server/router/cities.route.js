const express = require('express')
const citiesRoute = express.Router()
const ProvincesHandler = require('../dacs/cities.dac')


citiesRoute.post('/',ProvincesHandler.addCities)
citiesRoute.get('/',ProvincesHandler.getCities)
citiesRoute.put('/cid/:id',ProvincesHandler.updateCities)
citiesRoute.delete('/cid/:id',ProvincesHandler.removeCities)


module.exports = citiesRoute;