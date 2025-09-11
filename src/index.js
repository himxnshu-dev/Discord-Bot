const express = require('express');
const app = express()
const urlRouter = require('./routes/url')
const {connectMongoDB} = require('./db/connection')
const PORT = 3000;

// Database
connectMongoDB('mongodb+srv://discord-bot-url-shortener:mydiscordbotapp@cluster0.bjz00mg.mongodb.net/')
.then(() => console.log('DB Connected!'))
.catch(err => console.log('Error', err))

// Middlewares / Routes
app.use('/api', urlRouter);

app.listen(PORT, () => console.log('Server is running...'))