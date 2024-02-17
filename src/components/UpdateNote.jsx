import React, { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import apiUrl from '../url'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Modal, Input, Button } from "antd";
import { Editor } from "@tinymce/tinymce-react";
const UpdateNote = ({note,onCancel,visible}) => {
    const [title, setTitle] = useState(note?.title);
    const [content, setContent] = useState(note?.content);
    const navigate=useNavigate();
    const {id}=useParams();

    const handleUpdate=async()=>{
        try {
           const {data}=await axios.put(`${apiUrl}/api/v1/notes/update-note/${id}`,{
            title,
            content
           });
           if(data.success){
               onCancel()
               toast.success("Note updated successfully");
               navigate('/Allnotes');
           }     
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    const handleEditorChange = (content, editor) => {
        setContent(content);
      };
  return (
    <div>
       <Modal
      title="Update Note"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button className='bg-indigo-900' key="submit" type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <Editor
        apiKey="oxt1ixdric5d5fg59avm2gszwt3j24lr5vqdctm0yu6tqbpv"
        initialValue={content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={handleEditorChange}
      />
    </Modal>
    </div>
  )
}

export default UpdateNote
