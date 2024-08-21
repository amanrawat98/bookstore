import jwt from "jsonwebtoken";

export const userAuthorization = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("token", token);
  if (!token) {
    return res.status(400).json({ message: "Token Required" });
  }

  const data = jwt.verify(token, "12345");
  if (!data) {
    return res.status(400).json({ message: "Invalid or Expired Token" });
  }
  console.log(data);
  next();
};
