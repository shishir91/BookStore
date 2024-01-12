import { Router } from "express";
import BookController from "../controllers/BookController.js";
import multer from "multer";

const router = Router();
const bookController = new BookController();

let imageName;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    imageName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname.trim();
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), (req, res) =>
  bookController.addBook(req, res, imageName)
);

router.get("/:id", bookController.getBookByID);

router.put("/update/:id", bookController.updateBook);

router.delete("/delete/:id", bookController.deleteBook);

router.get("/search/all", bookController.searchBook);

router.get("/", bookController.getBookList);

export default router;
