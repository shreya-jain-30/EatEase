const Menu = require('../../models/menu')
function homeController(){
    return{
        async index(req,res){
            const orders = await Menu.find();
            console.log(orders);
            return res.render('home',{orders: orders});
        }
    }
}
module.exports = homeController;