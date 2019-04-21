const mongoose = require("mongoose")

module.exports = class Database
{
  constructor(connectionString) {
    if (typeof connectionString !== "string") {
      throw new Error("connection string is not of type string")
    }
    
    this.connectionString = connectionString
  }

  async open() {
    await mongoose.connect(this.connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,      
    })    
  }

  async close() {
    await mongoose.connection.close()
  }
}