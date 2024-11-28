const Authenticate = require('../../auth/authentication');
//const Authorize = require('./auth/authorize');
const OrderStatusUpdate = require("../../egifter/orderStatusUpdate");

module.exports = function (context, callback) {
    console.info(context.request.body);
    const data = context.request.body;
    console.info(data.orderStatus);

    try {
        const authentication = new Authenticate();
        const order = new OrderStatusUpdate();
        authentication.authenticate().then((initialAccessToken) => {
            console.info(initialAccessToken);
            
            order.getOrderDetails(initialAccessToken, data.orderId).then((orderStatus) => {
                console.info("Order Status: ", orderStatus);
                if(orderStatus == "PendingReview"){
                    order.getOrderActions(initialAccessToken, data.orderId).then((orderActions) => {
                        console.log(orderActions);
                        if (data.orderStatus == "FraudApproved" && orderActions.includes("AcceptOrder")){
                            console.log("FraudApproved");
                            order.performOrderAction(initialAccessToken, data.orderId, "AcceptOrder").then((resp) => {
                                order.updateOrderAttribute(initialAccessToken, data.orderId, true).then((resp) => {
                                    context.response.body = "Fraud Updated Successfully!";
                                    context.response.end();
                                }).catch((err) => {
                                    callback(new Error("Error while Updating the Order Attribute"));
                                });
                                
                            }).catch((err) => {
                                callback(new Error("Error while perform order action"));
                            });
                            
                        } else if(data.orderStatus && orderActions.includes("CancelOrder")){
                            console.log("FraudReject");
                            order.performOrderAction(initialAccessToken, data.orderId, "CancelOrder").then((resp) => {
                                order.updateOrderAttribute(initialAccessToken, data.orderId, false).then((resp) => {
                                    context.response.body = "Fraud Updated Successfully!";
                                    context.response.end();
                                }).catch((err) => {
                                    callback(new Error("Error while Updating the Order Attribute"));
                                });
                            }).catch((err) => {
                                callback(new Error("Error while perform order action"));
                            });
                        } else{
                            callback(new Error("Not an Order with giftcard"));
                        }
                        
                    }).catch((err) => {
                        callback(new Error("Error while fetching available Order Actions"));
                    });
                    
                }else{
                    console.info("Order Status need to be in Pending Review");
                    callback(new Error("Order Status need to be in Pending Review."));
                }
                
            }).catch((err) => {
                console.info("Error While getting Order Details", err);
                callback(new Error(err.message));
            });

        }).catch((err) => {
            callback(new Error(err.message));
        });

    } catch (error) {
        console.error('Error fetching data: ', error);
        callback(new Error(err.message));
    }
};