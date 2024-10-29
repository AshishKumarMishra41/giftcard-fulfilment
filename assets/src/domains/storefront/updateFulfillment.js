const Logger = require("../../core/Logger");
const Authenticate = require('../../auth/authentication');
//const Authorize = require('./auth/authorize');
const Shipment = require('../../egifter/shipment');

global.logServer =  "https://0e0b-45-114-49-89.ngrok-free.app";

module.exports = function(context,callback) {
    const logger = new Logger();
    //logger.info(context.request.query);
    logger.info(context.request.body);
    const data = context.request.body;
    logger.info(data.orderStatus);

    try {
        if(data.orderStatus == "Shipped"){
            const authentication = new Authenticate();
            const shipment = new Shipment();
            authentication.authenticate().then((initialAccessToken) =>{
                logger.info(initialAccessToken);
                //context.response.body = "DONE";
                //context.response.end();
                shipment.getOrderShipmentDetails(initialAccessToken, data.orderId).then((shipmentData) =>{
                    logger.info(shipmentData);
                    
                    context.response.body = "DONE";
                    context.response.end();
                }).catch((err) => {
                    callback(err);
                });
            }).catch((err) => {
                callback(err);
            });
            
            
            
            
            
            // const authorization = new Authorize();
            // const finalAccessToken = await authorization.authorize(initialAccessToken);

            /*
        // var shipmentStatus = null;

            for (const element of shipmentData._embedded.shipments) {
                logger.info(element.items[0].productCode);
                console.log(data.eGifterOrderId);
                if (element.items[0].productCode === data.eGifterOrderId) {
                    const shipmentNumber = element.shipmentNumber;
                    const shipmentStatus = shipment.updateShipmentStatus(initialAccessToken, shipmentNumber);
                    logger.info(shipmentStatus);
                    context.response.body = shipmentStatus;
                }
            }

            context.response.end();*/
        }else{
            console.log("The Giftcard shipment is Failed");
            callback();
        }
        
    } catch (error) {
        console.error('Error fetching data: ', error);
        callback(error);
    }
    
};