import React from 'react'
import { Link } from 'react-router-dom'
import StarRating from "../../components/StarRating"
const BookCard = ({ book }) => {
    const isDirectImageLink = book?.coverImage?.endsWith('.png') || book?.coverImage?.includes('.png');

    return (
        <div className=" rounded-lg transition-shadow duration-300">
            <div
                className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4"
            >
                <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
                    <Link to={`/books/${book._id}`}>
                        {isDirectImageLink ? (
                            <a href={book.coverImage} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={book?.coverImage}
                                    alt=""
                                    className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                                />
                            </a>
                        ) : (
                            <img
                                src={book?.coverImage}
                                alt=""
                                className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                            />
                        )}
                    </Link>
                </div>


                <div>
                    <Link to={`/books/${book._id}`}>
                        <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                            {book?.bookName}
                        </h3>
                    </Link>
                    <p className="text-gray-600 mb-5">{book?.description.length > 80 ? `${book.description.slice(0, 80)}...` : book?.description}</p>
                    <p className="font-medium mb-5">
                        ${book.price}
                    </p>
                    <p className="font-medium mb-2 flex items-center gap-2">
                        Rating:
                        <StarRating rating={book?.averageRating || 0} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BookCard