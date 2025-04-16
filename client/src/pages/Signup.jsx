import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import axios from "axios";

export default function Signup({ onSubmit }) {
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    console.log("Signing up with:", data);
    // Call your API here (e.g., using fetch or axios)
    const res = await axios.post("/api/v1/auth/register", data);
    if (res.data.success) {
      alert(res.data.message);
      if (onSubmit) onSubmit();
    } else {
      alert(res.data.message);
    }
    navigate("/account");
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 mt-5">
      <AuthForm type="signup" onSubmit={handleSignup} />
    </div>
  );
}
