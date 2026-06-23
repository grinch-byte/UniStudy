const express = require("express")
const cors = require("cors")
const path = require("path")

const authRoutes = require("./routes/authRoutes")

const app = express()
const port = process.env.PORT || 5000
const apiUrl = process.env.VITE_API_URL || ''

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)

const frontendDist = path.resolve(__dirname, "../../frontend/dist")
if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendDist))

  app.use((req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"))
  })
}

app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.sendFile(path.join(frontendDist, "index.html"))
  }
  res.json({ message: "UniStudy API Running" })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})