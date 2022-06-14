const { mongoose } = require('../config/db');

const Userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      minlength: [5, 'El nombre no debe ser menor a 5 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'El correo electronico es requerido'],
      unique: true,
      trim: [true, 'El correo ya esta registrado'],
      match: [
        /^[\w\.-]+@[\w]+\.[\.\w]+$/,
        'El correo electronico no es valido ',
      ],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
    },
    role: {
      type: Number,
      default: 1,
    },
    ProfilePic: String,
    provider: {
      local: Boolean,
      facebook: Boolean,
      google: Boolean,
      twitter: Boolean
    },
    idProvider: {
      facebook: String,
      google: String,
      twitter: String
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', Userschema);

module.exports = UserModel;
