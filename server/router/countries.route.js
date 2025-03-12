const express = require('express')
const countriesRoute = express.Router()
const CountriesHandler = require('../dacs/countries.dac')


countriesRoute.post('/',CountriesHandler.addCountries)
countriesRoute.get('/',CountriesHandler.getCountries)
countriesRoute.put('/cid/:id',CountriesHandler.updateCountries)
countriesRoute.delete('/cid/:id',CountriesHandler.removeCountries)


module.exports = countriesRoute;