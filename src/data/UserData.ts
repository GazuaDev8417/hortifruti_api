import ConnectToDatabase from "./Connexion"
import User from "../models/User"
import { UserModel } from "../models/Types"



export default class UserData extends ConnectToDatabase{
    protected USER_TABLE = 'users'

    create = async(user:User):Promise<void>=>{
        try{
            
            await user.save()

        }catch(e:any){
            throw new Error(`Erro ao criar usuário: ${e}`)
        }
    }


    getAllUsers = async():Promise<UserModel[]>=>{
        try{

            const users = await ConnectToDatabase.con(this.USER_TABLE)

            return users
        }catch(e:any){
            throw new Error(`Erro ao buscar usuários: ${e}`)
        }
    }


    findById = async(id:string):Promise<UserModel>=>{
        try{

            const [user] = await ConnectToDatabase.con(this.USER_TABLE).select(
                'address', 'email', 'id', 'name', 'phone'
            ).where({ id })

            return user
        }catch(e:any){
            throw new Error(`Erro ao buscar usuário: ${e}`)
        }
    }


    findByEmail = async(email:string):Promise<UserModel>=>{
        try{

            const [user] = await ConnectToDatabase.con(this.USER_TABLE).where({ email })
            
            return user
        }catch(e:any){
            throw new Error(`Erro ao buscar usuário: ${e}`)
        }
    }
}