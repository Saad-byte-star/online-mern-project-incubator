const Advertisement = require('../models/advertisement.model')
const mongoose = require('mongoose')
class advertisementHandler {
    constructor() { }
    async addAdvertisement(req, res) {
        try {
            console.log('Recieved  : ', req.body)
            const { name, price, description, startson, endson, postedbyid, statusid, typeid, categoryid, cityid } = req.body;
            const added = await Advertisement.create({
                name: name,
                price: price,
                description: description,
                startson: startson,
                endson: endson,
                postedbyid: postedbyid,
                statusid: statusid,
                typeid: typeid,
                categoryid: categoryid,
                cityid: cityid,
                image: req?.file?.filename
            });
            console.log(added)
            if (added) return res.status(201).json({ " Added ": added })
            return res.status(400).json({ msg: 'Unable to add Advertisement' })
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }
    }
    async getAdvertisement(req, res) {
        try {
            const getted = await Advertisement.find().populate("postedbyid").populate("cityid").populate("typeid").populate("statusid")
            if (getted) return res.status(200).json(getted)
            console.log(getted)
            return res.status(400).json({ msg: 'Unable to find Advertisement' })

        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }

    }
    async updateAdvertisement(req, res) {
        try {
            const id = req.params.id;
            const updates = { ...req.body }; // Directly take only provided fields
            console.log(updates);

            if (req.file?.filename) {
                updates.image = req.file.filename; // If image is uploaded, update it
            }
    
            const updatedAd = await Advertisement.findByIdAndUpdate(id, updates, { new: true });
    
            if (updatedAd) {
                return res.status(200).json({ message: "Advertisement updated", updatedAd });
            } else {
                return res.status(400).json({ msg: "Unable to update advertisement" });
            }
        } catch (err) {
            console.error("Error updating advertisement:", err);
            res.status(500).json({ msg: err.message });
        }
    }
    
    async removeAdvertisement(req, res) {
        try {
            const id = req.params.id
            const removed = await Advertisement.findByIdAndDelete(id)
            if (removed) return res.status(200).json({ " Removed ": removed })
            return res.status(400).json({ msg: 'Unable to remove Advertisement' })
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }
    }
}
const AdvertisementHandler = new advertisementHandler()
module.exports = AdvertisementHandler;