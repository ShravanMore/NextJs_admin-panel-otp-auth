import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/admin/login");
  };

  return (
    <div className="home-container">
      <div className="assignment-card">
        <h1>Assignment Details</h1>
        <p><strong>Candidate Name:</strong> Shravan More</p>
        <p><strong>Assignment:</strong> Admin Panel with OTP Authentication</p>
        <button onClick={handleRedirect} className="login-button">
          Go to Admin Login
        </button>
      </div>
    </div>
  );
}
