module.exports = (requiredRole) => (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  };
  