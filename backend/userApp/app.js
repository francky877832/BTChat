const express = require('express');
const { connectDB } = require('../shared/db');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


// connectDB();

app.use(cors());

// 🔹 Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// 🔹 Routes API
app.use('/api', routes);

/*
// 🔹 Static files (images) si nécessaire
const imagesPath = path.join(__dirname, '/assets/images').replace(/\\/g, '/');
app.use('/userApp/assets/images', express.static(imagesPath));

app.get('/userApp/assets/images/:imageName', (req, res) => {
  res.sendFile(path.join(imagesPath, req.params.imageName));
});
*/
module.exports = app;
