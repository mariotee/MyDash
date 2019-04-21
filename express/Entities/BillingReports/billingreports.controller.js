const BillingReportModel = require('./billingreport.model.js')

class BillingReportsController
{ 
  /**
   * gets all BillingReports from database
   */
  async getAllBillingReports() {
    return await BillingReportModel.find({});
  }

  /**
   * gets a BillingReport by customer name
   * @param {String} customerName
   */
  async getBillingReportsByCustomerName(customerName) {
    return await BillingReportModel.find({
      customerName: customerName
    })
  }
  
  /**
   * gets a BillingReport by its id
   * @param {ObjectId} id 
   */
  async getBillingReportById(id) {
    return await BillingReportModel.findById(id)
  }  

  /**
   * creates a BillingReport
   * @param {BillingReport} request
   */
  async createBillingReport(request) {
    return await BillingReportModel.create(request)
  }

  /**
   * updates a BillingReport by id
   * @param {ObjectId} id 
   * @param {Object} updates 
   */
  async updateBillingReportById(id, updates) {
    return await BillingReportModel.findByIdAndUpdate(id, updates, {
      new: true,
    })
  }

  /**
   * deletes a BillingReport by id
   * @param {ObjectId} id 
   */
  async deleteBillingReportById(id) {
    return await BillingReportModel.findByIdAndDelete(id)
  }
}

module.exports = BillingReportsController