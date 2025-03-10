exports.authorizeRoles = (...permittedRoles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (permittedRoles.includes(role)) {
      next();
    } else {
      res.status(403).json({ status: "error", message: "Forbidden: Insufficient permissions" });
    }
  };
};