import React from "react";
import { useSignin } from "../hooks/User/useSignin";
import { Link } from "react-router-dom";
import { useStateManager } from "../zustand/useStateManager";
import Loading from "../Components/Utils/Loading";

const SignIn = () => {
  const {loading} = useStateManager()
  const { signin } = useSignin();
  const HandleSignIn = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signin(email, password);
    
  };

  return (
    <>
      <form action="">
        <div className="flex bg-slate-100 flex-col items-center  h-[100vh] w-[100vw] justify-center">
          <div className="flex flex-col items-center justify-center h-[50vh] w-[60vw] lg:w-[28vw] shadow-lg rounded-xl bg-slate-50">
            <div className="font-semibold text-3xl mb-2">Sign In</div>

            <div>
              <input
                className="px-2 h-[5vh] w-[50vw] lg:w-[20vw] border-[1px] lg:border-[2 px] border-black rounded-md m-3 "
                type="email"
                placeholder="Email"
                id="email"
                required
              />
            </div>
            <div>
              <input
                className="px-2 h-[5vh] w-[50vw] lg:w-[20vw] border-[1px] lg:border-[2 px] border-black rounded-md "
                type="password"
                placeholder="Password"
                id="password"
                required
              />
            </div>

            <hr className="my-6 w-[80%] border-t-1 border-black" />
            <div>
              Don't have an account? <Link to='/signup' className="hover:text-blue-400 text-blue-800 underline">Sign Up</Link>
            </div>
            <div className="bg-slate-300 hover:bg-slate-50 h-[7vh] w-[15vw] lg:w-[10vw]  shadow-md rounded-md mt-6 flex justify-center items-center">
              {!loading ? <button
                className=" font-bold text-xl m-4"
                type="submit"
                onClick={HandleSignIn}
              >
                Sign In
              </button>
              : <Loading/>}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignIn;
