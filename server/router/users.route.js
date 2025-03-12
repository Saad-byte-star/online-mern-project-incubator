const express = require('express')
const usersRoute = express.Router()
const UsersHandler = require('../dacs/users.dac')


usersRoute.post('/login', UsersHandler.login)
usersRoute.post('/signup', UsersHandler.create)
usersRoute.post('/', UsersHandler.addUsers)
usersRoute.get('/', UsersHandler.getUsers)
usersRoute.put('/uid/:id', UsersHandler.updateUsers)
usersRoute.delete('/uid/:id', UsersHandler.removeUsers)


module.exports = usersRoute;
