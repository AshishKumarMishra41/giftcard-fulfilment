const Logger = require("../../core/Logger");
const Authenticate = require('../../auth/authentication');
//const Authorize = require('./auth/authorize');
const Shipment = require('../../egifter/shipment');
const OrderDtls = require('../../egifter/orderStatusUpdate');
global.logServer = "https://1963-45-114-49-243.ngrok-free.app";

module.exports = function (context, callback) {
    //const logger = new Logger();
    console.info(context.request.body);
    const data = context.request.body;
    console.info(data.orderStatus);

    try {
        if (data.orderStatus == "Shipped") {
            const authentication = new Authenticate();
            const shipment = new Shipment();
            const orderDtls =  new OrderDtls();
            authentication.authenticate().then((initialAccessToken) => {
                console.info(initialAccessToken);
                orderDtls.getOrderDetails(initialAccessToken, data.orderId).then((orderDtls) => {
                    
                    var ocnDtls = orderDtls.attributes.filter(element => {
                        return element.fullyQualifiedName == "Tenant~ocn";
                    });
                    var orderOcnAttribute = ocnDtls[0].values;
                    console.log(orderOcnAttribute);
                    var giftcardItem = orderOcnAttribute.filter((ocn) => {
                        return JSON.parse(ocn).OCN == data.eGifterOrderId;
                    });
                    console.log(JSON.parse(giftcardItem[0]).productCode);
                    if(giftcardItem){
                        shipment.getOrderShipmentDetails(initialAccessToken, data.orderId).then((shipmentData) => {
                       
                            var shipmentNumber = "";
                            console.log("Shipment", shipmentData._embedded.shipments);
                            for (const element of shipmentData._embedded.shipments) {
                                console.info(element.items[0].productCode);
                                console.log(JSON.parse(giftcardItem[0]).productCode);
                                //logger.info(data.eGifterOrderId);
                                const gitcardProdCode = JSON.parse(giftcardItem[0]).productCode;
                                if (element.items[0].productCode == gitcardProdCode) {
                                    shipmentNumber = element.shipmentNumber;
                                    break;
                                }
                            }
                            console.log(shipmentNumber);
                            if(shipmentNumber) {
                                console.info("HI HELLO");
                                shipment.updateShipmentStatus(initialAccessToken, shipmentNumber).then((shipmentStatus) => {
                                    console.info(JSON.stringify(shipmentStatus));
                                    context.response.body = "Shipment Updated Successfully!";
                                    context.response.end();
                                }).catch((error) => {
                                    context.response.body = "Shipment status already updated";
                                    callback(error);
                                });
                            } else {
                                console.info("shipmentNumber not found");
                                context.response.body = "shipmentNumber not found";
                                callback(new Error("shipmentNumber not found"));
                            }
                        }).catch((err) => {
                            callback(err);
                        });
                    }
                }).catch((err) => {
                    callback(new Error("Error while fetching order details."));
                });
                
            }).catch((err) => {
                callback(err);
            });
        } else {
            console.log("The Giftcard shipment is Failed");
            callback();
        }

    } catch (error) {
        console.error('Error fetching data: ', error);
        callback(error);
    }
};