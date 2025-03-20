import ConnectToDatabase from "../data/Connexion"



export default class Product extends ConnectToDatabase{
    protected PRODUCT_TABLE = 'products'

    constructor(
        private id:string,
        private product:string,
        private price:string,
        private description:string,
        private urlImage:string
    ){ super() }

    save = async()=>{
        try{
            await ConnectToDatabase.con(this.PRODUCT_TABLE).insert({
                id: this.id,
                product: this.product,
                price: this.price,
                description: this.description,
                urlImage: this.urlImage
            })
        }catch(e){
            throw new Error(`Erro ao registrar produto: ${e}`)
        }
    }
}