module.exports = {
    login: function(req, res) {
        console.log('login');
        res.write('login');
    },
    register: function (req, res) {
        console.log('register');
        res.write('register');
    }
};