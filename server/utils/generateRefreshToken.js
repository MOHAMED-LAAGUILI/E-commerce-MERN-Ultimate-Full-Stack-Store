import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const generateRefreshToken = async (user_id) => {
  const token = jwt.sign(
      { id: user_id },
      process.env.JWT_SECRET_REFRESH_TOKEN,
      { expiresIn: "7d" }
  );

  const updateRefreshToken = await UserModel.updateOne(
    {_id:user_id},
    {refresh_token:token}
)
  return token;
};

export default generateRefreshToken;