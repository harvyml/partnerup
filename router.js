const express = require("express")
const app = express()
const router = express.Router()
const fs = require("fs")
//static files
app.use("/public", express.static("public"))
const index = fs.readFileSync("./public/index.html", "utf8")


router.get("/", (req, res) => {
    res.send(index)
})

module.exports = router