class ShoppingListRepository {

    constructor (dbConnection) {
        this.dbConnection = dbConnection
    }

    async getAll() {
        const sql = 'SELECT * FROM `ShopLists`;'
        const [ results ] = await this.dbConnection.promise().query(sql)
        return results 
    }

    async detail(shopListId) {
        const sql = `SELECT * FROM \`ShopLists\` WHERE id = ?`
        const [ result ] = await this.dbConnection.promise().execute(sql, [shopListId])
        const detailVO = result[0]

        if (detailVO) {
            const sqlItems = `SELECT * FROM \`Items\` WHERE ShopListId = ?`
            const [ results ] = await this.dbConnection.promise().execute(sqlItems, [shopListId])
            detailVO.items = results
        }

        return detailVO
    }

    async create(dto) {
        const sql = `INSERT INTO \`ShopLists\` (title, createdAt) 
        VALUES (?, now())`
        const [ result ] = await this.dbConnection.promise().execute(sql, [dto.title])
        return result.insertId
    }

    async addItem(shopListId, dto) {
        const sql = `INSERT INTO \`Items\` (name, quantity, createdAt, ShopListId) 
        VALUES (?, ?, now(), ?)`
        const [ result ] = await this.dbConnection.promise().execute(sql, [dto.name, dto.quantity, shopListId])
        return result.insertId
    }

    async existShopListById(shopListId) {
        const sql = `SELECT COUNT(id) as total FROM \`ShopLists\` WHERE id = ?`
        const [result] = await this.dbConnection.promise().execute(sql, [shopListId])
        return result[0].total > 0
    }

    deleteShopList(shopListId) {
        const sql = `DELETE FROM \`ShopLists\` WHERE id = ?`
        return this.dbConnection.promise().execute(sql, [shopListId])
    }

    removeItem(itemId) {
        const sql = `DELETE FROM \`Items\` WHERE id = ?`
        return this.dbConnection.promise().execute(sql, [itemId])
    }

}

module.exports = ShoppingListRepository