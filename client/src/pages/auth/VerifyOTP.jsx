import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/auth/verify-otp.jpg";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import AxiosToastError from "../../utils/AxiosToastError";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const redirect = useNavigate();
  const location = useLocation();

  console.log(`location : ${location}`);
  // Handle OTP input changes


  useEffect(() => {
    if (!location?.state?.email) {
      redirect("/forgot-password")
    }
  }, [location, redirect]);

  const handleInputChange = (value, index) => {
    if (!/^\d$/.test(value) && value !== "") return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle keyboard events
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to the previous input on Backspace
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP!");
      return;
    }

    setIsLoading(true);
   /*
    toast(`otp : ${otpCode}`)
    toast(`email : ${location?.state?.email}`)
    */

    try {
      const response = await Axios({
        ...SummaryApi.verifyOtp,
        data: { 
          otp: otpCode,
          email: location?.state?.email
         },
      });

      if (response?.data?.error) {
        toast.error(response.data.message);
      } else if (response?.data?.success) {
        toast.success(response.data.message);
        setOtp(Array(6).fill(""));
        redirect("/reset-password",{
          state:{
            data: response.data,
            email: location?.state?.email
          }
        });
      }
    } catch (e) {
      AxiosToastError(e);
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="bg-gray-100  flex justify-center items-center">

    <div className="flex w-full max-w-screen-xl bg-white overflow-hidden rounded-lg">
      {/* Form Section */}
      <div className="w-full sm:w-1/2 p-8 sm:p-10 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the 6-digit OTP sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Fields */}
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ))}
          </div>

          {/* Verify OTP Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            disabled={isLoading }
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {"Didn't"} receive the code?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden sm:flex sm:w-1/2 bg-blue-50">
        <img
          src={img}
          alt="Verify OTP"
          className="w-full h-full object-cover rounded-r-xl"
        />
      </div>
    </div>
    </div>

  );
};

export default VerifyOtp;
