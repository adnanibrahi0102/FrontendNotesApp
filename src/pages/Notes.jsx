import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiUrl from "../url";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const user = useSelector(
    (state) => state.auth.userData && state.auth.userData
  );

  const getAllNotes = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/notes/getAll-Notes/${user.userData._id}`
      );
      if (data.success) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting all notes");
    }
  };
  useEffect(() => {
    getAllNotes();
  }, []);
 

  return (
    <div>
      <h1 className="text-white text-center">{`Hey! ${user.userData.name} You Have ${notes.length} Notes`}</h1>
      <div className="flex flex-wrap">
        {notes.map((note) => (
          <div key={note._id} className="w-full sm:w-1/2 md:w-1/3 p-4">
            <Link to={`/single-note/${note._id}`}>
              <div className="relative bg-gray-900 text-white border shadow-md shadow-white p-3 rounded-lg h-96 overflow-hidden transform transition-transform hover:scale-105 hover:bg-gray-800">
                <h2 className="text-lg text-center font-semibold p-2">
                  {note.title}
                </h2>
                <p className="text-gray-600">
                  {note.content.length > 600
                    ? parse(note.content.substring(0, 600) + "...")
                    : parse(note.content)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
