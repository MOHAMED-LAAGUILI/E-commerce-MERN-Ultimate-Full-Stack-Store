import { Router } from "express";
import { 
    LoginController,
     LogoutController,
     RegisterUserController,
      UploadUserAvatar,
      VerifyEmailController
     } from "../controller/user.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";



const userRouter = Router()

userRouter.post("/register", RegisterUserController)
userRouter.post("/verify-email", VerifyEmailController)
userRouter.post("/login", LoginController)
userRouter.get("/logout",auth, LogoutController)
userRouter.put("/upload-avatar",auth,upload.single("avatar"), UploadUserAvatar)

export default userRouter;