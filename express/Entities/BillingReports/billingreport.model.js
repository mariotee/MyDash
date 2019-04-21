const mongoose = require("mongoose")

const BillingReportSchema = new mongoose.Schema({
  dateIssued: {
    type: Date,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  usageInMegabytes: {
    type: Number,
    required: true,
  },
  unitPricePerMegabyteUsd: {
    type: Number,
    required: true,
  },  
})

module.exports = mongoose.model("BillingReport", BillingReportSchema, "BillingReports")