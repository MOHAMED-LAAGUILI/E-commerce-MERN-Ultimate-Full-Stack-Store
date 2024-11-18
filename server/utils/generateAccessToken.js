import jwt from "jsonwebtoken";

const generateAccessToken = async (user_id) => {
  const token = jwt.sign(
    { id: user_id },
    process.env.JWT_SECRET_ACCESS_TOKEN,
    { expiresIn: "5h" }
  );

  return token;
};

export default generateAccessToken;