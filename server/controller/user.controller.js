
import bcryptjs from "bcryptjs"
import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/user.model.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';


export  async function RegisterUserController(req, res) {
  try {
const {name , email, password} = req.body; 

if(!name || !email || !password){
    return res.status(400).json({
        message: "name & email & password are required",
        error: true,
        success: false,
      });
}

const user = await UserModel.findOne({email})

if (user) {
    return res.json({
        message:"Email Already Exist",
        error: true,
        success: false,
    })
}
const salt = await bcryptjs.genSalt(10);
const hashPassword = await bcryptjs.hash(password,salt)

const payload = {
    name,
    email,
    password:hashPassword
}

const newUser = new UserModel(payload)

const save = await newUser.save()

const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`
const  verifyEmail = await sendEmail({
    sendTo:email,
    subject:"Verify email from I-Shop.gr",
    html:verifyEmailTemplate({name, url: verifyEmailUrl})
})

return res.json({
    message:"user registered successfully",
    error: false,
    success: true,
    data: save
})

  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      error: true,
      success: false,
    });
  }
}

export async function VerifyEmailController(req, res) {
  try {
    
    const {code} = req.body

    const user = await UserModel.findOne({_id: code})

    if (!user) {
      return res.status(400).json({
        message: "Invalid user code",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.UpdateOne({_id:code},{
      verify_email:true
    })

    return res.json({
      message: "Email Verified Successfully",
      error: false,
      success: true,
    });

    
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      error: true,
      success: false,
    });
  }
}

export async function LoginController(req, res) {
  try {
    const {email, password} = req.body
    if(!email || !password){
     
        return res.status(400).json({
            message: "name & email & password are required",
            error: true,
            success: false,
          });
    }
    
    const user = await UserModel.findOne({email})
   
    if (!user) {
      return res.status(400).json({
        message: "User is Not Registered Yet",
        error: true,
        success: false,
      });
     }
 
     if (user.status !== "Active") {
      return res.status(400).json({
        message: "This Email is Suspended, Contact to Admin Support",
        error: true,
        success: false,
      });
     }
 

     const checkPassword = await bcryptjs.compare(password, user.password)

     if (!checkPassword) {
      return res.status(400).json({
        message: "Password is Incorrect",
        error: true,
        success: false,
      });
     }


     const accessToken = await generateAccessToken(user._id)
     const refreshToken = await generateRefreshToken(user._id)

     const cookiesOptions = {
      httpOnly:true,
      secure:true,
      sameSite:"None"
     }

res.cookie("accessToken",accessToken,cookiesOptions)
res.cookie("refreshToken",refreshToken,cookiesOptions)


    return res.json({
      message: "Login Successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken
      }
    });

    
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      error: true,
      success: false,
    });
  }
}

export async function LogoutController(req, res) {
  try {
    const user_id= req.user_id
   
    const cookiesOptions = {
      httpOnly:true,
      secure:true,
      sameSite:"None"
    }
    res.clearCookie("accessToken", cookiesOptions)
  res.clearCookie("refreshToken", cookiesOptions)

    const removeRefreshToken = await UserModel.findByIdAndUpdate(user_id,{
      refresh_token:""

    })

    return res.json({
      message: "User Logout Successfully",
      error: false,
      success: true
    });

    
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      error: true,
      success: false,
    });
  }
}

export async function UploadUserAvatar(req, res) {
  try {
   const user_id = req.user_id
    const image = req.file

    // console.log(`image: ${image}`);
    // console.log(`user_id: ${user_id}`);

const upload = await uploadImageCloudinary(image)
   const updateUser = await UserModel.findByIdAndUpdate(user_id,{
    avatar: upload.url
   })

return res.json({
      message: "User Image Updated",
      error: false,
      success: true,
      data:{
        _id: user_id,
        avatar: upload.url
      }
    });

    
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      error: true,
      success: false,
    });
  }
}