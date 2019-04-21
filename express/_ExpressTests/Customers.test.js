const assert = require("assert")
const CustomerModel = require("../Entities/Customers/customer.model.js")
const CustomersController = require("../Entities/Customers/customers.controller.js")

describe("Customers", () => {
  var posted = {}    

  it("validates a full Customer model", () => {
    let customerInstance = new CustomerModel({
      name: "customer name",
      contact: {
        email: "customer email",
        phone: "customer phone",
        countryCode: "customer country code"
      },
      subscriptionStatus: true,
    })

    let res = customerInstance.validate()

    assert.strictEqual(res.errors, undefined)
  })

  it("validates a partial Customer model", () => {
    let customerInstance = new CustomerModel({
      name: "customer name",
      contact: {
        email: "customer email",        
      },
      subscriptionStatus: true,
    })

    let res = customerInstance.validate()

    assert.strictEqual(res.errors, undefined)
  })  
  
  it("returns a newly created Customer", async () => {
    const controller = new CustomersController()
    const customerToPost = {
      name: "test_comp",
      contact: {
        email: "testemail",
        phone: "testphone",
        countryCode: "+0"
      },
      subscriptionStatus: true,
    }
    let res = await controller.createCustomer(customerToPost)    

    assert.strictEqual(res.name, customerToPost.name)
    assert.strictEqual(res.subscriptionStatus, customerToPost.subscriptionStatus)
    posted = res
  })

  it("returns the one Customer created when get all", async () => {
    const controller = new CustomersController()
    let res = await controller.getAllCustomers()

    assert.strictEqual(res.length, 1)
  })

  it("returns a Customer that was retrieved by id", async () => {
    const controller = new CustomersController()
    let res = await controller.getCustomerById(String(posted._id))
    
    assert.strictEqual(res.name, posted.name)
    assert.strictEqual(res.subscriptionStatus, posted.subscriptionStatus)
  })

  it("updates a Customer by id", async () => {
    const controller = new CustomersController()
    let res = await controller.updateCustomerById(String(posted._id), {
      contact: {
        email: "new email"
      }
    })
    
    assert.strictEqual(res.name, posted.name)
    assert.strictEqual(res.contact.email, "new email")
    assert.strictEqual(res.contact.phone, posted.phone)
    assert.strictEqual(res.contact.countryCode, posted.countryCode)
    assert.strictEqual(res.subscriptionStatus, posted.subscriptionStatus)
  })

  it("deletes a Customer by id", async () => {
    const controller = new CustomersController()
    let res = await controller.deleteCustomerById(String(posted.id))
    
    assert.strictEqual(res.name, posted.name)      
    assert.strictEqual(res.subscriptionStatus, posted.subscriptionStatus)
  })  
})
