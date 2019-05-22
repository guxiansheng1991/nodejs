var User = require('./User.js');

function Teacher(id, name, age) {
    User.apply(this, [id, name, age]);
    this.teach = function (res) {
        console.log(this.name + '教课');
        res.write(this.name + '教课');
    }
}

module.exports = Teacher;