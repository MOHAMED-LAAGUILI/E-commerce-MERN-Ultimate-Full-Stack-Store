import { Router } from "express";
import { 
    ForgotPasswordController,
    LoginController,
     LogoutController,
     RefreshTokenAfterPasswordResetController,
     RegisterUserController,
      ResetPasswordController,
      UpdateUserDetails,
      UploadUserAvatar,
      VerifyEmailController,
      VerifyOTPController
     } from "../controller/user.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";



const userRouter = Router()

userRouter.post("/register", RegisterUserController)
userRouter.post("/verify-email", VerifyEmailController)
userRouter.post("/login", LoginController)
userRouter.get("/logout",auth, LogoutController)
userRouter.put("/upload-avatar",auth,upload.single("avatar"), UploadUserAvatar)
userRouter.put("/update-user-details",auth, UpdateUserDetails)
userRouter.put("/forgot-password", ForgotPasswordController)
userRouter.put("/verify-otp", VerifyOTPController)
userRouter.put("/reset-password", ResetPasswordController)
userRouter.post("/refresh-token", RefreshTokenAfterPasswordResetController)





export default userRouter;