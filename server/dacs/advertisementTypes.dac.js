const Types = require('../models/advertisementTypes.model')
class typesHandler{
    constructor(){}
    async addTypes(req,res){
        try {
            const { name } = req.body;
            const added = await Types.create({
                name: name
            });
            if (added) return res.status(201).json({ " Added " : added })
            return res.status(400).json({msg : 'Unable to add Types'})    
            
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }
    }
    async getTypes(req,res){
        try{
            const getted = await Types.find()
            if(getted) return res.status(200).json(getted )
            return res.status(400).json({msg : 'Unable to find Types'})

        }
        catch(err){
            console.log(err)
            res.status(500).json({ msg : err.message })
        }

    }
    async updateTypes(req,res){
        try{
        const id = req.params.id
        const updated = await Types.findByIdAndUpdate(id , {
            name: req.body.name
        })
        if(updated) return res.status(200).json({ " Updated " : updated })
        return res.status(400).json({ msg : 'unable to update Types' })   

        }
        catch(err){
        console.log(err)
        res.status(500).json({ msg : err.message })
    }
    }
    async removeTypes(req,res){
    try{
    const id = req.params.id
    const  removed = await Types.findByIdAndDelete(id) 
    if(removed) return res.status(200).json({ " Removed " : removed })
    return res.status(400).json({msg:'Unable to remove Types'})
}
catch(err){
    console.log(err)
    res.status(500).json({ msg : err.message })
}
}

}
const TypesHandler = new typesHandler()
module.exports = TypesHandler;