const express = require('express');
const Productservices = require('../services/productservices')
const authMiddleware = require("../middleware/auth")
function products(app) {
	const router = express.Router()
	const productsServ = new Productservices()

	app.use('/api/products', router)

	router.get('/', async (req, res) => {
		const result = await productsServ.getAll()
		return res.json(result)
	})

	router.post("/", authMiddleware(1), async (req, res) => {
		const result = await productsServ.create({
			...req.body,
			owner: req.user.id
		})

		return res.json(result)
	})
}

module.exports = products