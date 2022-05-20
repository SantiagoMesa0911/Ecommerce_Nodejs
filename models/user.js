const { mongoose } = require("../config/db");

const Userschema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'El nombre es requerido'],
		minlength: [5, 'El nombre no debe ser menor a 5 caracteres']
	},
	email: {
		type: String,
		required: [true, 'El correo electronico es requerido'],
		unique: true,
		trim: [true, 'El correo ya esta registrado'],
		match: [/^[\w\.-]+@[\w]+\.[\.\w]+$/, 'El correo electronico no es valido ']
	},
	password: {
		type: String,
		required: [true, 'La contraseña es requerida']
	},
	country: {
		type: String,
		required: [true, 'country is required'],
	},
	role: {
		type: String,
		required: [true, 'rol is required'],
		enum: ['Applicant', 'Employer', 'Admin'],
	},
}, {
	timestamps: true,
})

const UserModel = mongoose.model('user', Userschema)

module.exports = UserModel
