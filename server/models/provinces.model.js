const mongoose = require('mongoose')
const provincesSchema = new mongoose.Schema({
    "name":{
     type:mongoose.SchemaTypes.String
    },
    "countryid":{
     type:mongoose.SchemaTypes.ObjectId,
     ref:"Countries"
    }
})
const Provinces = mongoose.model("Provinces",provincesSchema)
module.exports = Provinces