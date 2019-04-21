const CustomerModel = require('./customer.model.js')

class CustomersController
{ 
  /**
   * gets all Customers from database
   */
  async getAllCustomers() {
    return await CustomerModel.find({});
  }
  
  /**
   * gets a Customer by its id
   * @param {ObjectId} id 
   */
  async getCustomerById(id) {
    return await CustomerModel.findById(id)
  }

  /**
   * creates a Customer
   * @param {Customer} request
   */
  async createCustomer(request) {
    return await CustomerModel.create(request)
  }

  /**
   * updates a Customer by id
   * @param {ObjectId} id 
   * @param {Object} updates 
   */
  async updateCustomerById(id, updates) {
    return await CustomerModel.findByIdAndUpdate(id, updates, {
      new: true,
    })
  }

  /**
   * deletes a Customer by id
   * @param {ObjectId} id 
   */
  async deleteCustomerById(id) {
    return await CustomerModel.findByIdAndDelete(id)
  }
}

module.exports = CustomersController