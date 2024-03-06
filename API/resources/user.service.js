const pool = require("../../DataBase/database");

module.exports = {
    create: (data,user_id, callBack) => {
      pool.query(
        `insert into resources(name,available,user_id,description,toolstatus,price) 
                  values(?,?,?,?,?,?)`,
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
            callBack(error);
          }
          return callBack(null, results);
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
    
    getResourceByName: (name, callBack) => {
      pool.query(
        `select * from resources where name = ?`,
        [name],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    },
    
    getResourceByUserId: (user_id, callBack) => {
      pool.query(
        `select * from resources where user_id = ?`,
        [user_id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
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
          return callBack(null, results);
        }
      );
    },

    deleteResource: (id,user_id, callBack) => {
      pool.query(
        `delete from resources where id = ?`,
        [id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    }
  };
  