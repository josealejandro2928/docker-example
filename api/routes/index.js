const { Router, ServerError } = require("mini-express-server");
const { Book } = require("./../models/index");
const router = new Router();

router.get("/", (req, res) => {
    res.send(Book.books);
})

router.get("/:bookId", (req, res) => {
    let book = Book.books.find((b) => b.id == req.params.bookId);
    if (!book) throw new ServerError(404, "Not found bookId");
    res.send(book);
})

router.post("/", (req, res) => {
    let book = new Book(req.body.title,req.body.author,req.body.year);
    Book.books.push(book);
    res.status(201).json(book);
})


module.exports = router