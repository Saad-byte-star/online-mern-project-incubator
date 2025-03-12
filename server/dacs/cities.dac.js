const Cities = require('../models/cities.model')
class citiesHandler{
    constructor(){}
    async addCities(req,res){
        try {
            const { name,provincesid } = req.body;
            const added = await Cities.create({
                name: name,
                provincesid:provincesid
            });
            if (added) return res.status(201).json({ " Added " : added })
            return res.status(400).json({msg : 'Unable to add Cities'})    
            
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }
    }
    async getCities(req,res){
        try{
            const getted = await Cities.find().populate("provincesid");
            if(getted) return res.status(200).json(getted)
            return res.status(400).json({msg : 'Unable to find Cities'})

        }
        catch(err){
            console.log(err)
            res.status(500).json({ msg : err.message })
        }

    }
    async updateCities(req,res){
        try{
        const id = req.params.id
        const updated = await Cities.findByIdAndUpdate(id , {
            name: req.body.name,
            provincesid:req.body.provincesid
        })
        if(updated) return res.status(200).json({ " Updated " : updated })
        return res.status(400).json({ msg : 'unable to update Cities' })   

        }
        catch(err){
        console.log(err)
        res.status(500).json({ msg : err.message })
    }
    }
    async removeCities(req,res){
    try{
    const id = req.params.id
    const  removed = await Cities.findByIdAndDelete(id) 
    if(removed) return res.status(200).json({ " Removed " : removed })
    return res.status(400).json({msg:'Unable to remove Cities'})
}
catch(err){
    console.log(err)
    res.status(500).json({ msg : err.message })
}
}

}
const CitiesHandler = new citiesHandler()
module.exports = CitiesHandler;