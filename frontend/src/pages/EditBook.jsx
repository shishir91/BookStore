import React, { useState, useEffect } from "react";
import "../assets/sass/form.scss";
import api from "../api/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

const EditBook = () => {
  const location = useLocation();
  const book = location.state.book;
  console.log(book);
  const [formData, setFormData] = useState(book);
  const [editedData, setEditedData] = useState({});
  const [imageData, setImageData] = useState();
  const navigate = useNavigate();
  //   console.log(formData.id);

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };
  const editBook = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.id);
      console.log(editedData);
      console.log(imageData);
      // let id = toString(formData.id)
      // console.log(`/book/update/${formData.id}`);
      const response = await api.put(
        `/book/update/${book.id}`,
        {
          ...editedData,
          // image: imageData,
        }
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      console.log(response);
      if (response.data.success) {
        console.log("Success");
        e.target.reset();
        setFormData({});
        setImageData();
        navigate("/dashboard", {
          state: {
            toastMessage: response.data.message,
          },
        });
        toast.success(response.data.message);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <ToastContainer />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={editBook}
      >
        Name:
        <input
          type="text"
          name="name"
          onChange={handelChange}
          value={formData.name}
        />
        Author:
        <input
          type="text"
          name="author"
          onChange={handelChange}
          value={formData.author}
        />
        Genre:
        <input
          type="text"
          name="genre"
          onChange={handelChange}
          value={formData.genre}
        />
        Description:
        <textarea
          name="description"
          onChange={handelChange}
          cols="30"
          rows="10"
          value={formData.description}
        ></textarea>
        Image:
        <input
          type="file"
          name="image"
          onChange={(e) => setImageData(e.target.files[0])}
        />
        <input type="submit" value="Edit Book" />
      </form>
    </div>
  );
};

export default EditBook;
