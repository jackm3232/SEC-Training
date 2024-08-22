const express = require("express");
const router = express.Router();
const employees_controller = require("../../controllers/employees_controller");

const data = {};
data.employees = require("../../model/employees.json");

router.route("/")
  .get(employees_controller.get_all_employees)
  .post(employees_controller.create_new_employee)
  .put(employees_controller.update_employee)
  .delete(employees_controller.delete_employee);

router.route("/:id")
  .get(employees_controller.get_employee);

module.exports = router;
