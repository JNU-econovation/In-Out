const DBForUser = require('./../../database/transfer/user');

exports.createUser = async (req, res) => {

    try {
        let result = await DBForUser.insertUser(req.body);
        console.log(result);

        return res.send(result);
    } catch {
        return res.status(400).json({
            message: "데이터를 저장하지 못하거나 db 연결실패"
        });
    }
}

exports.isAdmin = (req, res, next) => {
    let user = req.user;

    if (!user) {
        return res.status(400).json({
            message: "토근이 올바르지 않습니다."
        });
    }

    if (user.role !== 2) {
        return res.status(400).json({
            message: "권한이 없습니다."
        });
    }
    next();
}

exports.changeRole = (req, res) => {
    let memberIdForUpdate = req.body.memberId;
    let roleForUpdate = req.body.role;


    DBForUser.changeRole(memberIdForUpdate, roleForUpdate, (err, success) => {

        if (err) {
            return res.status(400).json({
                message: "something is not right"
            });
        }

        if (success == "ok") {
            return res.status(200).json({
                role: changedRole
            });
        }

        return res.status(400).json({
            message: "something is not right"
        });
    });
}