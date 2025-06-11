import { useRouter } from "next/router";

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
        <p><strong>Github:</strong> <a href="https://github.com/ShravanMore/NextJs_admin-panel-otp-auth">Link</a></p>
        <button onClick={handleRedirect} className="login-button">
          Go to Admin Login
        </button>
      </div>
    </div>
  );
}
