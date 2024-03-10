import React from "react";
import {Link} from  "react-router-dom"
const Navbar = () => {
  const handleLogoutClick = () =>{
    localStorage.clear()
  }
  return (
    <>
      <div className="w-[100vw] h-[7vh] bg-slate-400 rounded-b-sm shadow-2xl space-x-4 flex items-center  pr-8 text-xl font-bold justify-between overflow-x-hidden">
        <div className="flex justify-center items-center text-slate-50 gap-2 text-2xl"><img className="size-[3vw]" src="/assets/navbarlogo.png" alt="" />GO-Chat</div>
        <div onClick={handleLogoutClick} className="space-x-16 flex bg-slate-400 h-[7vh] w-[12vw] items-center justify-center">
          <Link to="/signin" className="float-right">
            <svg
            className="size-[4vh]"
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
            >
              <path d="m23.619,15.394l-2.862,2.863-.707-.707,2.549-2.55h-8.599v-1h8.664l-2.614-2.614.707-.707,2.862,2.862c.511.511.511,1.342,0,1.853Zm-15.619-4.394c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Zm7,6h1v7H0V3.9C0,2.714.845,1.683,2.01,1.449L9.01.049c.737-.146,1.494.041,2.075.519.45.369.746.875.859,1.433h1.556c1.379,0,2.5,1.121,2.5,2.5v7.5h-1v-7.5c0-.827-.673-1.5-1.5-1.5h-1.5v20h3v-6ZM11,2.501c0-.451-.2-.874-.549-1.16-.349-.286-.803-.398-1.245-.312l-7,1.4c-.699.141-1.206.759-1.206,1.471v19.1h10V2.501Z" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;