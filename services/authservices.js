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
    data.provider = { local: true }
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

  async sociallogin(data) {
    const userServ = new Users()
    const user = {
      idProvider: data.id,
      name: data.displayName,
      email: data.emails[0].value,
      profilePic: data.photos[0].value,
      provider: data.provider
    }
    const result = await userServ.getOrCreateByProvider(user)
    if (!result.created) {
      return {
        success: false,
        errors: result.errors
      };
    }
    return this.#getUserData(result.user)
  }

  #getUserData(data) {
    const { name, email, role, id, provider,idProvider } = data;
    const user = {
      id,
      role,
      name,
      email,
      provider,
      idProvider
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
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Auth;
