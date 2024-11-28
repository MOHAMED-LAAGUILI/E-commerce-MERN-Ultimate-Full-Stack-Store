import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs";
import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOTP from "../utils/generateOTP.js";
import ForgotPasswordTemplate from "../utils/ForgotPasswordTemplate.js";


export async function RegisterUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name & email & password are required",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Email Already Exist",
        error: true,
        success: false,
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);

    const save = await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`;
    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from I-Shop.gr",
      html: verifyEmailTemplate({ name, url: verifyEmailUrl }),
    });

    return res.json({
      message: "user registered successfully",
      error: false,
      success: true,
      data: save,
    });
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
    const { code } = req.body;

    const user = await UserModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "Invalid user code",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.UpdateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

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
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "name & email & password are required",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

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

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Password is Incorrect",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const cookiesOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookiesOptions);
    res.cookie("refreshToken", refreshToken, cookiesOptions);

    return res.json({
      message: "Login Successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
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
    const user_id = req.user_id;

    const cookiesOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookiesOptions);
    res.clearCookie("refreshToken", cookiesOptions);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(user_id, {
      refresh_token: "",
    });

    return res.json({
      message: "User Logout Successfully",
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

export async function UploadUserAvatar(req, res) {
  try {
    const user_id = req.user_id;
    const image = req.file;

    // console.log(`image: ${image}`);
    // console.log(`user_id: ${user_id}`);

    const upload = await uploadImageCloudinary(image);
    const updateUser = await UserModel.findByIdAndUpdate(user_id, {
      avatar: upload.url,
    });

    return res.json({
      message: "User Image Updated",
      error: false,
      success: true,
      data: {
        _id: user_id,
        avatar: upload.url,
      },
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      error: true,
      success: false,
    });
  }
}

export async function UpdateUserDetails(req, res) {
  try {
    const user_id = req.user_id;
    const { name, email, mobile, password } = req.body;
    let hashPassword = "";

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }
    const updatedUser = await UserModel.UpdateOne(
      { _id: user_id },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
    );

    return res.json({
      message: "User Details Updated",
      error: false,
      success: true,
      data: updatedUser,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      error: true,
      success: false,
    });
  }
}

export async function ForgotPasswordController(req, res) {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
        error: true,
        success: false,
      });
    }

    const otp = generateOTP();
    const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: expireTime, // No need to convert to ISO string; MongoDB handles it
    })

    await sendEmail({
      sendTo: email,
      subject: "Forgot Password Code From I-Shop",
      html: ForgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });
    return res.json({
      message: "Check Your Email For The Code",
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

export async function VerifyOTPController(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email & OTP are required",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();

    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        message: "OTP Expired try Again Later",
        error: true,
        success: false,
      });
    }

    if (String(otp) !== String(user.forgot_password_otp)) {
      return res.status(400).json({
        message: `Invalid OTP try to check your email or retry later saved otp :${user.forgot_password_otp} new otp${otp}`,
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "OTP Verified Successfully",
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

export async function ResetPasswordController(req, res) {
  try {
    const { email, newPassword, confirmNewPassword } = req.body;

    // Validate required fields
    if (!newPassword || !confirmNewPassword) {
      return res.status(400).json({
        message: "All Fields Are Required",
        error: true,
        success: false,
      });
    }

    // Validate password strength (e.g., min 8 chars, 1 uppercase, 1 lowercase, 1 digit)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long, with a mix of uppercase, lowercase, and numbers.",
        error: true,
        success: false,
      });
    }

    // Check if email exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
        error: true,
        success: false,
      });
    }

    // Ensure passwords match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        message: "Passwords Don't Match",
        error: true,
        success: false,
      });
    }

    // Hash password and update
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    await UserModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.json({
      message: "Password Updated successfully",
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


export async function RefreshTokenAfterPasswordResetController(req, res) {
  try {
    
    const refreshToken = req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1]
    
if (!refreshToken) {
  return res.status(401).json({
    message: "Invalid Refresh Token Try Again Later",
    error: true,
    success: false,
  });
}

const verifyToken = await jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN)

if(!verifyToken){
  return res.status(401).json({
    message: "Refresh Token Expired",
    error: true,
    success: false,
  });
}

const user_id = verifyToken._id

 const newAccessToken = await generateAccessToken(user_id)


 const cookiesOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};
 res.cookie("accessToken", newAccessToken, cookiesOptions)

 return res.json({
  message: "New Access Token Generated",
  error: false,
  success: true,
  data:{
    accessToken:newAccessToken
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
