const express = require('express');
const app = express()
const urlRouter = require('./routes/url')
const {connectMongoDB} = require('./db/connection')
require('dotenv').config()

// Database
connectMongoDB(process.env.MONGODB_URI)
.then(() => console.log('DB Connected!'))
.catch(err => console.log('Error', err))

// Middlewares / Routes
app.use(express.json())
app.use('/api', urlRouter);

app.listen(process.env.PORT, () => console.log('Server is running...'))