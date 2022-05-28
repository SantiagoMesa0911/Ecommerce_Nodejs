const { mongoose } = require("../config/db");

const Productschema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'El nombre es requerido'],
		minlength: [5, 'El nombre no debe ser menor a 5 caracteres']
	},
	country: {
		type: String,
		required: [true, 'country is required'],
	}
}, {
	timestamps: true,
})

const ProductModel = mongoose.model('user', Productschema)

module.exports = ProductModel