import { app } from "./app"
import OrderBusiness from "./business/OrderBusiness"
import OrderController from "./controller/OrderController"
import OrderData from "./data/OrderData"
import ProductController from "./controller/ProductController"
import ProductBusiness from "./business/ProductBusiness"
import ProductData from "./data/ProductData"
import UserController from "./controller/UserController"
import UserBusiness from "./business/UserBusiness"
import UserData from "./data/UserData"



const userControllet = new UserController(
    new UserBusiness(new UserData)
)


const productController = new ProductController(
    new ProductBusiness(new ProductData)
)

const orderController = new OrderController(
    new OrderBusiness(new OrderData)
)



app.post('/signup', userControllet.signup)
app.post('/login', userControllet.login)
app.post('/order', orderController.createOrder)
app.post('/product', productController.insertProduct)
app.post('/insert_in_cart', productController.insertInCart)

app.get('/client', userControllet.findById)
app.get('/products', productController.getProducts)
app.get('/cartItems', productController.getCartItems)

app.delete('/cartItem/:id', productController.removeCartItem)