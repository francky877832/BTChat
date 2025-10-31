const express = require('express');
const router = express.Router();


const chatRoutes = require('./chatRoutes');


router.use('/chat', chatRoutes);

console.log("Chat routes mounted");

module.exports = router;


