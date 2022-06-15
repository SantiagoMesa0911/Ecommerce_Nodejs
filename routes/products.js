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

	router.get('/filter/category', authMiddleware(1), async (req, res) => {
		const {
			query: { category },
		} = req
		const filtered = await productsServ.filterCategories(category)
		filtered.length > 0
			? res.status(200).json({ message: ` Mostrando todos los productos de la categoria ${category}`, filtered })
			: res.status(404).json({ message: `No tenemos productos en la categoria ${category}` })
	})

	router.get('/filter/rangeprice', authMiddleware(1), async (req, res) => {
		const {
			query: { price },
		} = req
		const filtered = await productsServ.orderByRange(price);
		console.log(filtered);
		filtered
			? res.status(200).json({ message: 'Request exitosa', filtered })
			: res.status(404).json({ message: 'Error algo salio mal' });
	})
}

module.exports = products