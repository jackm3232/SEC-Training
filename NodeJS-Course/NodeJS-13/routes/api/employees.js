const express = require("express");
const router = express.Router();
const employees_controller = require("../../controllers/employees_controller");
const ROLES_LIST = require("../../config/roles_list");
const verify_roles = require("../../middleware/verify_roles");

const data = {};
data.employees = require("../../model/employees.json");

router.route("/")
  .get(employees_controller.get_all_employees)
  .post(verify_roles(ROLES_LIST.Admin, ROLES_LIST.Editor), employees_controller.create_new_employee)
  .put(verify_roles(ROLES_LIST.Admin, ROLES_LIST.Editor), employees_controller.update_employee)
  .delete(verify_roles(ROLES_LIST.Admin), employees_controller.delete_employee);

router.route("/:id")
  .get(employees_controller.get_employee);

module.exports = router;
