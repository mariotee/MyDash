const express = require("express")
const router = express.Router()
//CONTROLLERS
const CustomersController = require("../Entities/Customers/customers.controller")
const ServiceLocationsController = require("../Entities/ServiceLocations/servicelocations.controller")
const BillingReportsController = require("../Entities/BillingReports/billingreports.controller")
const CompletedTasksController = require("../Entities/CompletedTasks/completedtasks.controller")
const IncompleteTasksController = require("../Entities/IncompleteTasks/incompletetasks.controller")
//ROUTER MIDDLEWARE
router.use((req,res,next) => {
  console.log(`${new Date().toISOString()} | ${req.method} request on ${req.url}`)
  if (Object.keys(req.body) > 0) console.log(JSON.stringify(req.body))
  next()
})
//ROUTES
////HOME ROUTE
router.get("/", (req,res) => {  
  res.send("Welcome to my Api")
})
////CUSTOMERS
router.route("/customers")
  .get(async (_,res) => {
    const controller = new CustomersController()
    res.send(await controller.getAllCustomers())
  })
  .post(async (req,res) => {
    const controller = new CustomersController()
    res.send(await controller.createCustomer(req.body))
  })
router.route("/customers/:customer_id")
  .get(async (req,res) => {
    const controller = new CustomersController()    
    res.send(await controller.getCustomerById(req.params.customer_id))
  })
  .put(async (req,res) => {    
    const controller = new CustomersController()
    res.send(await controller.updateCustomerById(req.params.customer_id, req.body))
  })
  .delete(async (req,res) => {
    const controller = new CustomersController()
    res.send(await controller.deleteCustomerById(req.params.customer_id))
  })
////SERVICE LOCATIONS
router.route("/servicelocations")
  .get(async (_,res) => {
    const controller = new ServiceLocationsController()
    res.send(await controller.getAllServiceLocations())
  })
router.route("/servicelocations/:location_id")
  .put(async (req,res) => {
    const controller = new ServiceLocationsController()
    res.send(await controller.updateServiceLocationById(req.params.location_id, req.body))
  })
////BILLING REPORTS
router.route("/billingreports")
  .get(async (_,res) => {
    const controller = new BillingReportsController()
    res.send(await controller.getAllBillingReports())
  })
////INCOMPLETE TASKS
router.route("/incompletetasks")
  .get(async (_,res) => {
    const controller = new IncompleteTasksController()
    res.send(await controller.getAllIncompleteTasks())
  })
  .post(async (req,res) => {
    const controller = new IncompleteTasksController()
    res.send(await controller.createIncompleteTask(req.body))
  })
router.route("/incompletetasks/:task_id")
  .delete(async (req,res) => {
    const controller = new IncompleteTasksController()
    res.send(await controller.deleteIncompleteTaskById(req.params.task_id))
  })
////COMPLETED TASKS
router.route("/completedtasks")
  .get(async (_,res) => {
    const controller = new CompletedTasksController()
    res.send(await controller.getAllCompletedTasks())
  })
  .post(async (req,res) => {
    const controller = new CompletedTasksController()
    res.send(await controller.createCompletedTask(req.body))
  })
router.route("/incompletetasks/:task_id")
  .delete(async (req,res) => {
    const controller = new CompletedTasksController()
    res.send(await controller.deleteCompletedTaskById(req.params.task_id))
  })
//END ROUTES
module.exports = router