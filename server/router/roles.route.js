const express = require('express')
const rolesRoute = express.Router()
const RolesHandler = require('../dacs/roles.dac')


rolesRoute.post('/',RolesHandler.addRoles)
rolesRoute.get('/',RolesHandler.getRoles)
rolesRoute.put('/rid/:id',RolesHandler.updateRoles)
rolesRoute.delete('/rid/:id',RolesHandler.removeRoles)


module.exports = rolesRoute;