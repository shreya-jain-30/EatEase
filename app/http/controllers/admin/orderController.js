const order=require('../../../models/order')
function orderController(){
    return{
        async index(req,res){
            try{
                const orders=await order.find({status:{$ne:'completed'}},null,{sort:{'createdAt': -1}}).populate('customerId','-password').exec();
                if(req.xhr)
                {
                    console.log(orders);
                    console.log("request.........");
                    return res.json(orders)
                }
                console.log("No request.........");
                return res.render('admin/order')
            }
            catch(err){
                console.error(err);

            }
        }
    }
}
module.exports=orderController;