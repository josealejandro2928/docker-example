const { ServerError } = require("mini-express-server");

class Book {
    id;
    title;
    author;
    year;
    static counter = 0
    static books = [];

    constructor(title, author, year) {
        this.setAuthor(author);
        this.setTitle(title);
        this.setYear(year);
        this.id = ++Book.counter;
    }


    setTitle(value) {
        if (!value || value.length < 5) throw new ServerError(400, "Title invalid");
        if (Book.books.find((b) => b.title.toLowerCase() == value.toLowerCase()))
            throw new ServerError(400, "The title already exists");
        this.title = value;
        return this;
    }

    setAuthor(value) {
        if (!value || value.length < 5) throw new ServerError(400, "Author invalid");
        this.author = value;
        return this;
    }

    setYear(value) {
        if (isNaN(+value) || !value || +value < 1900 || +value > 2023) throw new ServerError(400, "Year invalid");
        this.year = +value;
        return this;
    }

}

module.exports = {
    Book
}