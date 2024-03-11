const router = require("express").Router();

const {
  createResource,
  getResourceByName,
  getResources,
  updateResource,
  deleteResource,
  getResource,
  getResourceByUserId
} = require("./user.controller");

router.post("/:user_id",createResource); // create a new resource
router.get("/",getResources);
//router.get("/:user_id",getResourceByName);
router.get("/:param",getResource);
router.patch("/",updateResource);
router.delete("/:user_id/:id",deleteResource);

module.exports = router;
