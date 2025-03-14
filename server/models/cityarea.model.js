const mongoose = require('mongoose')
const cityareaSchema = new mongoose.Schema({
    "name":{
     type:mongoose.SchemaTypes.String
    },
    "cityid":{
     type:mongoose.SchemaTypes.ObjectId,
     ref:"Cities"
    }
})
const Cityarea = mongoose.model("Cityarea",cityareaSchema)
module.exports = Cityarea