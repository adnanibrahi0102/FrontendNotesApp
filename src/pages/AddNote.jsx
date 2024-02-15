import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import apiUrl from '../url';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import parse from 'html-react-parser';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const user = useSelector((state) => state.auth.userData && state.auth.userData);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user || !user.userData || !user.userData._id) {
        console.log("User data is missing");
        return;
      }
      if (!title && !content) {
        toast.error("Please fill all the fields");
        return;
      }
      const { data } = await axios.post(`${apiUrl}/api/v1/notes/create-note`, {
        title,
        content,
        user: user.userData._id
      });
      console.log(data)

      if (data.success) {
        toast.success("Note created successfully");
        navigate('/Allnotes');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while creating note");
    }
  }

  
  const parsedContent = parse(content);

  return (
    <div className='flex justify-center items-center mt-14'>
      <div className='flex flex-col sm:flex-row w-full'>
        {/* Note creation section */}
        <div className='bg-white w-full sm:w-1/2 p-4 rounded-md m-2 shadow-md shadow-white'>
          <h1 className='text-black text-center font-bold text-lg'>Create your note</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              className='w-full mb-2 border border-gray-300 outline-none rounded-md p-3'
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name='title'
              placeholder='Enter Your Title'
            />
            <label htmlFor="content">Content</label>
            <Editor
              apiKey='oxt1ixdric5d5fg59avm2gszwt3j24lr5vqdctm0yu6tqbpv'
              initialValue=""
              value={content}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                  'fontselect'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help',
                content_css: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
              }}
              onEditorChange={(newContent) => setContent(newContent)}
            />
            <div className='text-center mt-2'>
              <button className='bg-gray-900 text-gray-200 px-3 py-2 rounded-md shadow-md shadow-black border border-black hover:bg-gray-600' type='submit' >Create</button>
            </div>

          </form>
        </div>
        {/* Preview section */}
        <div className='bg-gray-900  w-full sm:w-1/2 p-4 rounded-md m-2 shadow-md shadow-white'>
          <h1 className='text-center font-bold text-lg text-white' >Preview</h1>
          {content.length > 0 || title.length > 0 ? (
            <div>
              <div className='bg-gray-700 p-3 rounded-md shadow-md shadow-white mb-3'>
                <h1 className='text-center font-bold text-lg '>{title}</h1>
              </div>
              <div>{parsedContent}</div>
            </div>
          ) : ("")}
        </div>
      </div>
    </div>
  );
}

export default AddNote;
