const Cityarea = require('../models/cityarea.model')
class cityareaHandler{
    constructor(){}
    async addCityarea(req,res){
        try {
            const { name,cityid } = req.body;
            const added = await Cityarea.create({
                name: name,
                cityid:cityid
                
            });
            if (added) return res.status(201).json({ " Added " : added })
            return res.status(400).json({msg : 'Unable to add Cityarea'})    
            
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }
    }
    async getCityarea(req,res){
        try{
            const getted = await Cityarea.find().populate("cityid");
            if(getted) return res.status(200).json(getted )
            return res.status(400).json({msg : 'Unable to find Cityarea'})

        }
        catch(err){
            console.log(err)
            res.status(500).json({ msg : err.message })
        }

    }
    async updateCityarea(req,res){
        try{
        const id = req.params.id
        const updated = await Cityarea.findByIdAndUpdate(id , {
            name: req.body.name,
            cityid: req.body.cityid
        })
        if(updated) return res.status(200).json({ " Updated " : updated })
        return res.status(400).json({ msg : 'unable to update Cityarea' })   

        }
        catch(err){
        console.log(err)
        res.status(500).json({ msg : err.message })
    }
    }
    async removeCityarea(req,res){
    try{
    const id = req.params.id
    const  removed = await Cityarea.findByIdAndDelete(id) 
    if(removed) return res.status(200).json({ " Removed " : removed })
    return res.status(400).json({msg:'Unable to remove Cityarea'})
}
catch(err){
    console.log(err)
    res.status(500).json({ msg : err.message })
}
}

}
const CityareaHandler = new cityareaHandler()
module.exports = CityareaHandler;