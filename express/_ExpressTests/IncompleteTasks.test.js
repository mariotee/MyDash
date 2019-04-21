const assert = require("assert")
const IncompleteTaskModel = require("../Entities/IncompleteTasks/incompletetask.model.js")
const IncompleteTasksController = require("../Entities/IncompleteTasks/incompletetasks.controller.js")

describe("IncompleteTasks", () => {
  var posted = {}    

  it("validates a full IncompleteTask model", () => {
    let incompleteTaskInstance = new IncompleteTaskModel({
      title: "test-title",
      dueDate: new Date(12,12,12,12,12,12),
      priority: 1,
    })

    let res = incompleteTaskInstance.validate()

    assert.strictEqual(res.errors, undefined)
  })

  it("validates a partial IncompleteTask model", () => {
    let incompleteTaskInstance = new IncompleteTaskModel({
      title: "test-title",
      dueDate: new Date(12,12,12,12,12,12),
    })

    let res = incompleteTaskInstance.validate()

    assert.strictEqual(res.errors, undefined)
  })  
  
  it("returns a newly created IncompleteTask", async () => {
    const controller = new IncompleteTasksController()
    const date = Date.now()
    const incompleteTaskToPost = {
      title: "test post",
      dueDate: date,
      priority: 3,
    }
    let res = await controller.createIncompleteTask(incompleteTaskToPost)    
    
    assert.strictEqual(res.title, incompleteTaskToPost.title)
    assert.strictEqual(Date(res.dueDate), Date(incompleteTaskToPost.dueDate))
    assert.strictEqual(res.priority, incompleteTaskToPost.priority)
    posted = res
  })

  it("returns all IncompleteTasks", async () => {
    const controller = new IncompleteTasksController()
    let res = await controller.getAllIncompleteTasks()
    
    assert.strictEqual(res.length, 1)
  })

  it("returns a IncompleteTask that was retrieved by id", async () => {
    const controller = new IncompleteTasksController()
    let res = await controller.getIncompleteTaskById(String(posted._id))
    
    assert.strictEqual(res.title, posted.title)
    assert.strictEqual(Date(res.dueDate), Date(posted.dueDate))
    assert.strictEqual(res.priority, posted.priority)
  })

  it("updates a IncompleteTask by id", async () => {
    const controller = new IncompleteTasksController()
    let res = await controller.updateIncompleteTaskById(String(posted._id), {
      title: "new title",
    })
    
    assert.strictEqual(res.title, "new title")
    assert.strictEqual(Date(res.dueDate), Date(posted.dueDate))
    assert.strictEqual(res.priority, posted.priority)
    posted.title = "new title"
  })

  it("deletes a IncompleteTask by id", async () => {
    const controller = new IncompleteTasksController()
    let res = await controller.deleteIncompleteTaskById(String(posted.id))
    
    assert.strictEqual(res.title, posted.title)
    assert.strictEqual(Date(res.dueDate), Date(posted.dueDate))
    assert.strictEqual(res.priority, posted.priority)
  })
})