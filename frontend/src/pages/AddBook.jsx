import React, { useState } from "react";
import "../assets/sass/form.scss";
import api from "../api/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState();
  const navigate = useNavigate();

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const addBook = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await api.post(
        "/book/add",
        {
          ...formData,
          image: imageData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   console.log(response);
      if (response.data.data.id) {
        console.log("Success");
        toast.success("Added New Book");
        e.target.reset();
        setFormData({});
        setImageData();
        navigate("/dashboard");
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(response.data.message);
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
        onSubmit={addBook}
      >
        Name:
        <input type="text" name="name" onChange={handelChange} />
        Author:
        <input type="text" name="author" onChange={handelChange} />
        Genre:
        <input type="text" name="genre" onChange={handelChange} />
        Description:
        <textarea
          name="description"
          onChange={handelChange}
          cols="30"
          rows="10"
        ></textarea>
        Image:
        <input
          type="file"
          name="image"
          onChange={(e) => setImageData(e.target.files[0])}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddBook;
