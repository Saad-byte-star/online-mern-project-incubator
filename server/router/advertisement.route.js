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
const upload = require('../middlewares/fileUpload.middleware');

// Define advertisement routes
advertisementRoute.post('/', upload.single('image') , AdvertisementHandler.addAdvertisement);
advertisementRoute.get('/', AdvertisementHandler.getAdvertisement);
advertisementRoute.put('/aid/:id',upload.single('image') , AdvertisementHandler.updateAdvertisement); // REQUIREs VERIFICATION
advertisementRoute.delete('/aid/:id', AdvertisementHandler.removeAdvertisement); // REQUIREs VERIFICATION

// Include Middles at routes that require validations.

module.exports = advertisementRoute;
    