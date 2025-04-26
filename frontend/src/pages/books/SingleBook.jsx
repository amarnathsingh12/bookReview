import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import Star from './Star';


const SingleBook = () => {
    const { id: bookId } = useParams();
    const [books, setBooks] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [selectedStarCount, setSelectedStarCount] = useState(0);
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(bookId);
    const [hasUserReviewed, setHasUserReviewed] = useState(false);


    useEffect(() => {
        const func = async () => {
            const res = await fetch(`http://localhost:5000/api/reviews/${bookId}`);
            const data = await res.json();
            setReviews(data);

            const userId = localStorage.getItem('loggedInUserId');
            if (userId) {
                const alreadyReviewed = data.some(review => review.userId === userId);
                setHasUserReviewed(alreadyReviewed);
            }
        };
        func();
    }, [bookId]);


    useEffect(() => {
        const func = async () => {
            const res = await fetch(`http://localhost:5000/api/books/${bookId}`);
            const data = await res.json()
            setBooks(data);
        }
        func()
    }, [bookId]);

    useEffect(() => {
        const func = async () => {
            const res = await fetch(`http://localhost:5000/api/reviews/${bookId}`);
            const data = await res.json()
            setReviews(data);
        }
        func()
    }, [bookId]);

    const [review, setReview] = useState('');

    useEffect(() => {
        if (book) {
            setReview(book.review);
        }
    }, [book]);

    const handleSubmitReview = async () => {
        const userId = localStorage.getItem('loggedInUserId'); // <--- GET IT
        if (!userId) {
            alert("Please log in to submit a review.");
            return;
        }

        const newReview = {
            bookId,
            userId,
            rating: selectedStarCount,
            reviews: review
        };

        try {
            const res = await fetch("http://localhost:5000/api/reviews/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newReview)
            });

            if (!res.ok) throw new Error("Failed to post review");
            const savedReview = await res.json();
            setReviews(prev => [savedReview, ...prev]);
            setRating('');
            setReview('');
            alert("Review submitted successfully!");
        } catch (err) {
            console.error("Submit error:", err);
            alert("Failed to submit review.");
        }
    };


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading book info</div>;

    return (
        <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{book.bookName}</h1>

            <div>
                <img
                    src={book?.coverImage}
                    alt={book.movieName}
                    className="mb-8"
                />

                <p className="mb-6"><strong>Average Rating:</strong> {book.averageRating}</p>

                <div className="mb-5">
                    <p className="text-gray-700 mb-4">
                        <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-gray-700 mb-2"><strong>Price: $</strong> {book.price}</p>

                    <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>

                    <div className="mb-4">
                        <label className="block text-gray-700"><strong>Rating:</strong></label>
                        <Star
                            selectedStarCount={selectedStarCount}
                            setSelectedStarCount={setSelectedStarCount}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700"><strong>Review:</strong></label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            disabled={hasUserReviewed}
                        />
                    </div>

                    <button
                        onClick={handleSubmitReview}
                        className="btn-primary px-6 py-2 bg-blue-600 text-white rounded"
                        disabled={hasUserReviewed}
                    >
                        Submit Review
                    </button>

                    {/* Scrollable Reviews Section */}
                    <div className="mt-6 max-h-60 overflow-y-scroll border rounded p-3">
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <div key={review._id} className="border-b py-2">
                                    <p className="font-semibold">{review.userId?.name || "Anonymous"}</p>
                                    <p>{review.reviews}</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet for this book.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleBook;
