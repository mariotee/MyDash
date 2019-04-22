const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const Database = require("./database.js")
const routes = require("./routes/routes.js")
const port = process.env.PORT || 5000
const app = express()
//BASE SETUP
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(bodyParser.json())
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  optionsSuccessStatus: 200,
}))
//DATABASE
const database = new Database(process.env.CONN_STRING)
database.open()
//REGISTER ROUTES
app.use("/api", routes)
//LISTEN
app.listen(port)
//hooks
app.on("close", async () => {
  await database.close()
})
console.log("My Dash Express server listening on PORT " + port)