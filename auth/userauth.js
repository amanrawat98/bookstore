import jwt from "jsonwebtoken";

export const userAuthorization = (req, res, next) => {
  console.log("Middleware reached");
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token Required" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(data);

    console.log("Decoded Token Data:", data);

    if (data.data.role !== "admin" && data.data.role !== "seller") {
      return res
        .status(403)
        .json({ message: "You Dont have Access to this Feature" });
    }

    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};
