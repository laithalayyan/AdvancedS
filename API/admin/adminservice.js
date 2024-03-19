const pool = require("../../DataBase/database");
const login = async (admindata) => {

    const { username, password } = admindata
    try {
        const [adminuser] = await pool.query(`select * from admin where username='${username}'`);

        if (adminuser.length == 0) {
            throw new Error("Requesting adminuser does not exist");
        }
        return adminuser[0]
    } catch (error) {
        throw new Error(error)
    }




}
module.exports = {
    login

};