const User = require('../models/user');

function requireAdmin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/user/login');
    }

    User.findById(req.session.userId).then(user => {
        if (!user || user.role !== 'admin') {
            return res.status(403).send('Access denied');
        }
        next();
    });
}

module.exports = {requireAdmin};