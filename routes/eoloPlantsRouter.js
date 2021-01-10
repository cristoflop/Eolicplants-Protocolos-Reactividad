"use strict"

const express = require("express");
const eoloPlantsRouter = express.Router();
const eoloPlantsController = require("../controllers/eoloPlantsController");

eoloPlantsRouter.get("/eoloplants", eoloPlantsController.findAll);
eoloPlantsRouter.get("/eoloplants/:id", eoloPlantsController.find);
eoloPlantsRouter.post("/eoloplants", eoloPlantsController.publish);
eoloPlantsRouter.delete("/eoloplants", eoloPlantsController.remove);

module.exports = eoloPlantsRouter;