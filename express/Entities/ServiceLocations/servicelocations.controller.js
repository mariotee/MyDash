const ServiceLocationModel = require('./servicelocation.model.js')

class ServiceLocationsController
{ 
  /**
   * gets all ServiceLocations from database
   */
  async getAllServiceLocations() {
    return await ServiceLocationModel.find({});
  }
  
  /**
   * gets a ServiceLocation by its id
   * @param {ObjectId} id 
   */
  async getServiceLocationById(id) {
    return await ServiceLocationModel.findById(id)
  }

  /**
   * creates a ServiceLocation
   * @param {ServiceLocation} request
   */
  async createServiceLocation(request) {
    return await ServiceLocationModel.create(request)
  }

  /**
   * updates a ServiceLocation by id
   * @param {ObjectId} id 
   * @param {Object} updates 
   */
  async updateServiceLocationById(id, updates) {
    return await ServiceLocationModel.findByIdAndUpdate(id, updates, {
      new: true,
    })
  }

  /**
   * deletes a ServiceLocation by id
   * @param {ObjectId} id 
   */
  async deleteServiceLocationById(id) {
    return await ServiceLocationModel.findByIdAndDelete(id)
  }
}

module.exports = ServiceLocationsController