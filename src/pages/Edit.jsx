import MdEditor from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";
import { FaAsterisk, FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { databases, getCurrentUser } from "../helper/appwrite";

const Edit = () => {
  const { id } = useParams();
  const [codeDrop, setCodeDrop] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialCD, setIntialCD] = useState({});
  const [setFetchingCD] = useOutletContext();
  const [changed, setChanged] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();

  const editCodeDrop = async (e) => {
    e.preventDefault();
    setLoading(true);
    const promise = databases.updateDocument(
      "651d2479343ba1410095",
      "651d24ada0661cbabf0b",
      id,
      {
        title,
        codedrop: codeDrop,
        isPublic: isPublic,
      }
    );
    promise
      .then(() => {
        setFetchingCD(true);
        navigate("/" + id);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const fetchCD = async () => {
      const user = await getCurrentUser();
      const promise = databases.getDocument(
        "651d2479343ba1410095",
        "651d24ada0661cbabf0b",
        id
      );
      promise
        .then((response) => {
          if (response.owner !== user.$id) {
            alert(
              "You cannot edit this codedrop because it doesnot belong to you"
            );
            navigate("/");
          }
          setTitle(response.title);
          setCodeDrop(response.codedrop);
          setIsPublic(response.isPublic);
          setIntialCD(response);
        })
        .catch((err) => alert(err));
    };
    fetchCD();
  }, [id, navigate]);

  useEffect(() => {
    if (
      title !== initialCD.title ||
      codeDrop !== initialCD.codedrop ||
      isPublic !== initialCD.isPublic
    ) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [
    title,
    codeDrop,
    isPublic,
    initialCD.title,
    initialCD.codeDrop,
    initialCD.isPublic,
  ]);

  return (
    <form
      onSubmit={editCodeDrop}
      className="min-h-screen w-full flex flex-col p-4 py-16 lg:py-1 gap-4"
    >
      <h1 className="text-2xl">Edit a CodeDrop</h1>
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
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
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
          disabled={!changed}
          className={`btn btn-success ${loading ? "loading" : ""}`}
        >
          <FaSave />
          Update
        </button>
        <button onClick={() => navigate("/")} className="btn btn-warn">
          <TiCancel size={22} />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Edit;
