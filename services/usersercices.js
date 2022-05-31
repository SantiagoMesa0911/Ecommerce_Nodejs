const dbError = require('../helpers/dbError');
const UserModel = require('../models/user');
class Users {
  async getAll() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(data) {
    try {
      const user = await UserModel.create(data);
      return {
        created: true,
        user,
      };
    } catch (error) {
      return dbError(error);
    }
  }

  async getEmailUser(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      return false;
    }
  }
}

module.exports = Users;
