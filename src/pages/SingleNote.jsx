import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import apiUrl from "../url";
import parse from "html-react-parser";
import UpdateNote from "../components/UpdateNote";

const SingleNote = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const getSingleNote = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/v1/notes/getsingle-note/${id}`
        );
        if (data.success) {
          setNote(data.note);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

    // Checking if id exists before calling getSingleNote
    if (id) {
      getSingleNote();
    }
  }, [id]);

  //delete functionality
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${apiUrl}/api/v1/notes/delete-note/${id}`
      );
      if (data.success) {
        toast.success("Note deleted successfully");
        navigate("/Allnotes");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  if (!note) {
    return <div>Loading...</div>;
  }
  const createdAt = new Date(note.createdAt);
  const formatedDate = createdAt.toLocaleString();
  return (
    <div className="flex justify-center items-center">
      <div className="m-12 bg-gray-900 w-full rounded-md shadow-md shadow-white">
        <div className="w-full p-5  text-white ">
          <h1 className="text-center text-lg p-2 mb-2">{note.title}</h1>
          <p>{parse(note.content)}</p>
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-600 ">Created At: {formatedDate}</p>
        </div>
        <div className="flex justify-end mb-2 mr-3">
        <button onClick={()=>navigate('/Allnotes')} className=" bg-indigo-500 px-4 py-2 rounded-md">Back</button>

          <button onClick={()=>setShowModal(true)} className="bg-blue-500 text-black px-4 py-2 ml-2 rounded-md hover:bg-blue-900">
            Modify
          </button>
          <button
            onClick={() => handleDelete(note._id)}
            className="bg-red-500 text-black px-4 py-2 ml-2 rounded-md hover:bg-red-900"
          >
            Delete
          </button>
          <UpdateNote
           visible={showModal}
           onCancel={() => setShowModal(false)}
           note={note}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleNote;
