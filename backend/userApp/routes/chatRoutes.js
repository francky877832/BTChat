const express = require('express');

const router = express.Router();

//import { queryAI } from "../controllers/chatController.js";

//console.log("Chat routes loaded", queryAI);
const { queryAI } = require("../controllers/chatController.js");

router.post("/ask", queryAI);

module.exports = router;
