const Status = require('../models/advertisementStatus.model')
class statusHandler{
    constructor(){}
    async addStatus(req,res){
        try {
            const { name } = req.body;
            const added = await Status.create({
                name: name
            });
            if (added) return res.status(201).json({ " Added " : added })
            return res.status(400).json({msg : 'Unable to add Status'})    
            
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }
    }
    async getStatus(req,res){
        try{
            const getted = await Status.find()
            if(getted) return res.status(200).json(getted)
            return res.status(400).json({msg : 'Unable to find Status'})

        }
        catch(err){
            console.log(err)
            res.status(500).json({ msg : err.message })
        }

    }
    async updateStatus(req,res){
        try{
        const id = req.params.id
        const updated = await Status.findByIdAndUpdate(id , {
            name: req.body.name
        })
        if(updated) return res.status(200).json({ " Updated " : updated })
        return res.status(400).json({ msg : 'unable to update Status' })   

        }
        catch(err){
        console.log(err)
        res.status(500).json({ msg : err.message })
    }
    }
    async removeStatus(req,res){
    try{
    const id = req.params.id
    const  removed = await Status.findByIdAndDelete(id) 
    if(removed) return res.status(200).json({ " Removed " : removed })
    return res.status(400).json({msg:'Unable to remove Status'})
}
catch(err){
    console.log(err)
    res.status(500).json({ msg : err.message })
}
}

}
const StatusHandler = new statusHandler()
module.exports = StatusHandler;