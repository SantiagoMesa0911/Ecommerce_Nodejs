const { StripeSecretKey } = require("../config")
const dbError = require('../helpers/dbError');
const ProductModel = require("../models/product")
const stripe = require('stripe')(StripeSecretKey)

class Products {
    async getAll() {
        const products = await ProductModel.find()

        return products
    }
    async create(data) {
        const product = await ProductModel.create(data)
        return product
    }
    async filterCategories(category) {
        try {
            const filtered = await ProductModel.find({ categories: category });
            return filtered;
        } catch (error) {
            return dbError(error)
        }
    }

    async orderByRange(price) {
        try {
            const filtered = await ProductModel.find({ rangePrice: { $lte: price } });
            const filterTota = filtered.sort();
            return filterTota;
        } catch (error) {
            return dbError(error)
        }
    }
}


module.exports = Products