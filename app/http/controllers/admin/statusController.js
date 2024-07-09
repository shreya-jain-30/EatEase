const Order=require('../../../models/order');
function statusController(){
    return{
        async update(req,res){
            try{
                order=await Order.updateOne({_id:req.body.orderId},{status:req.body.status});
                return res.redirect('/admin-order');
            }catch{
                return res.redirect('/admin-order');
            }
        }
    }
}
module.exports=statusController;