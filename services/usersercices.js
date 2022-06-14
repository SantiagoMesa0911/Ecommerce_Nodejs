const dbError = require('../helpers/dbError');
const UserModel = require('../models/user');
const CartService = require('../services/cartservice')
const uuid = require('uuid')

class Users {
  async getEmailUser(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  
  /* async getAll() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  } */

  async getOrCreateByProvider(data) {
    const userData = {
      provider: {
        [data.provider]: true
      },
      idProvider: {
        [data.provider]: data.idProvider
      }
    }
    let user = await UserModel.findOne(userData)
    if (!user) {
      data.password = uuid.v4()
      const newData = {
        ...data,
        ...userData
      }
      try {
        user = await UserModel.create(newData)
        const CartServ = new CartService()
        const cart = await CartServ.create(user.id)
      } catch (error) {
        if (error.code === 11000 && error.keyValue.email) {
          const email = error.keyValue.email
          const provider = 'provider.' + data.provider
          const idProvider = 'idProvider.' + data.provider
          user = await UserModel.updateOne({
            email
          }, {
            [provider]: true,
            [idProvider]: data.provider
          }, { new: true })
          return {
            created: true,
            user
          }
        }
        return dbError(error)
      }
    }
    return {
      created: true,
      user
    }
  }

  async createUser(data) {
    try {
      const user = await UserModel.create(data);
      const CartServ = new CartService()
      const cart = await CartServ.create(user.id)
      return {
        created: true,
        user
      }
    } catch (error) {
      return dbError(error);
    }
  }
}

module.exports = Users;
