export const Back_End_Base_Url = "http://localhost:4000";


const SummaryApi = {
  register:      { url: "api/user/register",        method: "post" },
  login:         { url: "api/user/login",           method: "post" },
  forgotPassword:{ url: "api/user/forgot-password", method: "put"  },
  verifyOtp:     { url: "api/user/verify-otp",      method: "put"  },
  resetPassword: { url: "api/user/reset-password",  method: "put"  },
};



export default SummaryApi;