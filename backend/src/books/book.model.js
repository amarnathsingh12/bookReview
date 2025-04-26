const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Book = mongoose.model('book', bookSchema);
module.exports = Book;
