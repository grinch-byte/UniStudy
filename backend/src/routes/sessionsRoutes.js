const express = require("express")
const router = express.Router()

const { createSession, getSessions } = require("../controllers/sessionsController")

router.post("/", createSession)
router.get("/", getSessions)

module.exports = router
