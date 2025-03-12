const Roles = require('../models/roles.model')
class rolesHandler{
    constructor(){}
    async addRoles(req,res){
        try {
            const { name } = req.body;
            const added = await Roles.create({
                name: name
            });
            if (added) return res.status(201).json({ " Added " : added })
            return res.status(400).json({msg : 'Unable to add Roles'})    
            
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }
    }
    async getRoles(req,res){
        try{
            const getted = await Roles.find();
            if(getted) return res.status(200).json(getted)
            return res.status(400).json({msg : 'Unable to find Roles'})

        }
        catch(err){
            console.log(err)
            res.status(500).json({ msg : err.message })
        }

    }
    async updateRoles(req,res){
        try{
        const id = req.params.id
        const updated = await Roles.findByIdAndUpdate(id , {
            name: req.body.name
        })
        if(updated) return res.status(200).json({ " Updated " : updated })
        return res.status(400).json({ msg : 'unable to update Roles' })   

        }
        catch(err){
        console.log(err)
        res.status(500).json({ msg : err.message })
    }
    }
    async removeRoles(req,res){
    try{
    const id = req.params.id
    const  removed = await Roles.findByIdAndDelete(id) 
    if(removed) return res.status(200).json({ " Removed " : removed })
    return res.status(400).json({msg:'Unable to remove Roles'})
}
catch(err){
    console.log(err)
    res.status(500).json({ msg : err.message })
}
}

}
const RolesHandler = new rolesHandler()
module.exports = RolesHandler;