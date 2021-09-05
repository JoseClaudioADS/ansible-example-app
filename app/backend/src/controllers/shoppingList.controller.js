const yup = require('yup')

class ShoppingListController {

    constructor (shoppingListRepository) {
        this.shoppingListRepository = shoppingListRepository
    }

    async getAll(_, res) {
        const results = await this.shoppingListRepository.getAll()
        res.json(results)
    }

    validateParamId (params) {
        const paramSchemaValidation = yup.object().shape({
            id: yup.number().required().positive()
        })

        return paramSchemaValidation.validate(params)
    }

    async detail(req, res) {
        const { params } = req

        await validateParamId(params)
        
        const { id: shopListId } = params

        const detailVO = await this.shoppingListRepository.detail(shopListId)

        if (detailVO) {
            res.json(detailVO)
        } else {
            res.sendStatus(404)
        }
    }

    async create(req, res) {
        const { body } = req

        const schemaValidation = yup.object().shape({
            title: yup.string().required().max(255)
        })

        await schemaValidation.validate(body)
        const insertId = await this.shoppingListRepository.create(body)
        res.status(201).json({
            id: insertId,
            title: body.title,
            createdAt: new Date()
        })
    }

    async addItem(req, res) {
        const { body, params } = req

        const schemaValidation = yup.object().shape({
            name: yup.string().required().max(255),
            quantity: yup.number().required().positive()
        })

        await schemaValidation.validate(body)

        await validateParamId(params)

        const { id: shopListId } = params

        const existShopListById = await this.shoppingListRepository.existShopListById(shopListId)

        if (existShopListById) {
            const insertId = await this.shoppingListRepository.addItem(shopListId, body)
            res.json({
                id: insertId,
                ...body
            })
        } else {
            res.sendStatus(404)
        }
    }

    async removeItem(req, res) {
        const { params } = req

        const paramSchemaValidation = yup.object().shape({
            id: yup.number().required().positive(),
            itemId: yup.number().required().positive()
        })

        await paramSchemaValidation.validate(params)

        const { id: shopListId, itemId } = params

        const existShopListById = await this.shoppingListRepository.existShopListById(shopListId)

        if (existShopListById) {
            await this.shoppingListRepository.removeItem(itemId)
            res.send()
        } else {
            res.sendStatus(404)
        }
    }

    async deleteShopList(req, res) {
        const { params } = req

        const paramSchemaValidation = yup.object().shape({
            id: yup.number().required().positive()
        })

        await paramSchemaValidation.validate(params)
        
        const { id: shopListId } = params

        const existShopListById = await this.shoppingListRepository.existShopListById(shopListId)

        if (existShopListById) {
            await this.shoppingListRepository.deleteShopList(shopListId)
            res.send()
        } else {
            res.sendStatus(404)
        }
    }
}

module.exports = ShoppingListController