const app = require("./api/main");

const port = process.env.NODE_PORT || process.argv[2] || 3000;

app.listen(port, (dataAddress) => {
    console.log("Server listening: ", dataAddress);
})