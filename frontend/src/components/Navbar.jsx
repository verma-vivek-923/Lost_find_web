import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import{ ImBlogger } from "react-icons/im";
import { TbLogin2, TbLogout } from "react-icons/tb";
import { FaUsersLine, FaPhoneVolume, FaRegCircleUser } from "react-icons/fa6";
import { IoMdInformationCircle, IoIosCloseCircleOutline } from "react-icons/io";
import { IoHome, IoCreateOutline, IoMenuOutline } from "react-icons/io5";
// import Cookies from "js-cookie";
// import { toast } from "react-hot-toast";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { SlMagnifier } from "react-icons/sl";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FiArrowLeft, FiArrowUpLeft } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const [showDash,setShowDash]=useState();
   const { profile, setIsAuthenticated } = useAuth();
   const token = Cookies.get("jwt") || (localStorage.getItem("user") && profile);

   console.log(profile);
  const [show, setShow] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [screen, setScreen] = useState(false);

  useEffect(() => {
  setShowDash(profile)
  console.log(showDash);
  }, [])
  

  const handleLogout = async (e) => {
    e.preventDefault();
    setShow(!show);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.removeItem("user");
      // ////console.log(data)
      setIsAuthenticated(false);
      setTimeout(() => {
        window.location.pathname = "/";
      }, 2000);
      toast.success("Logout Succesfully");
    } catch (error) {
      console.log(error);
      const err = error?.response?.data?.message;
      if (err) {
        toast.error(err + "!");
      } else {
        toast.error("sign in error");
      }
    }
  };

  return (
    <>
      <div className="sticky top-0 left-0 bg-inherit shadow-xl px-2 py-1 border z-50">
        <div className="flex justify-between items-center container mx-auto ">
          <div className="font-semibold pl-4 text-xl">
            Found<span className="text-blue-600">Hub</span>
          </div>
          <div className="flex ">
            <ul className="hidden md:flex space-x-4">
              <Link
                className=" hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded"
                to="/"
              >
                HOME
              </Link>
              <Link
                className=" hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded"
                to="/lostItem"
              >
                LostItem
              </Link>
              {/* <Link
                className=" hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded"
                to="/creators"
              >
                CREATORS
              </Link> */}
              <Link
                className=" hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded"
                to="/about"
              >
                ABOUT
              </Link>
              <Link
                className=" hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded"
                to="/contact"
              >
                CONTACT US
              </Link>
            </ul>
          </div>
          <div className="flex relative  items-center ">
            <div>
              {token ? (
                <div className="dropdown dropdown-content dropdown-bottom dropdown-hover flex justify-center mr-2">
                  <Link
                    className={`flex border-2 border-orange-700 overflow-hidden  bg-blue-600 h-9 w-9 text-sm text-white font-semibold hover:bg-blue-800 duration-300 rounded-full`}
                  >
                    <img
                      src={profile?.image?.url || "img"}
                      className="object-cover object-center rounded-full"
                    />
                    
                  </Link>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-lg z-[1]  shadow"
                  >
                    <Link
                      onClick={() => setShow(!show)}
                      smooth="true"
                      className={`${
                        !token ? "hidden" : "flex"
                      }  items-center  gap-2  text-green-800 duration-200 hover:font-semibold hover:tracking-wider hover:underline px-2  text-sm md:text-base  rounded`}
                      to="/dashboard"
                    >
                      <FaRegCircleUser size={14} />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      onClick={handleLogout}
                      smooth="true"
                      className={`${
                        !token ? "hidden" : "flex" 
                      }  items-center gap-2 text-red-800 duration-150 hover:font-semibold hover:underline hover:tracking-wider  px-2  text-sm md:text-base  rounded`}
                    >
                      <TbLogout size={14} />
                      <span>Log Out</span>
                    </Link>
                  </ul>
                </div>
               ) : ( 
                <Link
                  to="/login"
                  className={`block text-base text-gray-900 tracking-wider md:border border-gray-900 md:font-semibold hover:text-white hover:bg-red-800 duration-300 px-2  rounded`}
                >
                  LogIn
                </Link>
               )} 
            </div>
            <div className={` block md:hidden`}>
              <label className="btn btn-circle swap swap-rotate">
                <input type="checkbox" checked={show} />

                <IoMenuOutline
                  className="swap-off"
                  size={32}
                  onClick={() => {
                    setShow(!show);
                    setScreen(!screen);
                  }}
                />

                <IoIosCloseCircleOutline
                  className="swap-on"
                  size={32}
                  onClick={() => {
                    setShow(!show);
                    setScreen(!screen);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
        {show && (
          <>
            <div className={`absolute shadow-lg  w-full left-0 z-50 `}>
              <ul className="z-50 flex flex-col px-4 pb-4 bg-slate-200 justify-center items-right md:hidden rounded-b-lg  text-xl space-y-1">
                <Link
                  onClick={() => setShow(!show)}
                  smooth="true"
                  className="hover:text-blue-600 flex  items-center gap-2 duration-200 hover:font-semibold hover:tracking-wider hover:underline  px-2 py- text-base md:text-sm  rounded"
                  to="/"
                >
                  <IoHome size={13} /> <span>HOME</span>
                </Link>
                <Link
                  onClick={() => setShow(!show)}
                  smooth="true"
                  className="hover:text-blue-600 flex  items-center gap-2 duration-200 hover:font-semibold hover:tracking-wider hover:underline px-2 py- text-base md:text-sm  rounded"
                  to="/blogs"
                >
                  <ImBlogger size={12} /> <span> BLOGS</span>
                </Link>
                <Link
                  onClick={() => setShow(!show)}
                  smooth="true"
                  className="hover:text-blue-600 flex items-center  gap-2 duration-200 hover:font-semibold hover:tracking-wider hover:underline px-2 py- text-base md:text-sm  rounded"
                  to="/creators"
                >
                  <FaUsersLine size={14} />
                  <span>CREATORS</span>
                </Link>
                <Link
                  onClick={() => setShow(!show)}
                  smooth="true"
                  className="hover:text-blue-600 flex items-center gap-2 duration-200 hover:font-semibold hover:tracking-wider hover:underline  px-2 py- text-base md:text-sm  rounded"
                  to="/about"
                >
                  <IoMdInformationCircle size={14} />
                  <span>ABOUT</span>
                </Link>
                <Link
                  onClick={() => setShow(!show)}
                  smooth="true"
                  className="hover:text-blue-600 flex items-center gap-2 duration-200 hover:font-semibold hover:tracking-wider hover:underline px-2 py- text-base md:text-sm  rounded"
                  to="/contact"
                >
                  <FaPhoneVolume size={13} />
                  <span>CONTACT US</span>
                </Link>
                <Link
                  onClick={() => setShow(!show)}
                  smooth="true"
                  className={`${
                    token ? "hidden" : "flex"
                  } items-center  gap-2  text-green-800  duration-200 hover:font-semibold hover:tracking-wider hover:underline  px-2 text-base md:text-sm  rounded`}
                  to="/login"
                >
                  <FaRegCircleUser size={14} /> <span>Log In</span>
                </Link>
                <Link
                  onClick={() => setShow(!show)}
                  smooth="true"
                  className={`${
                    token ? "hidden" : "flex"
                  }  items-center  gap-2  text-green-800 duration-150 hover:font-semibold hover:tracking-wider hover:underline px-2 py- text-base md:text-sm  rounded`}
                  to="/register"
                >
                  <FaRegCircleUser size={14} />
                  <span>Sign Up</span>
                </Link>
                <Link
                  onClick={() => setShow(!show)}
                  smooth="true"
                  className={`${
                    !token ? "hidden" : "flex"
                  
                  }  items-center  gap-2  text-green-800 duration-200 hover:font-semibold hover:tracking-wider hover:underline px-2 py- text-base md:text-sm  rounded`}
                  to="/dashboard"
                >
                  <FaRegCircleUser size={14} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  onClick={handleLogout}
                  smooth="true"
                  className={`${
                    !token ? "hidden" : "flex"
                  }  items-center gap-2 text-red-800 duration-150 hover:font-semibold hover:underline hover:tracking-wider  px-2 py- text-base md:text-sm  rounded`}
                >
                  <TbLogout size={14} />
                  <span>Log Out</span>
                </Link>
              </ul>

            </div>
          </>
        )}

        {showBar && (
          <div className="w-full px-2 pr-4 bg-slate-100 absolute top-0 left-0 flex gap-2 mt-2 items-center justify-center">
            <FiArrowUpLeft onClick={handleBack} size={32} />

          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
