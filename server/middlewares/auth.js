import jwt from "jsonwebtoken";


const auth = async (req,res,next) => {
  try {

    const token =
     req.cookies.accessToken ||
      req?.header?.authorization?.split(" ")[1] //[ "Bearer", "token"]

    //  console.log(`Token: ${token}`);

    if (!token) {
        return res.status(401).json({
            message: "No provided Token try to login",
            error: true,
            success: false,
          });
    }


    const decode = await jwt.verify(token,process.env.JWT_SECRET_ACCESS_TOKEN)
    
    // console.log(`Decoded Token : ${JSON.stringify(decode,null,4)}`);
    if(!decode){
        return res.status(401).json({
            message: "unauthorized access",
            error: true,
            success: false,
          });
    }

    req.user_id = decode.id
 
    next()
    } catch (e) {
      return res.status(500).json({
        message: e.message || e,
        error: true,
        success: false,
      });
    }
  }

  export default auth;