const Database = require("../database.js")
const secrets = require("../nodemon.json")
const databaseInstance = new Database(secrets.env.TEST_CONN_STRING)

before(async () => {
  await databaseInstance.open()
})

after(async () => {
  await databaseInstance.close()    
})