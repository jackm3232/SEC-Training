const verify_roles = (...allowed_roles) => {
  return (request, response, next) => {
      if (!request?.roles) return res.sendStatus(401);
      const roles_array = [...allowed_roles];
      const result = request.roles.map(role => roles_array.includes(role)).find(val => val === true);
      if (!result) return response.sendStatus(401);
      next();
  }
};

module.exports = verify_roles;
