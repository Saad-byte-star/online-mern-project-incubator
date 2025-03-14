const mongoose = require('mongoose')
const citiesSchema = new mongoose.Schema({
    "name": {
        type: mongoose.SchemaTypes.String
    },
    "provincesid": {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Provinces"
    }
})
const Cities = mongoose.model("Cities", citiesSchema)
module.exports = Cities