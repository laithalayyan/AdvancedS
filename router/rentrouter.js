const express = require("express");
const rentsController = require('./controller');
const router = express.Router();

router.post("/",rentsController.rentResource); // create a new rent
router.get("/",rentsController.getRents);
router.get("/:user_id",rentsController.getRentByUserId);
router.patch("/",rentsController.updateRentStatus);
router.delete("/:rent_id",rentsController.deleteRent);

module.exports = router;
