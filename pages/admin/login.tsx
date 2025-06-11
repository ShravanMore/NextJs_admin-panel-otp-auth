// pages/admin/login.tsx
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [contact] = useState("7710957578");
  const router = useRouter();

  const sendOtp = async () => {
    try {
      const res = await axios.post("https://eazrdaily.eazr.in/auth/admin/sendOtp", {
        contactNumber: contact,
      });
      console.log(res.data);
      setStep(2);
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("https://eazrdaily.eazr.in/auth/admin/verifyOtp", {
        contactNumber: contact,
        otp: otp,
      });

      const token = res.data.data.employee.token;
      localStorage.setItem("token", token);
      router.push("/admin/dashboard");
    } catch (err) {
      alert("OTP Verification failed");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Admin Login</h1>
      {step === 1 && (
        <>
          <p>Contact: {contact}</p>                      {/*since a static contact number was asked to be used*/}
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}
      {step === 2 && (
        <>
        {/*OTP 7710 was asked to be used*/}
          <input
            type="text"
            placeholder="Enter OTP : here 7710"          
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

