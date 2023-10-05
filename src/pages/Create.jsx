import React, { useState } from "react";
import Drawer from "../components/Drawer";
import MdEditor from "@uiw/react-md-editor";
import { FaAsterisk, FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { addCodeDropToDb } from "../helper/appwrite";
import { useNavigate, useOutletContext } from "react-router-dom";

const Create = () => {
  const [codeDrop, setCodeDrop] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [setFetchingCD] = useOutletContext();
  const navigate = useNavigate();

  const createCodeDrop = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await addCodeDropToDb({
      title,
      codedrop: codeDrop,
      isPublic: isPublic,
    });
    if (!response) {
      alert(
        "unable to create codedrop please try again or try loggin in again."
      );
      setLoading(false);
      return;
    }
    setLoading(false);
    setFetchingCD(true);
    navigate("/");
  };

  return (
    <form
      onSubmit={createCodeDrop}
      className="min-h-screen w-full flex flex-col p-4 py-16 lg:py-1 gap-4"
    >
      <h1 className="text-2xl">Create a CodeDrop</h1>
      <div className="grid grid-row-2 gap-4 lg:grid-cols-2">
        <div className="form-control gap-2">
          <label htmlFor="title" className="flex">
            Title <FaAsterisk size={8} className="mt-1" color="red" />
          </label>
          <input
            type="text"
            required
            name=""
            id="title"
            className="input border-white input-bordered bg-base-200 max-w-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control gap-4">
          <input
            value={isPublic}
            onChange={e=>setIsPublic(e.target.checked)}
            type="checkbox"
            className="toggle"
            id="publicToggle"
          />
          <label htmlFor="publicToggle" className="text-2xl">
            Do you want to make this code as public?
          </label>
        </div>
      </div>

      <div className="form-control gap-2">
        <label htmlFor="codeDrop" className="flex">
          CodeDrop
          <FaAsterisk size={8} className="mt-1" color="red" />
        </label>
        <MdEditor
          value={codeDrop}
          onChange={setCodeDrop}
          preview="edit"
          height={430}
          visibleDragbar={false}
          id="codeDrop"
        />
      </div>
      <div className="grid grid-cols-2 max-w-xs gap-4">
        <button
          disabled={!codeDrop}
          className={`btn btn-success ${loading ? "loading" : ""}`}
        >
          <FaSave />
          Save
        </button>
        <button onClick={() => navigate("/")} className="btn btn-warn">
          <TiCancel size={22} />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Create;
