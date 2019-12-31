const database = require('./models');

module.exports = {
    connect: () => {
        //db - connection
        database.sequelize
            .sync()
            .then(() => {
                console.log("✓ DB connection success.");
            })
            .catch(err => {
                console.error(err);
                console.log("✗ DB connection error. Please make sure DB is running.");
                process.exit();
            });
    },
    insertUser: (res, user) => {
        database.User.create({
                memberId: user.memberId,
                name: user.name,
                password: user.password,
                role: user.role
            })
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.send(err);
            });
    }
}