import { Op, where } from "sequelize";
import bookModel from "../models/bookModel.js";
import textConstants from "../constants/textConstants.js";
import urlConstants from "../constants/urlConstants.js";

export default class BookController {
  async addBook(req, res, imageName) {
    try {
      const data = await bookModel.create({
        ...req.body,
        image: imageName,
      });
      console.log(data);
      if (data) {
        res.json({ success: true, message: "Successfully added ", data });
      } else {
        res.json({ success: false, message: "Error during adding the book" });
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error while quering in database" });
    }
  }

  async getBookByID(req, res) {
    const { id } = req.params;
    if (id) {
      try {
        const data = await bookModel.findByPk(id);
        data
          ? res.json({ success: true, message: "Book found", data })
          : res.json({
              success: false,
              message: `Cannot find book with id: ${id}`,
            });
      } catch (err) {
        console.log(err);
        res.json({ success: false, message: err });
      }
    } else {
      res.json({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
    }
  }

  async updateBook(req, res) {
    const { id } = req.params;
    if (id) {
      req.body;
      try {
        const data = await bookModel.update(req.body, {
          where: {
            id,
          },
        });
        console.log(req.body);
        console.log(id);
        console.log(data);
        if (data[0]) {
          res.json({ success: true, message: "Book Updated Successfully" });
        } else {
          res.json({
            success: false,
            message: `Error while updating book with id: ${id}`,
          });
        }
      } catch (err) {
        console.log(err);
        res.json({ success: false, message: err });
      }
    } else {
      res.json({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
    }
  }

  async deleteBook(req, res) {
    const { id } = req.params;
    if (id) {
      try {
        const data = await bookModel.destroy({
          where: {
            id,
          },
        });
        if (data) {
          res.json({ success: true, message: "Book deleted Successfully" });
        } else {
          res.json({
            success: false,
            message: `Error while deleting book with id: ${id}`,
          });
        }
      } catch (err) {
        console.log(err);
        res.json({ success: false, message: err });
      }
    } else {
      res.json({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
    }
  }

  async searchBook(req, res) {
    const { q } = req.query;
    if (q) {
      try {
        const data = await bookModel.findAll({
          where: {
            [Op.or]: {
              name: {
                [Op.like]: `%${q}%`,
              },
              author: {
                [Op.like]: `%${q}%`,
              },
            },
          },
          raw: true,
        });
        if (data.length > 0) {
          for (let d of data) {
            d.image = urlConstants.IMAGE_PATH + d.image;
          }
          res.json(data);
        } else {
          res.json({ success: false, message: "Coundn't find books" });
        }
      } catch (err) {
        console.log(err);
        res.json({ success: false, message: err });
      }
    } else {
      res.json({ success: false, message: "Search Query not Provided" });
    }
  }

  async getBookList(req, res) {
    let { limit } = req.query;
    if (!limit) limit = 20;

    try {
      const data = await bookModel.findAll({
        limit: parseInt(limit),
        raw: true,
      });
      for (let d of data) {
        d.image = urlConstants.IMAGE_PATH + d.image;
      }
      res.json(data);
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: err });
    }
  }
}
