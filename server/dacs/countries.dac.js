const Countries = require('../models/countries.model')
class countriesHandler{
    constructor(){}
    async addCountries(req,res){
        try {
            const { name,code } = req.body;
            const added = await Countries.create({
                name: name,
                code: code
            });
            if (added) return res.status(201).json({ " Added " : added })
            return res.status(400).json({msg : 'Unable to add Countries'})    
            
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }
    }
    async getCountries(req,res){
        try{
            const getted = await Countries.find();
            if(getted) return res.status(200).json(getted)
            return res.status(400).json({msg : 'Unable to find Countries'})

        }
        catch(err){
            console.log(err)
            res.status(500).json({ msg : err.message })
        }

    }
    async updateCountries(req,res){
        try{
        const id = req.params.id
        const updated = await Countries.findByIdAndUpdate(id , {
            name: req.body.name,
            code: req.body.code
        })
        if(updated) return res.status(200).json({ " Updated " : updated })
        return res.status(400).json({ msg : 'unable to update Countries' })   

        }
        catch(err){
        console.log(err)
        res.status(500).json({ msg : err.message })
    }
    }
    async removeCountries(req,res){
    try{
    const id = req.params.id
    const  removed = await Countries.findByIdAndDelete(id) 
    if(removed) return res.status(200).json({ " Removed " : removed })
    return res.status(400).json({msg:'Unable to remove Countries'})
}
catch(err){
    console.log(err)
    res.status(500).json({ msg : err.message })
}
}

}
const CountriesHandler = new countriesHandler()
module.exports = CountriesHandler;