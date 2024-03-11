const {
    create,
    getResourceByName,
    getResources,
    updateResource,
    deleteResource,
    getResourceByUserId
  } = require("./user.service");



  
  module.exports = {
    createResource: (req, res) => {
      const body = req.body;
      const user_id = req.params.user_id;
      create(body, user_id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error"
          });
        }
    
        // Check if the tool already exists message was returned
        if (results.message === "Tool already exists") {
          return res.status(409).json({  // HTTP status code 409: Conflict
            success: 0,
            message: "Tool already exists"
          });
        }
    
        return res.status(200).json({
          success: 1,
          message: "Tool added successfully"
        });
      });
    },

    getResource: (req,res)=> {
      const param = req.params.param;
      
      const isNumeric = (str) => {
        return !isNaN(str) && !isNaN(parseFloat(str));
      };

      if (isNumeric(param)) {
          getResourceByUserId(param, (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            if (!results) {
              return res.json({
                success: 0,
                message: "User not Found"
              });
            }
            return res.json({
              success: 1,
              data: results
            });
          });
      } else {
          getResourceByName(param, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: 0,
                message: "Database connection error"
              });
            }
            if (!results) {  // Correctly handles both errors and not found situations
              return res.status(404).json({  // HTTP status code 404: Not Found
                success: 0,
                message: "Tool Name not found"
              });
            }
            return res.json({
              success: 1,
              data: results
            });
          });
      }
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
      updateResource(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error"
          });
        }
        if (!results) { // This condition is true if `affectedRows` was 0
          return res.json({
            success: 0,
            message: "This tool is not found"
          });
        }
        // Optionally, you might want to check results.affectedRows here again if you return results directly
        return res.json({
          success: 1,
          message: "Updated successfully"
        });
      });
    },

    deleteResource: (req, res) => {
      const id = req.params.id;
      const user_id = req.params.user_id;
      deleteResource(id, user_id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error"
          });
        }
        if (!results) { // This condition will be true if `affectedRows` was 0
          return res.status(404).json({ // Using HTTP status code 404: Not Found
            success: 0,
            message: "Resource Not Found"
          });
        }
        return res.json({
          success: 1,
          message: "Resource deleted successfully"
        });
      });
    },
  };
  
