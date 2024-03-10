import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { useStateManager } from "../../zustand/useStateManager";

export const useSignin = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useStateManager();

  const handleInputErrors = (email, password) => {
    if (validator.isEmpty(email)) {
      toast.error("Enter your email");
    }

    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email");
    }

    if (!validator.isByteLength(password, { min: 8, max: undefined })) {
      toast.error("Password must be at least 8 characters");
    }

    if (validator.isEmpty(password)) {
      toast.error("Please enter your password");
    }
  };

  const signin = async (email, password) => {
    handleInputErrors(email, password);

    try {
      setLoading(true);
      const response = await fetch(`/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        toast.success("Successfully logged in");

        if (window.innerWidth < 640) {
          navigate("/msidebarconversation");
        } else {
          navigate("/conversation");
        }
      }

      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("authtoken", data.authtoken);
      localStorage.setItem("userId", data.user_id);
    } catch (error) {
      console.error(error);
      toast.error("Please try again");
      setLoading(false);
    }
  };
  return { signin };
};
