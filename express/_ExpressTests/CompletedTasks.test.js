const assert = require("assert")
const CompletedTaskModel = require("../Entities/CompletedTasks/completedtask.model.js")
const CompletedTasksController = require("../Entities/CompletedTasks/completedtasks.controller.js")

describe("CompletedTasks", () => {
  var posted = {}  

  it("validates a full CompletedTask model", () => {
    let completedTaskInstance = new CompletedTaskModel({
      title: "test-title",
      dateCompleted: new Date(12,12,12,12,12,12),      
    })

    let res = completedTaskInstance.validate()

    assert.strictEqual(res.errors, undefined)
  })  
  
  it("returns a newly created CompletedTask", async () => {
    const controller = new CompletedTasksController()
    const date = Date.now()
    const completedTaskToPost = {
      title: "test post",
      dateCompleted: date,      
    }
    let res = await controller.createCompletedTask(completedTaskToPost)    
    
    assert.strictEqual(res.title, completedTaskToPost.title)
    assert.strictEqual(Date(res.dateCompleted), Date(completedTaskToPost.dateCompleted))
    assert.strictEqual(res.priority, completedTaskToPost.priority)
    posted = res
  })

  it("returns all CompletedTasks", async () => {
    const controller = new CompletedTasksController()
    let res = await controller.getAllCompletedTasks()
    
    assert.strictEqual(res.length, 1)
  })

  it("returns a CompletedTask that was retrieved by id", async () => {
    const controller = new CompletedTasksController()
    let res = await controller.getCompletedTaskById(String(posted._id))
    
    assert.strictEqual(res.title, posted.title)
    assert.strictEqual(Date(res.dateCompleted), Date(posted.dateCompleted))
    assert.strictEqual(res.priority, posted.priority)
  })

  it("updates a CompletedTask by id", async () => {
    const controller = new CompletedTasksController()
    let res = await controller.updateCompletedTaskById(String(posted._id), {
      title: "new title",
    })
    
    assert.strictEqual(res.title, "new title")
    assert.strictEqual(Date(res.dateCompleted), Date(posted.dateCompleted))
    assert.strictEqual(res.priority, posted.priority)
    posted.title = "new title"
  })

  it("deletes a CompletedTask by id", async () => {
    const controller = new CompletedTasksController()
    let res = await controller.deleteCompletedTaskById(String(posted.id))
    
    assert.strictEqual(res.title, posted.title)
    assert.strictEqual(Date(res.dateCompleted), Date(posted.dateCompleted))
    assert.strictEqual(res.priority, posted.priority)
  })
})