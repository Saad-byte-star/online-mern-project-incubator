const express = require('express')
const categoriesRoute = express.Router()
const CategoriesHandler = require('../dacs/advertisementCategories.dac')


categoriesRoute.post('/',CategoriesHandler.addCategories)
categoriesRoute.get('/',CategoriesHandler.getCategories)
categoriesRoute.put('/cid/:id',CategoriesHandler.updateCategories)
categoriesRoute.delete('/cid/:id',CategoriesHandler.removeCategories)


module.exports =  categoriesRoute ;