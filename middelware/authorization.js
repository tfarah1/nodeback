import jwt from "jsonwebtoken";

export function authorization(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided!");

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (exception) {
    res.status(400).send("Invalid token!");
  }
}

export function admin(req, res, next) {
  if (req.user.role !== "admin" && req.user.role !== "superAdmin") {
    console.log(req.user.role);
    return res.status(403).send("Access denied!");
  }
  next();
}

export function superAdmin(req, res, next) {
  if (req.user.role !== "superAdmin")
    return res.status(403).send("Access denied!");

  next();
}

export function user(req, res, next) {
  if (!req.user.isLoggedIn) return res.status(403).send("Access denied!");
  next();
}

export default [authorization, admin, user, superAdmin];
