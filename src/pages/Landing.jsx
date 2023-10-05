import React, { useEffect } from "react";
import { FaFileCode } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../helper/appwrite";

const Landing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = account.get();
    user.then(() => {
      navigate("/");
    });
  }, [navigate]);
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md bg-black p-8 rounded-xl bg-opacity-50 backdrop-blur-sm text-white flex flex-col gap-4">
          <FaFileCode size={108} className="mx-auto" />
          <h1 className="mb-5 text-5xl font-bold">Code Drop</h1>
          <p>
            An open source code sharing plateform with amazing power of React
            and Appwrite
          </p>
          <Link to={"/login"} className="btn btn-primary rounded-3xl">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
