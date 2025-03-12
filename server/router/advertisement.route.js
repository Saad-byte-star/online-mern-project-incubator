// const express = require('express')
// const advertisementRoute = express.Router()
// const AdvertisementHandler = require('../dacs/advertisement.dac')


// advertisementRoute.post('/', AdvertisementHandler.addAdvertisement)
// advertisementRoute.get('/', AdvertisementHandler.getAdvertisement)
// advertisementRoute.put('/aid/:id', AdvertisementHandler.updateAdvertisement)
// advertisementRoute.delete('/aid/:id', AdvertisementHandler.removeAdvertisement)


// module.exports = advertisementRoute;

const express = require('express');
const advertisementRoute = express.Router();
const AdvertisementHandler = require('../dacs/advertisement.dac');

// Define advertisement routes
advertisementRoute.post('/', AdvertisementHandler.addAdvertisement);
advertisementRoute.get('/', AdvertisementHandler.getAdvertisement);
advertisementRoute.put('/aid/:id', AdvertisementHandler.updateAdvertisement);
advertisementRoute.delete('/aid/:id', AdvertisementHandler.removeAdvertisement);

module.exports = advertisementRoute;
