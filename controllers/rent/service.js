const pool2 = require("../../DataBase/databaseold");

module.exports = {

    rent: (data, callBack) => {
      // First, check if the tool is available
      pool2.query(
        `SELECT * FROM resources WHERE id = ? AND available = 'yes'`,
        [data.tool_id],
        (error, results, fields) => {
          if (error) {
            // Database error during the availability check
            callBack(error);
          } else if (results.length === 0) {
            // Tool does not exist or is not available
            callBack(new Error('Tool is not available'));
          } else {
            // Tool is available, proceed with the rent insert
            pool2.query(
              `INSERT INTO rent(tool_id, user_id, start_date, end_date) VALUES (?, ?, ?, ?)`,
              [data.tool_id, data.user_id, data.start_date, data.end_date],
              (insertError, insertResults, insertFields) => {
                if (insertError) {
                  callBack(insertError);
                } else {
                  // After successful insertion, update the tool's availability
                  pool2.query(
                    `UPDATE resources SET available = 'no' WHERE id = ?`,
                    [data.tool_id],
                    (updateError, updateResults, updateFields) => {
                      if (updateError) {
                        // If an error occurs during update, rollback the transaction or handle accordingly
                        callBack(updateError);
                      } else {
                        // Everything succeeded, call back with insert results
                        callBack(null, insertResults);
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    },

    
    

    updateRentStatus: (data, callBack) => {
        pool2.query(
          `update rent set start_date=?, end_date=?, rent_status=? where rent_id = ?`,
          [
            data.start_date,
            data.end_date,
            data.rent_status,
            data.rent_id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },

      getRentByUserId: (user_id, callBack) => {
        pool2.query(
          `SELECT * FROM rent WHERE user_id = ?`,
          [user_id],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            // Check if the results array is empty, indicating no rents found
            if (results.length === 0) {
              return callBack(null, []); // Pass an empty array to indicate no results found
            }
            return callBack(null, results);
          }
        );
      },

      getRents: callBack => {
        pool2.query(
          `select * from rent`,
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },


      deleteRent: (rent_id, callBack) => {
      pool2.query(
        `delete from rent where rent_id = ?`,
        [rent_id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }else if (results.affectedRows === 0) {
            // No rows were deleted, indicating the rent_id doesn't exist
            callBack(new Error("Rent Not Found"));
          } else {
          return callBack(null, results);
          }
        }
      );
    }
  };
