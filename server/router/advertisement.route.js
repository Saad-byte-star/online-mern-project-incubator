const express = require('express');
const advertisementRoute = express.Router();
const AdvertisementHandler = require('../dacs/advertisement.dac');
const upload = require('../middlewares/fileUpload.middleware');
const { authenticate } = require('../middlewares/auth.middleware');
// Define advertisement routes
advertisementRoute.post('/', upload.single('image') , AdvertisementHandler.addAdvertisement);
advertisementRoute.get('/', AdvertisementHandler.getAdvertisement);
advertisementRoute.put('/aid/:id', authenticate ,upload.single('image') , AdvertisementHandler.updateAdvertisement); // REQUIREs VERIFICATION
advertisementRoute.delete('/aid/:id' , authenticate , AdvertisementHandler.removeAdvertisement); // REQUIREs VERIFICATION

// Include Middles at routes that require validations
module.exports = advertisementRoute;
