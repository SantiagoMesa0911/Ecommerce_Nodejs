const express = require('express');
const morgan = require('morgan')
const { port } = require('./config');
const { connection } = require('./config/db')

const app = express()

connection()

//UTLIZANDO MIDDLEWARE
app.use(morgan('dev'))
app.get('/', (req, res) => {
	res.json({
		'name': 'ecommerce'
	})
})

app.listen(port, () => {
	console.log(`El servidor esta corriendo en http://localhost${port}`);
})