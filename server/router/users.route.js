const express = require("express");
const usersRoute = express.Router();

const upload = require('../middlewares/fileUpload.middleware');

const UsersHandler = require("../dacs/users.dac");

usersRoute.post("/signup", upload.single('image') , UsersHandler.create);
usersRoute.post("/login", UsersHandler.login);
usersRoute.post("/", UsersHandler.addUsers);
usersRoute.get("/", UsersHandler.getUsers);
usersRoute.get("/uid/:id", UsersHandler.getUserById);
usersRoute.put("/uid/:id", UsersHandler.updateUsers);
usersRoute.delete("/uid/:id", UsersHandler.removeUsers);

module.exports = usersRoute;
