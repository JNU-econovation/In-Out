const database = require("./../models");

const insertUser = async user => {
  try {
    const { memberId, name, password, role } = user;

    return await database.User.create({
      memberId,
      name,
      password,
      role
    });
  } catch (err) {
    console.log(err);
  }
};

const findUserById = async memberId => {
  try {
    let user = await database.User.findOne({
      where: {
        memberId: memberId
      }
    });
    return user.dataValues;
  } catch (err) {
    console.log(err);
  }
};

const changeRole = async (memberId, role) => {
  try {
    const transaction = await database.sequelize.transaction();
    await database.User.update(
      {
        role: role
      },
      {
        where: {
          memberId: memberId
        }
      },
      {
        transaction: transaction
      }
    );
    await transaction.commit();
  } catch (err) {
    console.log(err);
  }
};

const changePassword = async (memberId, changedPassword) => {
  try {
    const transaction = await database.sequelize.transaction();
    await database.User.update(
      {
        password: changedPassword
      },
      {
        where: {
          memberId: memberId
        }
      },
      {
        transaction: transaction
      }
    );
    await transaction.commit();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  changePassword,
  changeRole,
  findUserById,
  insertUser
};
