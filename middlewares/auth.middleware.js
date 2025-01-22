import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
  const token = req.cookies?.jwt || req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(403).json({ message: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

const isLoggedIn = (req, res, next) => {
  const token = req.cookies?.jwt || req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Unauthorized.' });
    req.user = user;
    next();
  });
}

const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Forbidden access' });
  }
  next();
};

export { validateToken, checkRole, isLoggedIn };