const express = require("express");
const router = express.Router();

const data = {};
data.employees = require("../../data/employees.json");

router.route("/")
  .get((request, response) => {
    response.json(data.employees);
  })
  .post((request, response) => {
    response.json({
      "firstname": request.body.firstname,
      "lastname": request.body.lastname
    });
  })
  .put((request, response) => {
    response.json({
      "firstname": request.body.firstname,
      "lastname": request.body.lastname
    });
  })
  .delete((request, response) => {
    response.json({ "id": request.body.id });
  });

router.route("/:id")
  .get((request, response) => {
      response.json({ "id": request.params.id });
  });

module.exports = router;
