const express = require('express');
const router = express.Router();
const { addReview, getReviewsByBookId } = require('./review.controller');

router.post('/add', addReview);
router.get('/:bookId', getReviewsByBookId);

module.exports = router;
