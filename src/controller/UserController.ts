import { Request, Response } from "express"
import UserBusiness from "../business/UserBusiness"
import User from "../models/User"



export default class UserController{
    constructor(
        private userBusiness:UserBusiness
    ){}


    signup = async(req:Request, res:Response):Promise<void>=>{
        try{

            const token = await this.userBusiness.signup(req)

            res.status(201).send(token)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    login = async(req:Request, res:Response):Promise<void>=>{
        try{

            const token = await this.userBusiness.login(req)

            res.status(200).send(token)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }

    
    findById = async(req:Request, res:Response):Promise<void>=>{
        try{

            const user = await this.userBusiness.findById(req)

            res.status(200).send(user)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }
}