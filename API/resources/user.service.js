const pool = require("../../DataBase/database");

module.exports = {
  create: (data, user_id, callBack) => {
    // First, check if a resource with the same name already exists
    pool.query(
      `SELECT * FROM resources WHERE name = ? AND user_id= ?`,
      [data.name,
      user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
  
        // If a resource is found, return a message indicating it already exists
        if (results.length > 0) {
          return callBack(null, { message: "Tool already exists" });
        } else {
          // If no existing resource is found, proceed to create a new one
          pool.query(
            `INSERT INTO resources(name, available, user_id, description, toolstatus, price) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              data.name,
              data.available,
              user_id,
              data.description,
              data.toolstatus,
              data.price
            ],
            (error, results, fields) => {
              if (error) {
                return callBack(error);
              }
              return callBack(null, results);
            }
          );
        }
      }
    );
  },

    getResources: callBack => {
      pool.query(
        `select id,name,available,user_id,description,toolstatus,price from resources`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    
    getResourceByName: (param, callBack) => {
      pool.query(
        `SELECT * FROM resources WHERE name = ?`,
        [param],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          // Check if results array is empty, meaning the resource was not found
          if (results.length === 0) {
            return callBack(null, null);  // Call back with null error and null results to indicate not found
          }
          return callBack(null, results);  // Return the first result if found
        }
      );
    },
    
    getResourceByUserId: (param, callBack) => {
      pool.query(
        `select * from resources where user_id = ?`,
        [param],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },


    updateResource: (data, callBack) => {
      pool.query(
        `update resources set name=?, available=?, user_id=?, description=?, toolstatus=?, price=?  where id = ?`,
        [
          data.name,
          data.available,
          data.user_id,
          data.description,
          data.toolstatus,
          data.price,
          data.id
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          if (results.affectedRows === 0) {
            return callBack(null, null); // Indicates no row was updated (ID not found)
          }
          return callBack(null, results);
        }
      );
    },

    deleteResource: (id, user_id, callBack) => {
      pool.query(
        `DELETE FROM resources WHERE id = ? AND user_id = ?`, // Assuming you want to check both id and user_id
        [id, user_id],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          // Check if any rows were actually deleted
          if (results.affectedRows === 0) {
            return callBack(null, null); // Indicating no row was deleted (ID not found or user_id doesn't match)
          }
          return callBack(null, results);
        }
      );
    },
  };
  