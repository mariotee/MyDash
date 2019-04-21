const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const Database = require("./database.js")
const CONN_STRING = require("./secrets.js").CONN_STRING
const CLIENT_ORIGIN = require("./secrets.js").CLIENT_ORIGIN
const routes = require("./routes/routes.js")
const port = process.env.port || 54106
const app = express()
//BASE SETUP
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(bodyParser.json())
app.use(cors({
  origin: CLIENT_ORIGIN,
  optionsSuccessStatus: 200,
}))
//DATABASE
const database = new Database(CONN_STRING)
database.open()
//REGISTER ROUTES
app.use("/api", routes)
//LISTEN
app.listen(port)
//hooks
app.on("close", async () => {
  await database.close()
})
console.log("My Dash Express server listening on port: " + port)