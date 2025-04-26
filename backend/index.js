const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://book-app-frontend-tau.vercel.app'],
    credentials: true
}))

// routes
const bookRoutes = require('./src/books/book.route');
const userRoutes =  require("./src/users/user.route")
const reviewRoutes = require('./src/review/review.route');
const AuthRouter = require('./src/users/AuthRouter')

app.use('/auth', AuthRouter);
app.use("/api/books", bookRoutes)
app.use("/api/auth", userRoutes)
// app.use("/api/admin", adminRoutes)
app.use('/api/reviews', reviewRoutes);
async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use("/", (req, res) => {
    res.send("Book Store Server is running!");
  });
}

main().then(() => console.log("Mongodb connect successfully!")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
