import React, { useEffect, useState } from "react";
import api from "../api/config";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [bookList, setBookList] = useState([]);
  const [tempBookList, setTempBookList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchBooks() {
      const response = await api.get("/book");
      setBookList(response.data);
      setTempBookList(response.data);
    }
    fetchBooks();
  }, []);
  useEffect(() => {
    async function searchBooks() {
      const response = await api.get(`/book/search/all?q=${searchText}`);
      if (response.data) {
        console.log(response.data);
        setBookList(response.data);
      } else {
        setBookList(tempBookList);
      }
    }
    if (searchText == "") {
      setBookList(tempBookList);
    } else searchBooks();
  }, [searchText]);
  return (
    <>
      <center>
        <input
          type="text"
          name="search"
          placeholder="Search Books..."
          style={{ margin: "30px", padding: "5px", width: "50%" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </center>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {bookList.length > 0
          ? bookList.map((book, index) => {
              return (
                <div
                  onClick={() =>
                    navigate("/explore", {
                      state: {
                        book,
                      },
                    })
                  }
                  key={index}
                  style={{
                    marginTop: "20px",
                    marginLeft: "20px",
                    boxShadow: "0px 0px 5px #ccc",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={book.image}
                    alt={`book ${index}`}
                    style={{
                      height: "250px",
                      width: "250px",
                      objectFit: "contain",
                    }}
                  />
                  <br />
                  {book.name}
                </div>
              );
            })
          : "No books found"}
      </div>
    </>
  );
};

export default HomePage;
