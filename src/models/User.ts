import ConnectToDatabase from "../data/Connexion"



export default class User extends ConnectToDatabase{
    protected USER_TABLE = 'users'

    constructor(
        private id:string,
        private name:string,
        private email:string,
        private phone:string,
        private address:string,
        private password:string
    ){ super() }

    save = async()=>{
        try{
            await ConnectToDatabase.con(this.USER_TABLE).insert({
                id: this.id,
                name: this.name,
                email: this.email,
                phone: this.phone,
                address: this.address,
                password: this.password
            })
        }catch(e){
            throw new Error(`Erro ao registrar usuário: ${e}`)
        }
    }
}