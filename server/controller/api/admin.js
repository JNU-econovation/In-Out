const jwt = require("jsonwebtoken");
require("dotenv").config();
const DBForUser = require('./../../database/transfer/user');

exports.createUser = (req, res) => {
    DBForUser.insertUser(req.body, (err, result) => {
        if (err) {
            return res.status(400).json({
                message: "데이터를 저장하지 못하거나 db 연결실패"
            });
        }

        return res.send(result);
    });
}

exports.isAdmin = (req, res, next) => {
    let memberId = req.memberId;

    DBForUser.findUserById(memberId, (err, result) => {
        if (err) {
            return res.status(400).json({
                message: "데이터를 저장하지 못하거나 db 연결실패"
            });
        }

        if (result.role !== 2) {
            return res.status(400).json({
                message: "권한이 없습니다."
            });
        }
    });

    next();
}