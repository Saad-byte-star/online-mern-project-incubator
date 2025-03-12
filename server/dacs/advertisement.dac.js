const Advertisement = require('../models/advertisement.model')
class advertisementHandler{
    constructor(){}
    async addAdvertisement(req,res){
        try {
            const { name,price,description,startson,endson,postedbyid,statusid,typeid,categoryid,cityid} = req.body;
            const added = await Advertisement.create({
                name: name,
                price:price,
                description:description,
                startson:startson,
                endson:endson,
                postedbyid:postedbyid,
                statusid:statusid,
                typeid:typeid,
                categoryid:categoryid,
                cityid:cityid
            });
            if (added) return res.status(201).json({ " Added " : added })
            return res.status(400).json({msg : 'Unable to add Advertisement'})    
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }
    }
    async getAdvertisement(req,res){
        try{
            const getted = await Advertisement.find().populate("postedbyid").populate("statusid")
            if(getted) return res.status(200).json(getted)
            return res.status(400).json({msg : 'Unable to find Advertisement'})

        }
        catch(err){
            console.log(err)
            res.status(500).json({ msg : err.message })
        }

    }
    async updateAdvertisement(req,res){
        try{
        const id = req.params.id
        const updated = await Advertisement.findByIdAndUpdate(id , {
            name: req.body.name,
            price:req.body.price,
            description:req.body.description,
            startson:req.body.startson,
            endson:req.body.endson,
            postedbyid:req.body.postedbyid,
            statusid:req.body.statusid,
            typeid:req.body.typeid,
            categoryid:req.body.categoryid,
            cityid:req.body.cityid
        })
        if(updated) return res.status(200).json({ " Updated " : updated })
        return res.status(400).json({ msg : 'unable to update Advertisement' })   

        }
        catch(err){
        console.log(err)
        res.status(500).json({ msg : err.message })
    }
    }
    async removeAdvertisement(req,res){
    try{
    const id = req.params.id
    const  removed = await Advertisement.findByIdAndDelete(id) 
    if(removed) return res.status(200).json({ " Removed " : removed })
    return res.status(400).json({msg:'Unable to remove Advertisement'})
}
catch(err){
    console.log(err)
    res.status(500).json({ msg : err.message })
}
}
}
const AdvertisementHandler = new advertisementHandler()  
module.exports = AdvertisementHandler;