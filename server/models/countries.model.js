const mongoose = require('mongoose')
const countriesSchema = new mongoose.Schema({
    "name":{
     type:mongoose.SchemaTypes.String
    },
    "code":{
     type:mongoose.SchemaTypes.Number
    }
})
const Countries = mongoose.model("Countries",countriesSchema)
module.exports = Countries