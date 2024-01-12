import React from "react";
import { useLocation } from "react-router-dom";

const Explore = () => {
  const location = useLocation();
  const book = location.state.book;
  console.log(book);
  return (
    <div>
      <div
        style={{
          marginTop: "20px",
          marginLeft: "20px",
          boxShadow: "0px 0px 5px #ccc",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
        <img
          src={book.image}
          style={{
            height: "250px",
            width: "250px",
            objectFit: "contain",
          }}
        />
        <br />
        <h3>{book.name}</h3>
        Author: <br />
        <small>{book.author}</small>
        <br />
        Genre: <br />
        <small>{book.genre}</small>
        <br />
        Description: <br />
        <small>{book.description}</small>
      </div>
    </div>
  );
};

export default Explore;
