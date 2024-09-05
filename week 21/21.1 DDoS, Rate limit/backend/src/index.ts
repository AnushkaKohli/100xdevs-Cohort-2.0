import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// --------------------Adding rate limit middleware--------------------
import rateLimit from "express-rate-limit";

const app = express();
app.use(cors());
dotenv.config();
const PORT = 3000;
//===================Adding Captcha==================
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());

// --------------------Adding rate limit middleware--------------------
// Rate limiter configuration
const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // Limit each IP to 3 OTP requests per windowMs
  message: "Too many requests, please try again after 5 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 password reset requests per windowMs
  message:
    "Too many password reset attempts, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

// Store OTPs in a simple in-memory object
const otpStore: Record<string, string> = {};

// Endpoint to generate and log OTP
// ----------------Adding the rate limit middleware----------------
app.post("/generate-otp", otpLimiter, (req, res) => {
  const email = req.body.email;
  if (!email) return res.status(400).json({ message: "Email is required" });
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  otpStore[email] = otp;
  console.log(`Generated OTP for ${email}: ${otp}`);
  res
    .status(200)
    .json({ message: "OTP generated successfully and logged in console" });
});

// Endpoint to reset password
app.post("/reset-password", passwordResetLimiter, async (req, res) => {
  const { email, otp, newPassword, token } = req.body;
  // =================Adding Captcha==================
  console.log("Token: " + token);

  let formData = new FormData();
  formData.append("secret", SECRET_KEY as string);
  formData.append("response", token);
  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });
  const challengeSucceeded = (await result.json()).success;
  console.log("Challenge Succeeded: " + challengeSucceeded);

  if (!challengeSucceeded) {
    return res.status(403).json({ message: "Invalid reCAPTCHA token" });
  }
  // ========================================================

  if (!email || !otp || !newPassword)
    return res
      .status(400)
      .json({ message: "Email, OTP, and new password are required" });
  if (otpStore[email] === otp) {
    console.log(`Password for ${email} reset to ${newPassword}`);
    delete otpStore[email];
    res.status(200).json({ message: "Password reset successfully!" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on on http://localhost:${PORT}`);
});
