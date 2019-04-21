const CompletedTaskModel = require('./completedtask.model.js')

class CompletedTasksController
{ 
  /**
   * gets all CompletedTasks from database
   */
  async getAllCompletedTasks() {
    return await CompletedTaskModel.find({});
  }
  
  /**
   * gets a CompletedTask by its id
   * @param {ObjectId} id 
   */
  async getCompletedTaskById(id) {
    return await CompletedTaskModel.findById(id)
  }

  /**
   * creates a CompletedTask
   * @param {CompletedTask} request
   */
  async createCompletedTask(request) {
    return await CompletedTaskModel.create(request)
  }

  /**
   * updates a CompletedTask by id
   * @param {ObjectId} id 
   * @param {Object} updates 
   */
  async updateCompletedTaskById(id, updates) {
    return await CompletedTaskModel.findByIdAndUpdate(id, updates, {
      new: true,
    })
  }

  /**
   * deletes a CompletedTask by id
   * @param {ObjectId} id 
   */
  async deleteCompletedTaskById(id) {
    return await CompletedTaskModel.findByIdAndDelete(id)
  }
}

module.exports = CompletedTasksController