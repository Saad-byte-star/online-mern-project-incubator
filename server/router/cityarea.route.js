const express = require('express')
const cityareaRoute = express.Router()
const CityareaHandler = require('../dacs/cityarea.dac')


cityareaRoute.post('/',CityareaHandler.addCityarea)
cityareaRoute.get('/',CityareaHandler.getCityarea)
cityareaRoute.put('/cid/:id',CityareaHandler.updateCityarea)
cityareaRoute.delete('/cid/:id',CityareaHandler.removeCityarea)


module.exports = cityareaRoute;