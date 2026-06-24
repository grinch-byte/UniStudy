const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")

const authRoutes = require("./routes/authRoutes")
const groupsRoutes = require("./routes/groupsRoutes")
const sessionsRoutes = require("./routes/sessionsRoutes")

const app = express()
const port = process.env.PORT || 5000
const frontendDist = path.resolve(__dirname, "../../frontend/dist")

app.use(cors())
app.use(express.json())
app.use("/auth", authRoutes)
app.use("/groups", groupsRoutes)
app.use("/sessions", sessionsRoutes)

if (process.env.NODE_ENV === "production") {
  if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist))

    app.use((req, res) => {
      res.sendFile(path.join(frontendDist, "index.html"))
    })
  }
}

app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "production" && fs.existsSync(frontendDist)) {
    return res.sendFile(path.join(frontendDist, "index.html"))
  }
  res.json({ message: "UniStudy API Running" })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})