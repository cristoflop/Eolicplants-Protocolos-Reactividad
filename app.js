"use strict"

const express = require('express');
const logger = require('morgan');
const config = require("./config");
const path = require("path");
const server = express();

const http = require("http");
const socketServer = http.Server(server);
const io = require("socket.io")(socketServer);

const staticFiles = path.join(__dirname, "public");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// declare routers
const eolicPlantsRouter = require("./routes/eolicPlantsRouter");

server.use(logger(config.logging));
server.use(express.json());
server.use(express.static(staticFiles));
server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());

// routers use
server.use("/", eolicPlantsRouter);

server.use(middlewareNotFound);
server.use(middlewareServerError);

function middlewareNotFound(request, response) {
    response.status(404);
    response.json({
        message: `${request.url} not found`
    });
}

function middlewareServerError(error, request, response, next) {
    response.status(500);
    response.json(error);
}

server.listen(config.port, err => {
    if (err)
        console.error(`No se ha podido iniciar el servidor: ${err.message}`)
    else
        console.log(`Servidor arrancado en el puerto ${config.port}`)
});

io.on("connection", function (socket) {
    console.log("conexion establecida");
    socket.emit("messages", messages);
});