const Review = require('./review');
const Book = require('../books/book.model');
const User = require('../users/user.model')

const addReview = async (req, res) => {
  try {
    const { bookId, userId, rating, reviews } = req.body;

    const alreadyReviewed = await Review.findOne({ bookId, userId });
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You've already reviewed this book." });
    }

    const addBookReview = new Review({ bookId, userId, rating, reviews });
    await addBookReview.save();

    // Update Book's avg rating and review count
    const updateReview = await Review.find({ bookId });
    const avgRating = updateReview.reduce((sum, r) => sum + r.rating, 0) / updateReview.length;

    await Book.findByIdAndUpdate(bookId, {
      averageRating: avgRating,
      totalReviews: updateReview.length,
    });

    res.status(201).json({ message: "Review added", updateReview });
  } catch (err) {
    res.status(500).json({ message: "Failed to add review", error: err.message });
  }
};

const getReviewsByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ bookId }).populate('userId', 'name').sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

module.exports = { addReview, getReviewsByBookId };