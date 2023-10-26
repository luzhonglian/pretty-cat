const OrderModel = require("../../models/store/order-model");
const OrderService = {
  getList: async (_id) => {
    
      return OrderModel.find({uid:_id});
     
  },
  addOrder: async (order,_id) => {
    let result=await  OrderModel.findOneAndUpdate({uid:_id},{$push:{orderList:order}})
    return result?result:OrderModel.create({uid:_id,orderList:[order]});
  }
};
module.exports = OrderService;
