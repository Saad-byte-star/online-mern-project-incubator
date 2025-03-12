const express = require('express')
const statusRoute = express.Router()
const StatusHandler = require('../dacs/advertisementStatus.dac')


statusRoute.post('/',StatusHandler.addStatus)
statusRoute.get('/',StatusHandler.getStatus)
statusRoute.put('/sid/:id',StatusHandler.updateStatus)
statusRoute.delete('/sid/:id',StatusHandler.removeStatus  )


module.exports = statusRoute;