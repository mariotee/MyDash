const mongoose = require("mongoose")

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,  
      required: false,    
    },
    countryCode: {
      type: String,      
      required: false,    
    },
  },
  subscriptionStatus: {
    type: Boolean,
    required: true,
  }, 
})

module.exports = mongoose.model("Customer", CustomerSchema, "Customers")