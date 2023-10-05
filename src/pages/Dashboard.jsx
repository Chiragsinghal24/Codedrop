import React, { useEffect, useState } from "react";
import Drawer from "../components/Drawer";
import { FaFileCode } from "react-icons/fa";
import { account } from "../helper/appwrite";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = account.get();
    user
      .then((response) => {
        setName(response.name);
      })
      .catch(() => {
        navigate("/landing");
      });
  }, [navigate]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4 text-primary-content text-center">
      <FaFileCode size={108} className="mx-auto" />
      <h1 className="mb-5 text-5xl font-bold">Hello,{name}👋🏼</h1>
      <p>Start by creating/opening a new code drop</p>
    </div>
  );
};

export default Dashboard;
