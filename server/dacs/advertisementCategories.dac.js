const Categories = require('../models/advertisementCategories.model')
class categoriesHandler{
    constructor(){}
    async addCategories(req,res){
        try {
            const { name,image, quantity } = req.body;
            const added = await Categories.create({
                name: name,
                image:image,
                quantity:quantity
            });
            if (added) return res.status(201).json({ " Added " : added })
            return res.status(400).json({msg : 'Unable to add Categories'})    
            
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: err.message })
        }
    }
    async getCategories(req,res){
        try{
            const getted = await Categories.find()
            if(getted) return res.status(200).json(getted )
            return res.status(400).json({msg : 'Unable to find Categories'})

        }
        catch(err){
            console.log(err)
            res.status(500).json({ msg : err.message })
        }

    }
    async updateCategories(req,res){
        try{
        const id = req.params.id
        const updated = await Categories.findByIdAndUpdate(id , {
            name: req.body.name,
            image:req.body.image,
            quantity:req.body.quantity
        })
        if(updated) return res.status(200).json({ " Updated " : updated })
        return res.status(400).json({ msg : 'unable to update Categories' })   

        }
        catch(err){
        console.log(err)
        res.status(500).json({ msg : err.message })
    }
    }
    async removeCategories(req,res){
    try{
    const id = req.params.id
    const  removed = await Categories.findByIdAndDelete(id) 
    if(removed) return res.status(200).json({ " Removed " : removed })
    return res.status(400).json({msg:'Unable to remove Categories'})
}
catch(err){
    console.log(err)
    res.status(500).json({ msg : err.message })
}
}

}
const CategoriesHandler = new categoriesHandler()
module.exports = CategoriesHandler;