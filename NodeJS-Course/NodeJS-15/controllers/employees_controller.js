const Employee = require("../model/Employee");

const get_all_employees = async (request, response) => {
  const employees = await Employee.find();
  if (!employees) return response.status(204).json({ "message": "No employees found." });
  response.json(employees);
};

const create_new_employee = async (request, response) => {
  if (!request?.body?.firstname || !request?.body?.lastname) {
    return response.status(400).json( { "message": "First and last names are required." });
  }
  try {
    const result = await Employee.create({
      firstname: request.body.firstname,
      lastname: request.body.lastname
    });
    response.status(201).json(result);
  }
  catch (err) {
    console.error(err);
  }
};

const update_employee = async (request, response) => {
  if (!request?.body?.id) {
    return response.status(400).json( { "message": "ID parameter is required." });
  }
  const employee = await Employee.findOne({ _id: request.body.id }).exec();
  if (!employee) {
      return response.status(204).json({ "message": `No employee matches ID ${request.body.id}.` });
  }
  if (request.body?.firstname) employee.firstname = request.body.firstname;
  if (request.body?.lastname) employee.lastname = request.body.lastname;
  const result = await employee.save();
  response.json(result);
};

const delete_employee = async (request, response) => {
  if (!request?.body?.id) {
    return response.status(400).json( { "message": "Employee ID required." });
  }
  const employee = await Employee.findOne({ _id: request.body.id }).exec();
  if (!employee) {
    return response.status(204).json({ "message": `No employee matches ID ${request.body.id}.` });
  }
  const result = await employee.deleteOne({ _id: request.body.id });
  response.json(result);
};

const get_employee = async (request, response) => {
  if (!request?.params?.id) {
    return response.status(400).json( { "message": "Employee ID required." });
  }
  const employee = await Employee.findOne({ _id: request.params.id }).exec();
  if (!employee) {
    return response.status(204).json({ "message": `No employee matches ID ${request.params.id}.` });
  }
  response.json(employee);
};

module.exports = {
  get_all_employees,
  create_new_employee,
  update_employee,
  delete_employee,
  get_employee
};
