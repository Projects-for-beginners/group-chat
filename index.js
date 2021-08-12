const http = require('http');
const express = require("express");
const path = require('path');
const morgan = require("morgan");
const { Console } = require('console');

const hostname = "localhost";
const port = 3000;

const app = express()


app.use(morgan("dev"));
const staticPath = path.resolve(__dirname, 'Public');
app.use(express.static(staticPath));


const Server = http.createServer(app);

Server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
