const Authenticate = require('../../auth/authentication');
//const Authorize = require('./auth/authorize');
const OrderStatusUpdate = require("../../egifter/orderStatusUpdate");
const SubmitGiftCardOrder = require("../../egifter/submitGiftcardOrder");

module.exports = function (context, callback) {
    console.info(context.request.body);
    const data = context.request.body;
    console.info(data.orderStatus);

    try {
        const authentication = new Authenticate();
        const order = new OrderStatusUpdate();
        const gcOrder = new SubmitGiftCardOrder();
        authentication.authenticate().then((initialAccessToken) => {
            console.info(initialAccessToken);
            
            order.getOrderDetails(initialAccessToken, data.orderId).then((orderDtls) => {
                console.info("Order Status: ", orderDtls.status);
                if(orderDtls.status == "PendingReview"){
                    order.getOrderActions(initialAccessToken, data.orderId).then((orderActions) => {
                        console.log(orderActions);
                        if (data.orderStatus == "FraudApproved" && orderActions.includes("AcceptOrder")){
                            console.log("FraudApproved");
                            /*order.performOrderAction(initialAccessToken, data.orderId, "AcceptOrder").then((resp) => {
                                order.updateOrderAttribute(initialAccessToken, data.orderId, true).then((resp) => {
                                    gcOrder.sendGiftcardOrderFulfilment(orderDtls, data.eGifterOrderId).then((resp) => {
                                        console.log("Order details send to egifter after successful fraud check!");
                                        context.response.body = "Fraud Updated Successfully!";
                                        context.response.end();
                                    });
                                    
                                }).catch((err) => {
                                    callback(new Error("Error while Updating the Order Attribute"));
                                });
                                
                            }).catch((err) => {
                                callback(new Error("Error while perform order action"));
                            });*/
                            Promise.all([
                                order.performOrderAction(initialAccessToken, data.orderId, "AcceptOrder"),
                                order.updateOrderAttribute(initialAccessToken, data.orderId, true)
                            ]).then((responses) => {
                                gcOrder.sendGiftcardOrderFulfilment(orderDtls, data.eGifterOrderId)
                                    .then(() => {
                                        console.log("Order details sent to eGifter after successful fraud check!");
                                        context.response.body = "Fraud Updated Successfully!";
                                        context.response.end();
                                    })
                                    .catch((err) => {
                                        callback(new Error("Error while sending gift card order fulfilment."));
                                    });
                            }).catch((err) => {
                                callback(new Error("Error while performing order action or updating order attribute."));
                            });
    
                            
                        } else if(data.orderStatus && orderActions.includes("CancelOrder")){
                            console.log("FraudReject");
                            /*order.performOrderAction(initialAccessToken, data.orderId, "CancelOrder").then((resp) => {
                                order.updateOrderAttribute(initialAccessToken, data.orderId, false).then((resp) => {
                                    context.response.body = "Fraud Updated Successfully!";
                                    context.response.end();
                                }).catch((err) => {
                                    callback(new Error("Error while Updating the Order Attribute"));
                                });
                            }).catch((err) => {
                                callback(new Error("Error while perform order action"));
                            });*/
                            Promise.all([
                                order.performOrderAction(initialAccessToken, data.orderId, "CancelOrder"),
                                order.updateOrderAttribute(initialAccessToken, data.orderId, false)
                            ]).then((responses) => {
                                context.response.body = "Fraud Updated Successfully!";
                                context.response.end();
                            }).catch((err) => {
                                callback(new Error("Error while performing order action or updating order attribute."));
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