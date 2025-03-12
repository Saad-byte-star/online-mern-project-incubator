const Provinces = require('../models/provinces.model')
class provincesHandler{
    constructor(){}
    async addProvinces(req,res){
        try {
            const { name,countryid } = req.body;
            const added = await Provinces.create({
                name: name,
                countryid:countryid
            });
            if (added) return res.status(201).json({ " Added " : added })
            return res.status(400).json({msg : 'Unable to add Provinces'})    
            
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }
    }
    async getProvinces(req,res){
        try{
            const getted = await Provinces.find().populate("countryid");
            if(getted) return res.status(200).json(getted)
            return res.status(400).json({msg : 'Unable to find Provinces'})

        }
        catch(err){
            console.log(err)
            res.status(500).json({ msg : err.message })
        }

    }
    async updateProvinces(req,res){
        try{
        const id = req.params.id
        const updated = await Provinces.findByIdAndUpdate(id , {
            name: req.body.name,
            countryid:req.body.countryid
        })
        if(updated) return res.status(200).json({ " Updated " : updated })
        return res.status(400).json({ msg : 'unable to update Provinces' })   

        }
        catch(err){
        console.log(err)
        res.status(500).json({ msg : err.message })
    }
    }
    async removeProvinces(req,res){
    try{
    const id = req.params.id
    const  removed = await Provinces.findByIdAndDelete(id) 
    if(removed) return res.status(200).json({ " Removed " : removed })
    return res.status(400).json({msg:'Unable to remove Provinces'})
}
catch(err){
    console.log(err)
    res.status(500).json({ msg : err.message })
}
}

}
const ProvincesHandler = new provincesHandler()
module.exports = ProvincesHandler;