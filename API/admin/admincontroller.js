
const adminservice = require('./adminservice');
const login = async (req, res) => {
        try {
                 const adminuser = await adminservice.login(req.body);

                res.status(200).json(adminuser)
        } catch (error) {
                res.status(400).json('No admin user')
        }



};
module.exports = {
        login
};