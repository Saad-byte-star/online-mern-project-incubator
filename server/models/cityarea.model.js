const mongoose = require('mongoose')
const cityareaSchema = new mongoose.Schema({
    "name":{
     type:mongoose.SchemaTypes.String
    },
    "cityid":{
     type:mongoose.SchemaTypes.ObjectId,
     ref:"cities"
    }
})
const Cityarea = mongoose.model("Cityarea",cityareaSchema)
module.exports = Cityarea