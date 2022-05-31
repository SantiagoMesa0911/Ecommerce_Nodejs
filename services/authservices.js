const jwt = require('jsonwebtoken');
const bctypt = require('bcrypt');
const { jwtsecret } = require('../config');
const Users = require('./usersercices');

class Auth {
  async login(data) {
    const { email, password } = data;

    const userService = new Users();

    const user = await userService.getEmailUser(email);

    if (user && (await this.#compare(password, user.password))) {
      return this.#getUserData(user);
    }

    return {
      success: false,
      errors: [
        {
          credentials: 'Las credenciales son incorrectas',
        },
      ],
    };
  }

  async signup(data) {
    if (data && data.password) {
      data.password = await this.#encrypt(data.password);
    }
    const userService = new Users();
    const user = await userService.createUser(data);
    if (!user.created) {
      return {
        success: false,
        errors: user.errors,
      };
    }

    return this.#getUserData(user.user);
  }

  #getUserData(data) {
    const { name, email, country, role, id } = data;
    console.log(data);
    const user = {
      name,
      email,
      country,
      role,
      id,
    };
    const token = this.#createToken(user);
    return {
      success: true,
      user: user,
      token,
    };
  }
  #createToken(payload) {
    const token = jwt.sign(payload, jwtsecret, {
      expiresIn: '5d',
    });

    return token;
  }
  async #encrypt(string) {
    try {
      const salt = await bctypt.genSalt();
      const hash = await bctypt.hash(string, salt);

      return hash;
    } catch (err) {
      console.log(err);
    }
  }

  async #compare(string, hash) {
    try {
      return await bctypt.compare(string, hash);
    } catch (error) { }
  }
}

module.exports = Auth;
