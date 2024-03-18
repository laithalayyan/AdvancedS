const {
  rent,
  updateRentStatus,
  getRentByUserId,
  getRents,
  deleteRent
} = require("./service");

const moment = require('moment');

module.exports = {

  rentResource : (req, res) => {
      const body = req.body;
      const dateFormat = "YYYY-MM-DD";
      
      // Date format validation
      if (!moment(body.start_date, dateFormat, true).isValid() ||
          !moment(body.end_date, dateFormat, true).isValid()) {
        return res.status(400).json({
          success: 0,
          message: "Invalid date format. Please use YYYY-MM-DD."
        });
      }
      
      // Attempt to rent the tool
      rent(body, (err, results) => {
        if (err) {
          console.log(err);
          if (err.message === 'Tool is not available') {
            return res.status(400).json({
              success: 0,
              message: "Tool is not available"
            });
          } else {
            return res.status(500).json({
              success: 0,
              message: "Database connection error"
            });
          }
        }
        return res.status(200).json({
          success: 1,
          data: "Your reservation is done."
        });
      });
    },

  updateRentStatus: (req, res) => {
      const body = req.body;
      const allowedStatuses = ['active', 'completed', 'canceled'];
     if (!allowedStatuses.includes(body.rent_status)) {
      return res.status(400).json({
        success: 0,
        message: "Invalid rent status. Allowed values are: active, completed, canceled."
      });
    }
    const dateFormat = "YYYY-MM-DD";
    if (!moment(body.start_date, dateFormat, true).isValid() ||
          !moment(body.end_date, dateFormat, true).isValid()) {
      return res.status(400).json({
          success: 0,
          message: "Invalid date format. Please use YYYY-MM-DD."
      });
     }

      updateRentStatus(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if(!results) {
          return res.json({
            success: 0,
            message: "Failed to update rental status"
          });
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
    },

    getRentByUserId: (req, res) => {
      const user_id = req.params.user_id;
      getRentByUserId(user_id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error"
          });
        }
        if (results.length === 0) { // Use results.length to check for no results
          return res.json({
            success: 0,
            message: "No Rents found for user"
          });
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },

  getRents: (req, res) => {
      getRents((err, results) => {
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

  deleteRent: (req, res) => {
    const rent_id = req.params.rent_id;
    deleteRent(rent_id, (err, results) => {
      if (err) {
          console.log(err);
          if (err.message === "Rent Not Found") {
            return res.json({
              success: 0,
              message: "Rent Not Found"
            });
          } else {
            return res.json({
              success: 0,
              message: "An error occurred"
            });
          }
        }
        return res.json({
          success: 1,
          message: "Rent deleted successfully"
        });
      });
  }
};