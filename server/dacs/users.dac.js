const Users = require('../models/users.model')
const jwt = require('jsonwebtoken')
const bcryptjs = require("bcryptjs")

class usersHandler {
    constructor() { }
    async addUsers(req, res) {
        try {
            console.log('string running');
            const { name, email, password, birthdate, contact, roles , image } = req.body;

            const added = await Users.create({
                name,
                email,
                password,
                birthdate,
                contact,
                image,
                roles,
            });

            if (added) return res.status(201).json(added);
            return res.status(400).json({ msg: "Unable to add Users" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: err.message });
        }
    }
    async getUsers(req, res) {
        try {
            const getted = await Users.find().populate("roles")
            if (getted) return res.status(200).json(getted)
            return res.status(400).json({ msg: 'Unable to find Users' })

        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }

    }
    async getUserById(req, res) {
        try {
            const id = req.params.id;
            const getted = await Users.findById(id).populate("roles")
            console.log('user found by Id :' , getted);
            if (getted) return res.status(200).json(getted)
            return res.status(400).json({ msg: 'Unable to find Users' })

        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }

    }
    async updateUsers(req, res) {
        try {
            const id = req.params.id
            const updated = await Users.findByIdAndUpdate(id, {
                name: req.body.name,
                email: req.body.email,
                apikey: req.body.apikey,
                loginid: req.body.loginid,
                password: req.body.password,
                securityquestion: req.body.securtyquestion,
                securityanswer: req.body.securtyanswer,
                birthdate: req.body.birthdate,
                contact: req.body.contact,
                image: req.body.image,
                roles: req.body.roles
            })
            if (updated) return res.status(200).json({ " Updated ": updated })
            return res.status(400).json({ msg: 'unable to update Users' })

        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }
    }
    async removeUsers(req, res) {
        try {
            const id = req.params.id
            const removed = await Users.findByIdAndDelete(id)
            if (removed) return res.status(200).json({ " Removed ": removed })
            return res.status(400).json({ msg: 'Unable to remove Users' })
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }
    }
    async create(req, res) {
        try {
            const obj = req.body;
            console.log(obj);
            obj.image = req.file.filename
            console.log('So the user to be Added is :' , obj);
            if (!obj.email || !obj.password || !obj.name) return res.status(400).json("invalid json data, email,password, fullName and role are required field");
            obj.password = await bcryptjs.hash(obj.password, 10);
            const created = await Users.create(obj);
            return res.status(201).json(created);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ msg: err.message })
        }
    }
    async login(req, res) {
        try {
            console.log(req.body)
            const currentuser = await Users.findOne({ email: req.body.email })
            if (currentuser) {
                if (bcryptjs.compare(req.body.password, currentuser.password)) {
                    const key = process.env.JWT_SECRET_KEY
                    const payLoad = { id: currentuser._id }
                    const token = jwt.sign(
                        payLoad,
                        key,
                        { expiresIn: '1h' }
                    )
                    return res.status(200).json({ token, currentuser })
                }
            }
            return res.status(404).json({ message: `Invalid email or password` })

        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ message: `Failed to get User` })


        }
    }

    // async authenticate(req,res,next){
    //     try{
    //      const token = req.header(process.env.JWT.TOKEN.HEADER)
    //      const tokendata = jwt.verify(token,process.env.JWT_SECRET_KEY)
    //      const user = await Users.findById(tokendata._id).populate("Role")
    //      if(user)  {
    //         console.log(1)
    //         req.user = user;
    //         return next;
    //      }
    //      return res.status(401).json({message:`Authentication failed`})


    //     }
    //     catch(error){
    //         console.log(error)
    //         return res.status(500).json({message: `Authentication failed` })  

    //     }
    // }

}
const UsersHandler = new usersHandler()
module.exports = UsersHandler;
