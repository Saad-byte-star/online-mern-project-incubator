const mongoose = require('mongoose')
const advertisementcategoriesSchema = new mongoose.Schema({
    "name":{
     type:mongoose.SchemaTypes.String
    },
    "image":{
        type:mongoose.SchemaTypes.String  
    },
    "quantity":{
     type:mongoose.SchemaTypes.Number, 

    }
})
const Categories = mongoose.model("Categories",advertisementcategoriesSchema)
module.exports = Categories