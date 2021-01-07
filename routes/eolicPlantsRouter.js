"use strict"

const express = require("express");
const eolicPlantsRouter = express.Router();
const eolicPlantsController = require("../controllers/eolicPlantsController");

eolicPlantsRouter.get("/eolic/", eolicPlantsController.findAll);
eolicPlantsRouter.post("/eolic/", eolicPlantsController.save);

module.exports = eolicPlantsRouter;