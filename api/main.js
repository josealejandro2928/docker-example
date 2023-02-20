const { AppServer } = require("mini-express-server");
const { hostname } = require("os");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const app = new AppServer();

app.use(morgan("common"));
app.use(helmet());
app.use(bodyParser.json());

const bookRouter = require("./routes/index");

app.use("/book", bookRouter);

const version = 1
app.get("/", (req, res) => {
    res.send({
        message: "Hello from server",
        time: new Date(),
        hostName: hostname(),
        version: process.env.VERSION || version,
        NODE_PORT: 3000,
        requestId: Math.floor(Math.random() * 1000000)
    });
})

app.setErrorHandler((req, res, error) => {
    let code = 500;
    let message = "Error";
    if (typeof error == "object") {
        code = error.code || error.statusCode || code;
        message = error.message || message;
    } else {
        message = error.toString() || message;
    }
    return res.status(code).json({ message });
})
module.exports = app;