import express from "express";
import connection from "./models/index.js";
import bookRoute from "./routes/bookRoute.js";
import "dotenv/config.js";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
      origin: "http://localhost:3000",
      credentials: true, 
  })
);
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("Backend is Working");
});

app.use("/book", bookRoute);

app.listen(process.env.PORT || 8000, async () => {
  console.log("Server has started 🚀");
  try {
    await connection.authenticate();
    connection.sync();
    console.log("Successfully connected to database");
  } catch (err) {
    console.error("Error during connection to database: ", err);
  }
});
