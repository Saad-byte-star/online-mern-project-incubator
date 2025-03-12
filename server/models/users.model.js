const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
    "name":{
     type:mongoose.SchemaTypes.String
    },
    "email":{
     type:mongoose.SchemaTypes.String
    },
    // "apikey":{
    //  type:mongoose.SchemaTypes.String
    // },
    // "loginid":{
    //  type:mongoose.SchemaTypes.String
    // },
    "password":{
     type:mongoose.SchemaTypes.String
    },
    // "securityquestion":{
    //  type:mongoose.SchemaTypes.String
    // },
    // "securityanswer":{
    //  type:mongoose.SchemaTypes.String
    // },
    "birthdate":{
     type:mongoose.SchemaTypes.Date
    },
    "contact":[{
     type:mongoose.SchemaTypes.Number  
    }],
    "image":{
     type:mongoose.SchemaTypes.String
    },
    "roles":{
     type:mongoose.SchemaTypes.ObjectId,
     ref: "Roles"
    }

})
const Users = mongoose.model("Users",usersSchema)
module.exports = Users
