"use strict"

const express = require('express');
const logger = require('morgan');
const config = require("./config");
const path = require("path");
const app = express();

const staticFiles = path.join(__dirname, "public");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// declare routers
const eoloPlantsRouter = require("./routes/eoloPlantsRouter");

app.use(logger(config.logging));
app.use(express.json());
app.use(express.static(staticFiles));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// routers use
app.use("/api", eoloPlantsRouter);

app.use(middlewareNotFound);
app.use(middlewareServerError);

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

const server = app.listen(config.port, err => {
    if (err)
        console.error(`No se ha podido iniciar el servidor: ${err.message}`)
    else
        console.log(`Servidor arrancado en el puerto ${config.port}`)
});

const io = require("socket.io")(server);
app.set("io", io);

io.on("connection", socket => {

    socket.emit("connection");

    socket.on("updatePlants", () => {
        socket.broadcast.emit("updatePlants"); // a todos los demas
        socket.local.emit("updatePlants"); // a mi mismo
    });

});