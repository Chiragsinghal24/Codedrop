import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdLogout, MdMenu } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { account, databases, getCurrentUser } from "../helper/appwrite";

const Drawer = ({ children }) => {
  const navigate = useNavigate();
  const [codeDrops, setCodeDrops] = useState([]);
  const [fetchingCD, setFetchingCD] = useState(false);
  const logout = () => {
    const promise = account.deleteSession("current");
    promise
      .then(() => {
        navigate("/landing");
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    const fetchCD = async () => {
      const user = await getCurrentUser();
      const promise = databases.listDocuments(
        "651d2479343ba1410095",
        "651d24ada0661cbabf0b",
        [Query.equal("owner", user.$id)]
      );
      promise
        .then((response) => {
          setCodeDrops(response.documents);
        })
        .catch((err) => alert(err))
        .finally(() => setFetchingCD(false));
    };
    fetchCD();
  }, [navigate, fetchingCD]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet context={[setFetchingCD]} />
        <label
          htmlFor="my-drawer-2"
          className="absolute top-2 left-2 p-2 btn btn-ghost rounded-full drawer-button lg:hidden"
        >
          <MdMenu size={32} />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu gap-4 p-4 w-80 min-h-full bg-base-200 text-base-content">
          <Link to="/create" className="btn btn-primary">
            <FaPlus />
            <span>Create</span>
          </Link>
          <hr />
          {codeDrops.map((codeDrops) => {
            return (
              <li key={codeDrops.$id} className="bg-base-100 rounded-lg">
                <Link to={"/" + codeDrops.$id}>{codeDrops.title}</Link>
              </li>
            );
          })}
          <button className="btn btn-error mt-auto" onClick={logout}>
            <MdLogout />
            <span>Logout</span>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
