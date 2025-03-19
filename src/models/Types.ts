export interface UserModel{
    id:string 
    name:string 
    email:string 
    phone:string 
    address:string 
    password:string 
}

export interface ProductModel{
    id:string
    product:string
    price:string
}

export interface OrderModel{
    id:string,
    client:string,
    email:string,
    phone:string,
    address:string,
    product:string,
    quantity:string,
    clientId:string
}

export interface CartModel{
    id:string,
    product:string,
    price:string,
    client:string,
    urlImage:string
}