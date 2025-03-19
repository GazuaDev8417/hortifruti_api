import ConnectToDatabase from "../data/Connexion"



export default class Order extends ConnectToDatabase{
    protected ORDER_TABLE = 'orders'

    constructor(
        private id:string,
        private client:string,
        private email:string,
        private phone:string,
        private address:string,
        private product:string,
        private quantity:string,
        private clientId:string
    ){ super() }

    save = async()=>{
        try{
            await ConnectToDatabase.con(this.ORDER_TABLE).insert({
                id: this.id,
                client: this.client,
                email: this.email,
                phone: this.phone,
                address: this.address,
                product: this.product,
                quantity: this.quantity,
                clientId: this.clientId
            })
        }catch(e){
            throw new Error(`Erro ao registrar pedido: ${e}`)
        }
    }
}