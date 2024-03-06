const {
    create,
    getResourceByName,
    getResources,
    updateResource,
    deleteResource,
    getResourceByUserId
  } = require("./user.service");

  //const { sign } = require("jsonwebtoken");
  
  module.exports = {
    createResource: (req, res) => {
      const body = req.body;
      const user_id = req.params.user_id;
      create(body,user_id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },

    getResourceByUserId: (req, res) => {
      const user_id = req.params.user_id;
      getResourceByUserId(user_id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Resource not Found"
          });
        }
        //results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },

    getResourceByName: (req, res) => {
      const name = req.params.name;
      getResourceByName(name, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Resource not Found"
          });
        }
        //results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },

    getResources: (req, res) => {
      getResources((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },

    updateResource: (req, res) => {
      const body = req.body;
      //const salt = genSaltSync(10);
      //body.password = hashSync(body.password, salt);
      updateResource(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if(!results) {
          return res.json({
            success: 0,
            message: "Failed to update resource"
          });
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
    },

    deleteResource: (req, res) => {
      const id = req.params.id;
      const user_id = req.params.user_id;
      deleteResource(id,user_id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Resource Not Found"
          });
        }
        return res.json({
          success: 1,
          message: "resource deleted successfully"
        });
      });
    }
  };
  