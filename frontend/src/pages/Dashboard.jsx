import React, { useEffect, useState } from "react";
import api from "../api/config";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  if (location.state) {
    toast.success(location.state.toastMessage);
    // location.state = null;
  }
  useEffect(() => {
    async function getBooks() {
      const response = await api.get("/book");
      if (response.data) {
        setBookList(response.data);
      }
    }
    getBooks();
  }, []);
  const deleteBook = async (bookName, bookID, idx) => {
    const res = window.confirm(
      `Are you sure you want to delete book ${bookName}`
    );
    if (res) {
      try {
        const response = await api.delete(`/book/delete/${bookID}`);
        if (response.data.success) {
          const newBookList = bookList.filter((book, index) => index !== idx);
          setBookList(newBookList);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    <center>
      <ToastContainer />
      <button
        className="btn btn-success"
        onClick={() => navigate("/dashboard/addBook")}
      >
        Add Book
      </button>
      {bookList.length > 0
        ? bookList.map((book, index) => {
            return (
              <div
                key={index}
                style={{
                  boxShadow: "0px 0px 5px #ccc",
                  padding: "10px",
                  margin: "10px",
                  width: "45%",
                  textAlign: "start",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>{book.name}</h3>
                  <FaTrash
                    onClick={() => deleteBook(book.name, book.id, index)}
                    color="red"
                    title="Delete Book"
                    style={{
                      cursor: "pointer",
                      marginTop: "20px",
                      fontSize: "20px",
                    }}
                  />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <small>By: {book.author}</small>
                  <FaEdit
                    title="Edit Book"
                    style={{ cursor: "pointer", fontSize: "20px" }}
                    onClick={() =>
                      navigate("/dashboard/editBook", {
                        state: {
                          book,
                        },
                      })
                    }
                  />
                </div>
              </div>
            );
          })
        : "No Books"}
    </center>
  );
};

export default Dashboard;
