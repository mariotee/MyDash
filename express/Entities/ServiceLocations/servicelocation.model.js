const mongoose = require("mongoose")

const ServiceLocationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Running","Busy","Down"],
    required: true,
  },
})

module.exports = mongoose.model("ServiceLocation", ServiceLocationSchema, "ServiceLocations")