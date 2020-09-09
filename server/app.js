require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const apiRoutes = require('./routes')

const app = express()

mongoose.connect('mongodb://localhost:27017/Chat', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('Established connection to database!'))
    .catch(() => console.error('Error while connecting to MongoDB'))

const PORT = 5000 || process.env.PORT

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api', apiRoutes)

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
module.exports = server