const Logger = require("../../core/Logger");
const Authenticate = require('../../auth/authentication');
//const Authorize = require('./auth/authorize');
const Shipment = require('../../egifter/shipment');

global.logServer = "https://123e-103-39-242-182.ngrok-free.app";

module.exports = function (context, callback) {
    const logger = new Logger();
    logger.info(context.request.body);
    const data = context.request.body;
    logger.info(data.orderStatus);

    try {
        if (data.orderStatus == "Shipped") {
            const authentication = new Authenticate();
            const shipment = new Shipment();
            authentication.authenticate().then((initialAccessToken) => {
                logger.info(initialAccessToken);
                shipment.getOrderShipmentDetails(initialAccessToken, data.orderId).then((shipmentData) => {
                    logger.info(JSON.stringify(shipmentData));
                    var shipmentNumber = "";
                    for (const element of shipmentData._embedded.shipments) {
                        logger.info(element.items[0].productCode);
                        logger.info(data.eGifterOrderId);
                        if (element.items[0].productCode === data.eGifterOrderId) {
                            shipmentNumber = element.shipmentNumber;
                        }
                    }
                    if(shipmentNumber) {
                        shipment.updateShipmentStatus(initialAccessToken, shipmentNumber).then((shipmentStatus) => {
                            logger.info(shipmentStatus);
                            context.response.body = shipmentStatus;
                            context.response.end();
                        }).catch((error) => {
                            callback(error);
                        });
                    } else {
                        logger.info("shipmentNumber not found");
                        callback(new Error("shipmentNumber not found"));
                    }
                }).catch((err) => {
                    callback(err);
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