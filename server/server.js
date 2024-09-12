const express = require('express');
const { connectToDb } = require('./config/databse');
const app = express();

require('dotenv').config();

const port = process.env.PORT;

connectToDb();

const options = {
    origin: process.env.frontendURL,
    methods: ['POST', 'GET', 'DELETE'],
    credentials: true,
}
app.use(cors(options));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('The server is working fine');
})

app.listen(port, () => {
    console.log(`The server is running on localhost:${port}`);
})