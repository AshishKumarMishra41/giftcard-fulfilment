const Logger = require("../core/Logger");
const request = require('request');

//global.logServer =  "https://0e0b-45-114-49-89.ngrok-free.app";
//const logger = new Logger();
class Shipment {
    getOrderShipmentDetails(accessToken, orderId) {
        return new Promise((resolve, reject) => {
            
            try{
                const requestOptions = {
                    json: true,
                    method: 'GET',
                    url: `https://t100033-s100058.sb.usc1.gcp.kibocommerce.com/api/commerce/shipments?filter=orderId==${orderId}`,
                    headers: {
                        'x-vol-app-claims': accessToken,
                        'x-vol-tenant': '100033',
                        'x-vol-site': '100058',
                        'Cookie': '__cf_bm=.S18zhLVD_cw.W1z7_T0B7bOuOzBXQHMZ80ngd7p3Ks-1729084320-1.0.1.1-ODYkoZ4PIyExFb_ZBD15fJf3vJPbZqC5kIv0_t8vXd8DoHhSmsuexNgEsEixS5rDS8LR68vvQnI8T.LZJGxvDQ'
                    }
                };
    
                request(requestOptions, (error, response, body) => {
                    if (error) {
                        console.error("Fetch Order failed:", error.message);
                        reject(new Error("Order Error: " + error.message));
                    } else {
                        console.log(response.statusCode);
                        if (response.statusCode !== 200 && response.statusCode !== 201) {
                            console.error("Failed: HTTP response code:", response.statusCode);
                            console.error("Failed: HTTP response message:", response.statusMessage);
                            reject(new Error("Order Error: " + response.statusMessage));
                        } else {
                            const orderDtls = body;
                            console.log("Order fetch successful. Data:", orderDtls);
                            resolve(orderDtls);
                        }
                    }
                });
            } catch(error){
                console.error("Error: "+error.message);
                reject(new Error("EgifterError: " + error));
            }
            
        });
    }

    updateShipmentStatus(accessToken, shipmentId) {
        return new Promise((resolve, reject) => {
            try {
                const urlShip = `https://t100033-s100058.sb.usc1.gcp.kibocommerce.com/api/commerce/shipments/${shipmentId}/fulfilled`;
                const requestOptions = {
                    json: true,
                    method: 'PUT',
                    url: urlShip,
                    headers: {
                        'x-vol-app-claims': accessToken,
                        'x-vol-tenant': '100033',
                        'x-vol-site': '100058',
                        'Cookie': '__cf_bm=.S18zhLVD_cw.W1z7_T0B7bOuOzBXQHMZ80ngd7p3Ks-1729084320-1.0.1.1-ODYkoZ4PIyExFb_ZBD15fJf3vJPbZqC5kIv0_t8vXd8DoHhSmsuexNgEsEixS5rDS8LR68vvQnI8T.LZJGxvDQ'
                    }
                };
                request(requestOptions, (error, response, body) => {
                    if (error) {
                        console.error("Order fulfillment failed:", error.message);
                        reject(new Error("Order fulfillment failed:: " + error.message));
                    } else {
                        console.log(response.statusCode);
                        if (response.statusCode !== 200 && response.statusCode !== 201) {
                            console.error("Failed: HTTP response code:", response.statusCode);
                            console.error(response.statusMessage);
                            reject(new Error("Order fulfill error: " + response.statusMessage));
                        } else {
                            const orderDtls = body;
                            console.log("Order fulfill successful. Data:", orderDtls);
                            resolve(orderDtls);
                        }
                    }
                });
            } catch (error) {
                console.error("Unexpected error:", error);
                reject(new Error("EgifterError: " + error.message));
            }
        });
    }
}

module.exports = Shipment;