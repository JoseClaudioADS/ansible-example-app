const express = require('express')
const dbConnection = require('../services/database')
const ShoppingListController = require('../controllers/shoppingList.controller')
const ShoppingListRepository = require('../repositories/shoppingList.repository')

const shoppingListRepositoryInstance = new ShoppingListRepository(dbConnection)
const shoppingListControllerInstance = new ShoppingListController(shoppingListRepositoryInstance)

const shoppingListRouter = express.Router()

shoppingListRouter.get('/', shoppingListControllerInstance.getAll.bind(shoppingListControllerInstance))
shoppingListRouter.post('/', shoppingListControllerInstance.create.bind(shoppingListControllerInstance))
shoppingListRouter.get('/:id', shoppingListControllerInstance.detail.bind(shoppingListControllerInstance))
shoppingListRouter.delete('/:id', shoppingListControllerInstance.deleteShopList.bind(shoppingListControllerInstance))

shoppingListRouter.post('/:id/items', shoppingListControllerInstance.addItem.bind(shoppingListControllerInstance))
shoppingListRouter.delete('/:id/items/:itemId', shoppingListControllerInstance.removeItem.bind(shoppingListControllerInstance))

module.exports = shoppingListRouter