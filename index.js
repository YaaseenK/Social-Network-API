const express = require ('express');
const mongoose = require('mongoose'); 
const db = require('./config/connection');
const routes = require('./routes')

const app = express();
const PORT = process.env.PORT || 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017/social-network-DB`;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.set("debug", true)

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    })
});