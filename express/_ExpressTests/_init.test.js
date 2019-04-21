const Database = require("../database.js")
const ConnectionString = require("../secrets.js").TEST_CONN_STRING
const databaseInstance = new Database(ConnectionString)

before(async () => {
  await databaseInstance.open()
})

after(async () => {
  await databaseInstance.close()    
})