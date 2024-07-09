const homeC=require('../app/http/controllers/homeController')
const authC=require('../app/http/controllers/authController')
const cartC=require('../app/http/controllers/customer/cartController')
const guest=require('../app/http/middlewares/guest')
const admin=require('../app/http/middlewares/admin')
const auth=require('../app/http/middlewares/auth')
const orderC=require('../app/http/controllers/customer/orderController')
const AdminOrderC=require('../app/http/controllers/admin/orderController')
const statusC=require('../app/http/controllers/admin/statusController')
function initRoutes(app){

    app.get('/',homeC().index);
    app.get('/cart',cartC().index);
    app.get('/login',guest,authC().login);
    app.post('/login',authC().postLogin);
    app.get('/getOrderPage',authC().getOrderPage);
    app.get('/register',guest,authC().register);
    app.post('/logOut',authC().postLogout);
    app.post('/updateCart',cartC().update);
    app.post('/register',authC().postRegister);

    /*...........customer roures........*/
    app.post('/orders',auth,orderC().store);
    app.get('/customer-order',auth,orderC().index);
    app.get('/customer-order/:id',auth,orderC().show);

    /*...........admin roures........*/
    app.get('/admin-order',AdminOrderC().index);
    app.post('/admin-order/status',statusC().update);

}
module.exports=initRoutes;