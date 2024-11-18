const verifyEmailTemplate = ({ name, url }) => {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
            <!-- Header Section -->
            <div style="text-align: center; padding-bottom: 20px;">
              <img src="https://cdn5.f-cdn.com/contestentries/303324/13530041/56485d7796922_thumb900.jpg" alt="I-Shop.gr Store Logo" style="max-width: 150px;">
            </div>
  
            <!-- Email Content Section -->
            <div style="font-size: 16px; line-height: 1.7; color: #333; padding: 10px;">
              <p style="margin: 10px 0;">Hi <strong>${name}</strong>,</p>
              <p style="margin: 10px 0;">Thank you for signing up with <strong>I-Shop.gr</strong>! We're excited to have you onboard. Before you can start shopping, we just need to verify your email address.</p>
              <p style="margin: 10px 0;">Please click the button below to confirm your email address and complete your registration:</p>
  
              <!-- Verification Button -->
              <a href="${url}" style="display: block; width: 220px; margin: 20px auto; padding: 14px; background: linear-gradient(145deg, #ff6f61, #ff3f35); color: #ffffff; text-align: center; font-size: 18px; font-weight: bold; text-decoration: none; border-radius: 30px; box-shadow: 0 4px 10px rgba(255, 107, 97, 0.3); transition: all 0.3s ease;">
                Verify Your Email
              </a>
  
              <p style="margin: 10px 0;">If you didn’t sign up for an account, feel free to ignore this email.</p>
            </div>
  
            <!-- Footer Section -->
            <div style="text-align: center; font-size: 12px; color: #aaa; padding-top: 20px;">
              <p style="margin: 5px 0;">Thank you for being a part of <strong>I-Shop.gr</strong>!</p>
              <p style="margin: 5px 0;">If you have any questions or need assistance, don't hesitate to contact our support team.</p>
              <p style="margin: 5px 0;">&copy; 2024 I-Shop.gr. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
  
  export default verifyEmailTemplate;
  