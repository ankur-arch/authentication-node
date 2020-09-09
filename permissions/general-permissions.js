module.exports = {
  roleAllowed: (role) => {
    return (req, res, next) => {
      console.log(role);
      next();
    };
  },
};
