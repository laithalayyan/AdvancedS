const router = require("express").Router();
//const { checkToken } = require("../../auth/token_validation");
const {
  createResource,
  getResourceByName,
  getResources,
  updateResource,
  deleteResource,
  getResourceByUserId
} = require("./user.controller");

router.post("/:user_id",createResource); // create a new resource
router.get("/",getResources);
router.get("/:user_id",getResourceByUserId);
router.get("/:name",getResourceByName);
router.patch("/",updateResource);
router.delete("/:user_id/:id",deleteResource);

module.exports = router;
