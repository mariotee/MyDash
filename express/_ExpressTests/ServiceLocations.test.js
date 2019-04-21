const assert = require("assert")
const ServiceLocationModel = require("../Entities/ServiceLocations/servicelocation.model.js")
const ServiceLocationsController = require("../Entities/ServiceLocations/servicelocations.controller.js")

describe("ServiceLocations", () => {
  var posted = {}    

  it("validates a full ServiceLocation model", () => {
    let serviceLocationInstance = new ServiceLocationModel({
      latitude: 123.0,
      longitude: 123.0,
      city: "city",
      country: "country",
      status: "Running",
    })

    let res = serviceLocationInstance.validate()

    assert.strictEqual(res.errors, undefined)
  })
  
  it("returns a newly created ServiceLocation", async () => {
    const controller = new ServiceLocationsController()
    const serviceLocationToPost = {
      latitude: 123.123,
      longitude: 123.123,
      city: "city",
      country: "country",
      status: "Running",
    }
    let res = await controller.createServiceLocation(serviceLocationToPost)    
    
    assert.strictEqual(res.latitude, serviceLocationToPost.latitude)
    assert.strictEqual(res.longitude, serviceLocationToPost.longitude)
    posted = res
  })

  it("returns a ServiceLocation that was retrieved by id", async () => {
    const controller = new ServiceLocationsController()
    let res = await controller.getServiceLocationById(String(posted._id))
    
    assert.strictEqual(res.latitude, posted.latitude)
    assert.strictEqual(res.longitude, posted.longitude)
  })

  it("returns one ServiceLocation when get all", async () => {
    const controller = new ServiceLocationsController()
    let res = await controller.getAllServiceLocations()
    
    assert.strictEqual(res.length, 1)
    assert.strictEqual(res[0].latitude, posted.latitude)
    assert.strictEqual(res[0].longitude, posted.longitude)
  })

  it("updates a ServiceLocation by id", async () => {
    const controller = new ServiceLocationsController()
    let res = await controller.updateServiceLocationById(String(posted._id), {
      city: "new city"
    })
    
    assert.strictEqual(res.latitude, posted.latitude)
    assert.strictEqual(res.longitude, posted.longitude)
    assert.strictEqual(res.city, "new city")    
  })

  it("deletes a ServiceLocation by id", async () => {
    const controller = new ServiceLocationsController()
    let res = await controller.deleteServiceLocationById(String(posted.id))
    
    assert.strictEqual(res.latitude, posted.latitude)
    assert.strictEqual(res.longitude, posted.longitude)
  })
})