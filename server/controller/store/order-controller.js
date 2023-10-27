const OrderService = require("../../services/store/order-service");
const OrderController = {
  getList: async (req, res) => {
    let result = await OrderService.getList(req.params?._id);
    result.length &&
      result[0].orderList.sort((a, b) => b.time.getTime() - a.time.getTime());
    res.send({
      ActionType: "ok",
      data: result,
    });
  },
  addOrder: async (req, res) => {
    let order = req.body;
    console.log(req.body);
    console.log(req.params?._id);
    let result = await OrderService.addOrder(order, req.params?._id);
    res.status(200).send({
      ActionType: "ok",
    });
  },
};
module.exports = OrderController;
