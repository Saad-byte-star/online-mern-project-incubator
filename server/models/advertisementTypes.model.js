const mongoose = require('mongoose')
const advertisementtypesSchema = new mongoose.Schema({
    "name":{
     type:mongoose.SchemaTypes.String
    }
})
const Types = mongoose.model("Type",advertisementtypesSchema)
module.exports = Types