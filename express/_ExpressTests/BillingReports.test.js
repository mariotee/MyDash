const assert = require("assert")
const BillingReportModel = require("../Entities/BillingReports/billingreport.model.js")
const BillingReportsController = require("../Entities/BillingReports/billingreports.controller.js")

describe("BillingReports", () => {
  var posted = {}  

  it("validates a full BillingReport model", () => {
    let billingReportInstance = new BillingReportModel({
      dateIssued: new Date(12,12,12,12,12,12),
      customerName: "test-dude",
      usageInMegabytes: 0.8,
      unitPricePerMegabyteUsd: 0.12
    })

    let res = billingReportInstance.validate()

    assert.strictEqual(res.errors, undefined)
  })  
  
  it("returns a newly created BillingReport", async () => {
    const controller = new BillingReportsController()
    const date = Date.now()
    const billingReportToPost = {
      dateIssued: date,
      customerName: "test-dude",
      usageInMegabytes: 0.8,
      unitPricePerMegabyteUsd: 0.12
    }
    let res = await controller.createBillingReport(billingReportToPost)
    
    assert.strictEqual(res.customerName, billingReportToPost.customerName)
    assert.strictEqual(Date(res.dateIssued), Date(billingReportToPost.dateIssued))
    assert.strictEqual(res.usageInMegabytes, billingReportToPost.usageInMegabytes)
    assert.strictEqual(res.unitPricePerMegabyteUsd, billingReportToPost.unitPricePerMegabyteUsd)
    posted = res
  })

  it("returns all BillingReports", async () => {
    const controller = new BillingReportsController()
    let res = await controller.getAllBillingReports()
    
    assert.strictEqual(res.length, 1)
  })

  it("returns a BillingReport that was retrieved by id", async () => {
    const controller = new BillingReportsController()
    let res = await controller.getBillingReportById(String(posted._id))
    
    assert.strictEqual(res.customerName, posted.customerName)
    assert.strictEqual(Date(res.dateIssued), Date(posted.dateIssued))
    assert.strictEqual(res.usageInMegabytes, posted.usageInMegabytes)
    assert.strictEqual(res.unitPricePerMegabyteUsd, posted.unitPricePerMegabyteUsd)
  })

  it("returns a BillingReport that was retrieved by customer name", async () => {
    const controller = new BillingReportsController()
    let res = await controller.getBillingReportsByCustomerName(posted.customerName)
    res = res[0]
    assert.strictEqual(res.customerName, posted.customerName)
    assert.strictEqual(Date(res.dateIssued), Date(posted.dateIssued))
    assert.strictEqual(res.usageInMegabytes, posted.usageInMegabytes)
    assert.strictEqual(res.unitPricePerMegabyteUsd, posted.unitPricePerMegabyteUsd)
  })

  it("updates a BillingReport by id", async () => {
    const controller = new BillingReportsController()
    let res = await controller.updateBillingReportById(String(posted._id), {
      unitPricePerMegabyteUsd: 0.122,
    })
    
    assert.strictEqual(res.customerName, posted.customerName)
    assert.strictEqual(Date(res.dateIssued), Date(posted.dateIssued))
    assert.strictEqual(res.usageInMegabytes, posted.usageInMegabytes)
    assert.strictEqual(res.unitPricePerMegabyteUsd, 0.122)
    posted.unitPricePerMegabyteUsd = 0.122
  })

  it("deletes a BillingReport by id", async () => {
    const controller = new BillingReportsController()
    let res = await controller.deleteBillingReportById(String(posted.id))
    
    assert.strictEqual(res.customerName, posted.customerName)
    assert.strictEqual(Date(res.dateIssued), Date(posted.dateIssued))
    assert.strictEqual(res.usageInMegabytes, posted.usageInMegabytes)
    assert.strictEqual(res.unitPricePerMegabyteUsd, posted.unitPricePerMegabyteUsd)
  })
})