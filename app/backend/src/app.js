require('express-async-errors')
const express = require('express')
const cors = require('cors')
const yup = require('yup')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/shoppinglists', require('./routes/shoppinglist.routes'))

app.use((error, req, res, next) => {
    if (error instanceof yup.ValidationError) {
        res.status(422).json(error.errors)
    } else {
        console.error(error)
        res.sendStatus(500)
    }
})

module.exports = app