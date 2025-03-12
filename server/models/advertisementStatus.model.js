const mongoose = require('mongoose')
const advertisementstatusSchema = new mongoose.Schema({
    "name":{
     type:mongoose.SchemaTypes.String
    }
})
const Status = mongoose.model("Status",advertisementstatusSchema)
module.exports = Status