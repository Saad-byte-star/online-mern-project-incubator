const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const cors = require("cors");
app.use(cors());
app.use(express.json({ limit : '2mb' }))
app.use(express.urlencoded({ limit : '2mb' , extended:true}))

// Serve static images files from the "public/images" directory
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

const rolesRoute = require('./router/roles.route')
const countriesRoute = require('./router/countries.route')
const typesRoute = require('./router/advertisementTypes.route')
const statusRoute = require('./router/advertisementStatus.route')
const categoriesRoute = require('./router/advertisementCategories.route')
const provincesRoute = require('./router/provinces.route')
const citiesRoute = require('./router/cities.route')
const cityareaRoute = require('./router/cityarea.route')
const usersRoute = require('./router/users.route')
// const advertisementRoute = require('./router/advertisement.route')
const advertisementRoute = require('./router/advertisement.route')

app.use('/api/v1/categories', categoriesRoute)
app.use('/api/v1/status', statusRoute)  
app.use('/api/v1/types', typesRoute)
app.use('/api/v1/countries', countriesRoute)
app.use('/api/v1/roles', rolesRoute)
app.use('/api/v1/provinces', provincesRoute)
app.use('/api/v1/cities', citiesRoute)
app.use('/api/v1/cityarea', cityareaRoute)
app.use('/api/v1/users', usersRoute)
app.use('/api/v1/advertisement', advertisementRoute)

app.get('*', (req, res) => {
    res.status(404).json({ msg: 'page not found' })
})
const port = process.env.PORT
const host = process.env.HOST

async function connectDB() {
    await mongoose.connect(process.env.CON_STR)
}

connectDB().then(() => {
    app.listen(port, host, () => {
        console.log(`App is Running on http://${host}:${port}`)
    })
})
    .catch((err) => {
        console.log(`Error Connecting to Database  : ${err}`)
    })

















