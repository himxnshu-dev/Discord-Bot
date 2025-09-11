const express = require('express');
const app = express()
const urlRouter = require('./routes/url')
const {connectMongoDB} = require('./db/connection')
require('dotenv').config()
const PORT = 3000;
console.log("Attempting to connect with URI:", process.env.MONGODB_URI);

// Database
connectMongoDB(process.env.MONGODB_URI)
.then(() => console.log('DB Connected!'))
.catch(err => console.log('Error', err))

// Middlewares / Routes
app.use('/api', urlRouter);

app.listen(PORT, () => console.log('Server is running...'))