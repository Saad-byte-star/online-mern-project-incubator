const mongoose = require('mongoose')
const rolesSchema = new mongoose.Schema({
    "name":{
     type:mongoose.SchemaTypes.String
    }
})
const Roles = mongoose.model("Roles",rolesSchema)
module.exports = Roles