const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router =  express.Router();

// frontend => backend server => controller => book schema  => database => send to server => back to the frontend

// post a book
router.post("/create-book", verifyAdminToken, postABook)

// get all books
router.get("/", getAllBooks);

// single book endpoint
router.get("/:id", getSingleBook);



module.exports = router;
