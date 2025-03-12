const mongoose = require('mongoose')
const advertisementSchema = new mongoose.Schema({
    "name":{
     type:mongoose.SchemaTypes.String
    },
    "price":{
     type:mongoose.SchemaTypes.Number
    },
    "description":{
     type:mongoose.SchemaTypes.String
    },  
    "startson":{
     type:mongoose.SchemaTypes.Date
    },  
    "endson":{
     type:mongoose.SchemaTypes.Date
    },
    "postedbyid":{
     type:mongoose.SchemaTypes.ObjectId,
     ref:"Users"
    },
    "statusid":{
     type:mongoose.SchemaTypes.ObjectId,
     ref:"Status"
    },
    "typeid":{
     type:mongoose.SchemaTypes.ObjectId,
     ref:"Types"
    },
    "categoryid":{
     type:mongoose.SchemaTypes.ObjectId,
     ref:"Categories"
    },
    "cityid":{
     type:mongoose.SchemaTypes.ObjectId,
     ref:"Cityarea"
    },
   
 }
// ,{
//     collection:'advertisement'
// }
)
const Advertisement = mongoose.model("Advertisement",advertisementSchema)
module.exports = Advertisement

