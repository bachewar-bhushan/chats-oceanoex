import React, {useState } from "react";
import { useSignup } from "../hooks/User/useSignup";
import { Link } from "react-router-dom";
import { useStateManager } from "../zustand/useStateManager";
import Loading from "../Components/Utils/Loading";

const SignUp = () => {
  const [gender, setGender] = useState("");
  const { signup } = useSignup();
  const {loading} = useStateManager()

  const HandleSignUp = (e) => {
    e.preventDefault();
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
signup(fullname, email, password, gender);
   
  };
  return (
    <>
      <form action="">
        <div className="flex bg-slate-100 flex-col items-center  h-[100vh] w-[100vw] justify-center">
          <div className="flex flex-col items-center justify-center  h-[65vh] w-[60vw] lg:w-[28vw] shadow-lg rounded-xl bg-slate-50">
            <div className="font-semibold text-3xl mb-4">Sign Up</div>
            <div>
              <input
                className="px-2 h-[6vh] w-[50vw] lg:w-[20vw] border-[1px] md:border-[2 px] border-black rounded-md mt-3"
                type="text"
                placeholder="Enter your Full Name"
                id="fullname"
              />
            </div>

            <div>
              <input
                className="px-2 h-[6vh] w-[50vw] lg:w-[20vw] border-[1px] md:border-[2 px] border-black rounded-md m-3 "
                type="email"
                placeholder="Email"
                id="email"
              />
            </div>
            <div>
              <input
                className="px-2 h-[6vh] w-[50vw] lg:w-[20vw] border-[1px] md:border-[2 px] border-black rounded-md "
                type="password"
                placeholder="Password"
                id="password"
              />
            </div>
            <div className="flex space-x-9 mt-4">
              <div>
                Gender
              </div>
              <div>
              <label>
                male
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => {
                    setGender("male");
                    
                  }}
                  id="male"
                />
              </label>
            </div>
            <div>
              <label>
                female
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => {
                    setGender("female");
                    
                  }}
                  id="female"
                />
              </label>
            </div>

            </div>
            
            <hr className="my-6 w-[80%] border-t-1 border-black" />
            <div>
             Already have an account? <Link to='/signin' className="hover:text-blue-400 text-blue-800 underline">Sign In</Link>
            </div>
            <div className="m-4  mt-6 bg-slate-300 hover:bg-slate-50 h-[7vh] w-[19vw] lg:w-[10vw] rounded-md shadow-md flex justify-center items-center">
            {!loading ? <button
                className="font-bold text-xl "
                type="submit"
                onClick={HandleSignUp}
              >
                Sign Up
              </button>:
            <Loading/>}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
