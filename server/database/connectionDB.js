const database = require('./models');

exports.connect = () => {
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
}