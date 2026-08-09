const express = require("express");

const router = express.Router();

const AIController = require("../controllers/AIController");

const { verifyToken } = require("../middlewares/VerifyToken");

router.post("/chat", verifyToken, AIController.chatWithAI);

module.exports = router;
