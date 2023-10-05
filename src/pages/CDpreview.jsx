import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";
import { FaEdit, FaGlobe, FaLink } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { databases, getCurrentUser } from "../helper/appwrite";

const CDpreview = () => {
  const { id } = useParams();
  const [codeDrop, setCodeDrop] = useState({});
  const [isUserOwner, setIsUserOwner] = useState(false);

  const [setFetchingCD] = useOutletContext();
  const navigate = useNavigate();

  const deleteCodeDrop = () => {
    const isConfirmend = confirm("Are your sure you want to delete");
    if (!isConfirmend) return;
    const promise = databases.deleteDocument(
      "651d2479343ba1410095",
      "651d24ada0661cbabf0b",
      id
    );
    promise
      .then(() => {
        alert("Codedrop deleted successfully");
        setFetchingCD(true);
        navigate("/");
      })
      .catch((err) => {
        alert(err);
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
          if (user && response.owner === user.$id) {
            setIsUserOwner(true);
          }
          if (response.owner !== user.$id && !response.isPublic === false) {
            navigate("/");
          }
          setCodeDrop(response);
        })
        .catch((err) => {
          alert("unable to find that document");
          navigate("/");
        });
    };
    fetchCD();
  }, [id, navigate]);
  return (
    <div className="min-h-screen w-full flex flex-col p-4 py-16 lg:py-8 gap-4">
      <h1 className="text-3xl flex gap-2 items-end">
        <span>{codeDrop.title} </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Private Link copied to your clipboard");
          }}
          className="btn-ghost rounded-ful btn-sm"
        >
          <FaLink />
        </button>
        {codeDrop.isPublic && (
          <button
            onClick={() => {
              navigator.clipboard.writeText("https://codedrop/public/" + id);
              alert("Public Link copied to your clipboard");
            }}
            className="btn-ghost rounded-ful btn-sm"
          >
            <FaGlobe />
          </button>
        )}
      </h1>
      <div className="div flex-1 bg-base-200 p-4 rounded-lg">
        <MDEditor.Markdown
          style={{ background: "transparent", fontsize: 24 }}
          source={codeDrop.codedrop}
        />
      </div>
      {isUserOwner && (
        <div className="grid grid-cols-2 gap-4 max-w-xs">
          <Link to={"/edit/" + id} className="btn btn-info">
            <FaEdit />
            Edit
          </Link>
          <button onClick={deleteCodeDrop} className="btn btn-error">
            <MdDelete size={20} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CDpreview;
