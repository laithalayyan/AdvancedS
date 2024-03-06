const pool = require("../../DataBase/database");

module.exports = {
    /*rent: (data, callBack) => {
      pool.query(
        `insert into rent(tool_id,user_id,start_date,end_date) 
        values(?,?,?,?)`,
        [
          data.tool_id,
          data.user_id,
          data.start_date,
          data.end_date,
          
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },*/

    rent : (data, callBack) => {
        // First, check if the tool is available
        pool.query(
          `SELECT available FROM resources WHERE id = ?`,
          [data.tool_id],
          (error, results, fields) => {
            if (error) {
              // Database error during the availability check
              callBack(error);
            } else if (results.length === 0 || results[0].available !== 'yes') {
              // Tool does not exist or is not available
              callBack(new Error('Tool is not available'));
            } else {
              // Tool is available, proceed with the rent insert
              pool.query(
                `INSERT INTO rent(tool_id, user_id, start_date, end_date) VALUES (?, ?, ?, ?)`,
                [data.tool_id, data.user_id, data.start_date, data.end_date],
                (insertError, insertResults, insertFields) => {
                  if (insertError) {
                    callBack(insertError);
                  } else {
                    callBack(null, insertResults);
                  }
                }
              );
            }
          }
        );
      },

    updateRentStatus: (data, callBack) => {
        pool.query(
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
        pool.query(
          `select * from rent where user_id = ?`,
          [user_id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },

      getRents: callBack => {
        pool.query(
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
      pool.query(
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


