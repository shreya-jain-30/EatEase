const Order=require('../../../models/order');
const moment=require('moment');
global.order=null;
function orderController(){
    return{
        async show(req,res){
            try{
                order=await Order.findById(req.params.id);
                if(order.customerId.toString()===req.user._id.toString())
                {
                    return res.render('customer/orderTrack.ejs',{order:order});
                   
                }
                return res.redirect('/');
            }catch(err){
                console.error(err);
            }
            
        },
        store(req,res){
            const {phone,address}=req.body;
            if(!phone || !address)
            {
                req.flash('error','All fields required');
                return res.redirect('/cart')
            }
            else{
                const order=new Order({
                    customerId: req.user._id,
                    items:req.session.cart.items,
                    phone:phone,
                    address:address
                })
                order.save().then(result=>{
                    req.flash('success','Order placed successfully');
                    delete req.session.cart;
                    return res.redirect("/customer-order");
                }).catch(err=>{
                    req.flash('error','Something went wrong');
                    console.log('Something wrong');
                    return res.redirect("/cart");
                })
            }

        },
        async index(req,res){
            console.log("hiii");
            const orders= await Order.find({customerId:req.user._id},null,{sort:{'createdAt': -1}});
            console.log(orders);
            return res.render('customer/order',{orders:orders,moment:moment})
            
        }
    }
}
module.exports=orderController;