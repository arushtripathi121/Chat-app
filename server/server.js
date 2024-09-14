const express = require('express');
const { connectToDb } = require('./config/databse');
const app = express();
const cookie_parser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const router = require('./routes/appRouter');

const cloudinary = require('./config/cloudinary');
cloudinary.connectToCloudinary();

const port = process.env.PORT;

connectToDb();

const options = {
    origin: process.env.frontendURL,
    methods: ['POST', 'GET', 'DELETE'],
    credentials: true,
}
app.use(cors(options));

app.use(express.json());

app.use(cookie_parser());

app.get('/', (req, res) => {
    res.send('The server is working fine');
})

app.use('/', router);

app.listen(port, () => {
    console.log(`The server is running on localhost:${port}`);
})