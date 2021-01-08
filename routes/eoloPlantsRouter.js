"use strict"

const express = require("express");
const eoloPlantsRouter = express.Router();
const eoloPlantsController = require("../controllers/eoloPlantsController");

eoloPlantsRouter.get("/eoloplants", eoloPlantsController.findAll);
eoloPlantsRouter.post("/eoloplants", eoloPlantsController.save);
eoloPlantsRouter.delete("/eoloplants", eoloPlantsController.remove);

module.exports = eoloPlantsRouter;