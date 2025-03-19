import { Request } from "express"
import UserData from "../data/UserData"
import User from "../models/User"
import { UserModel } from "../models/Types"
import Services from "../services/Authorization"



export default class UserBusiness{
    constructor(
        private userData:UserData
    ){}

    signup = async(req:Request):Promise<string>=>{
        const { name, email, phone, address, password } = req.body
        const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/

        if(!name || !email || !phone || !address || !password){
            throw{
                statusCode: 401,
                error: new Error('Preencha os campos')
            }
        }

        if(!regex.test(email)){
            throw{
                statusCode: 401,
                error: new Error('Email inválido')
            }
        }

        const registeredUser = await this.userData.findByEmail(email)
        if(registeredUser){            
            throw{
                statusCode: 403,
                error: new Error('Usuário já cadastrado')
            }
        
        }

        if(password.length < 6){
            throw{
                statusCode: 403,
                error: new Error('Sua senha deve ter no mínimo 6 caracteres')
            }
        }

        const id = new Services().idGenerator()
        const hash = new Services().hash(password)
        const token = new Services().token(id)

        const user = new User(id, name, email, phone, address, hash)

        await this.userData.create(user)

        return token
    }


    login = async(req:Request):Promise<string>=>{
        const { email, password } = req.body
        const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/

        if(!password || !email){
            throw{
                statusCode: 401,
                error: new Error('Preencha os campos')
            }
        }

        if(!regex.test(email)){
            throw new Error('Email inválido!')
        }

        const registeredUser = await this.userData.findByEmail(email)
        if(!registeredUser){            
            throw{
                statusCode: 404,
                error: new Error('Usuário não encontrado')
            }
        
        }

        const compare = new Services().compare(password, registeredUser.password)
        if(!compare){
            throw{
                statusCode: 404,
                error: new Error('Usuário não encontrado')
            }
        }

        const token = new Services().token(registeredUser.id)

        return token
    }


    findById = async(req:Request):Promise<UserModel>=>{
        const user = await new Services().authToken(req)

        return user
    }
}