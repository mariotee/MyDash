const IncompleteTaskModel = require('./incompletetask.model.js')

class IncompleteTasksController
{ 
  /**
   * gets all IncompleteTasks from database
   */
  async getAllIncompleteTasks() {
    return await IncompleteTaskModel.find({});
  }
  
  /**
   * gets a IncompleteTask by its id
   * @param {ObjectId} id 
   */
  async getIncompleteTaskById(id) {
    return await IncompleteTaskModel.findById(id)
  }

  /**
   * creates a IncompleteTask
   * @param {IncompleteTask} request
   */
  async createIncompleteTask(request) {
    return await IncompleteTaskModel.create(request)
  }

  /**
   * updates a IncompleteTask by id
   * @param {ObjectId} id 
   * @param {Object} updates 
   */
  async updateIncompleteTaskById(id, updates) {
    return await IncompleteTaskModel.findByIdAndUpdate(id, updates, {
      new: true,
    })
  }

  /**
   * deletes a IncompleteTask by id
   * @param {ObjectId} id 
   */
  async deleteIncompleteTaskById(id) {
    return await IncompleteTaskModel.findByIdAndDelete(id)
  }
}

module.exports = IncompleteTasksController