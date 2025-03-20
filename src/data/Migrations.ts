import ConnectToDatabase from "./Connexion"



export default class Migrations extends ConnectToDatabase{
    static USER_TABLE = 'users'
    static PRODUCT_TABLE = 'products'
    static ORDER_TABLE = 'orders'
    static CART_TABLE = 'cart'


    public static async createUsersTable():Promise<void>{
        try{

            const exists = await this.con.schema.hasTable(this.USER_TABLE)
            if(!exists){
                await this.con.schema.createTable(this.USER_TABLE, (table)=>{
                    table.string('id').primary().notNullable()
                    table.string('name', 50).notNullable()
                    table.string('email', 150).notNullable()
                    table.string('phone', 50).notNullable()
                    table.string('address', 150).notNullable()
                    table.string('password').notNullable()
                })

                console.log(`Tabela ${this.USER_TABLE} criada com sucesso`)
            }else{
                console.log(`Tabela ${this.USER_TABLE} já existe`)
            }

        }catch(e){
            console.log(`Erro ao criar tabela ${this.USER_TABLE}: ${e}`)
        }
    }


    public static async createProductsTable():Promise<void>{
        try{

            const exists = await this.con.schema.hasTable(this.PRODUCT_TABLE)
            if(!exists){
                await this.con.schema.createTable(this.PRODUCT_TABLE, (table)=>{
                    table.string('id').primary().notNullable()
                    table.string('product', 50).notNullable()
                    table.string('price', 10).notNullable()
                    table.text('description').notNullable()
                    table.string('urlImage').notNullable()
                })

                console.log(`Tabela ${this.PRODUCT_TABLE} criada com sucesso`)
            }else{
                console.log(`Tabela ${this.PRODUCT_TABLE} já existe`)
            }

        }catch(e){
            console.log(`Erro ao criar tabela ${this.PRODUCT_TABLE}: ${e}`)
        }
    }


    public static async createOrderTable():Promise<void>{
        try{

            const exists = await this.con.schema.hasTable(this.ORDER_TABLE)
            if(!exists){
                await this.con.schema.createTable(this.ORDER_TABLE, (table)=>{
                    table.string('id').primary().notNullable()
                    table.string('client', 50).notNullable()
                    table.string('email', 150).notNullable()
                    table.string('phone', 50).notNullable()
                    table.string('address', 100).notNullable()
                    table.string('product', 50).notNullable()
                    table.string('quantity', 10).notNullable()
                    table.string('clientId').notNullable()
                })

                console.log(`Tabela ${this.ORDER_TABLE} criada com sucesso`)
            }else{
                console.log(`Tabela ${this.ORDER_TABLE} já existe`)
            }

        }catch(e){
            console.log(`Erro ao criar tabela ${this.ORDER_TABLE}: ${e}`)
        }
    }


    public static async createCartTable():Promise<void>{
        try{

            const exists = await this.con.schema.hasTable(this.CART_TABLE)
            if(!exists){
                await this.con.schema.createTable(this.CART_TABLE, (table)=>{
                    table.string('id').primary().notNullable()
                    table.string('product', 50).notNullable()
                    table.string('price', 10).notNullable()
                    table.string('client').notNullable()
                    table.string('urlImage').notNullable()
                })

                console.log(`Tabela ${this.CART_TABLE} criada com sucesso`)
            }else{
                console.log(`Tabela ${this.CART_TABLE} já existe`)
            }

        }catch(e){
            console.log(`Erro ao criar tabela ${this.CART_TABLE}: ${e}`)
        }
    }
    


    public static async closeConnexion():Promise<void>{
        await this.con.destroy()
        console.log('Conexão com banco de dados encerrada')
    }
}



(async()=>{
    await Migrations.createUsersTable()
    await Migrations.createProductsTable()
    await Migrations.createOrderTable()
    await Migrations.createCartTable()
    await Migrations.closeConnexion()
})()