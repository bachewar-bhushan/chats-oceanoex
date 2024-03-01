import toast from "react-hot-toast";
import validator from "validator";
import { useStateManager } from "../../zustand/useStateManager";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const { setLoading } = useStateManager();
  const navigate = useNavigate();

  const handleInputErrors = (fullname, email, password, gender) => {
    if (validator.isEmpty(fullname)) {
      toast.error("Enter your Full Name");
    }

    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email");
    }

    if (!validator.isByteLength(password, { min: 8, max: undefined })) {
      toast.error("Password must be at least 8 characters");
    }

    if (validator.isEmpty(gender)) {
      toast.error("Please select your Gender");
    }
  };

  const signup = async (fullname, email, password, gender) => {
    handleInputErrors(fullname, email, password, gender);

    try {
      setLoading(true);
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password, gender }),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        toast.success("Successfully signed up");
        navigate("/signin");
      } else {
        if (data.error === "User already exist") {
          toast.error("User already exist");
        }
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Please try again");
      setLoading(false);
    }
  };
  return { signup };
};
