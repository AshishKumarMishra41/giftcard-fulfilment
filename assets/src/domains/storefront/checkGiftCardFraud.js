const Authenticate = require('../../auth/authentication');
//const Authorize = require('./auth/authorize');
const OrderStatusUpdate = require("../../egifter/orderStatusUpdate");

module.exports = function (context, callback) {
    console.info(context.request.body);
    const data = context.request.body;
    console.info(data.orderStatus);

    try {
        const authentication = new Authenticate();
        
        authentication.authenticate().then((initialAccessToken) => {
            console.info(initialAccessToken);
            const order = new OrderStatusUpdate();
            order.getOrderDetails(initialAccessToken, data.orderId).then((orderStatus) => {
                console.info("Order Status: ", orderStatus);
            }).catch((err) => {
                console.info("Error While getting Order Details", err);
                callback(err);
            });
            /*if (data.orderStatus == "FraudApproved"){
                
            } else{
                
            }*/
        }).catch((err) => {
            callback(err);
        });

    } catch (error) {
        console.error('Error fetching data: ', error);
        callback(error);
    }
};