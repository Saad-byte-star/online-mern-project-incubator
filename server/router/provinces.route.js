const express = require('express')
const provincesRoute = express.Router()
const ProvincesHandler = require('../dacs/provinces.dac')


provincesRoute.post('/',ProvincesHandler.addProvinces)
provincesRoute.get('/',ProvincesHandler.getProvinces)
provincesRoute.put('/pid/:id',ProvincesHandler.updateProvinces)
provincesRoute.delete('/pid/:id',ProvincesHandler.removeProvinces)


module.exports = provincesRoute;