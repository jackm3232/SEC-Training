const data = {
  employees: require("../model/employees.json"),
  set_employees: function (data) { this.employees = data }
};

const get_all_employees = (request, response) => {
  response.json(data.employees);
};

const create_new_employee = (request, response) => {
  const new_employee = {
    id: data.employees?.length 
        ? data.employees[data.employees.length - 1].id + 1 
        : 1,
    firstname: request.body.firstname,
    lastname: request.body.lastname
  };

  if (!new_employee.firstname || !new_employee.lastname) {
    return response.status(400).json({ "message": "First and last names are required." });
  }

  data.set_employees([...data.employees, new_employee]);
  response.status(201).json(data.employees);
};

const update_employee = (request, response) => {
  const employee = data.employees.find(emp => emp.id === parseInt(request.body.id));
  if (!employee) {
      return response.status(400).json({ "message": `Employee ID ${request.body.id} not found` });
  }
  if (request.body.firstname) employee.firstname = request.body.firstname;
  if (request.body.lastname) employee.lastname = request.body.lastname;
  const filtered_array = data.employees.filter(emp => emp.id !== parseInt(request.body.id));
  const unsorted_array = [...filtered_array, employee];
  data.set_employees(unsorted_array.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  response.json(data.employees);
};

const delete_employee = (request, response) => {
  const employee = data.employees.find(emp => emp.id === parseInt(request.body.id));
  if (!employee) {
      return response.status(400).json({ "message": `Employee ID ${request.body.id} not found` });
  }
  const filtered_array = data.employees.filter(emp => emp.id !== parseInt(request.body.id));
  data.set_employees([...filtered_array]);
  response.json(data.employees);
};

const get_employee = (request, response) => {
  const employee = data.employees.find(emp => emp.id === parseInt(request.params.id));
  if (!employee) {
      return response.status(400).json({ "message": `Employee ID ${request.params.id} not found` });
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
