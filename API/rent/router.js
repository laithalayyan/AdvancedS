const router = require("express").Router();

const {
    rentResource,
    updateRentStatus,
    getRentByUserId,
    getRents,
    deleteRent
} = require("./controller");

router.post("/",rentResource); // create a new rent
router.get("/",getRents);
router.get("/:user_id",getRentByUserId);
router.patch("/",updateRentStatus);
router.delete("/:rent_id",deleteRent);

module.exports = router;
