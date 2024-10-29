const Logger = require("../core/Logger");
global.logServer =  "https://0e0b-45-114-49-89.ngrok-free.app";

class Shipment {
    getOrderShipmentDetails(accessToken, orderId) {
        return new promise((resolve, reject) => {
            const logger = new Logger();
            try{
                logger.info("AKM");
                const requestOptions = {
                    json: true,
                    method: 'GET',
                    url: `https://www.usc1.gcp.kibocommerce.com/api/commerce/shipments?filter=orderId==${orderId}`,
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
                        console.log("Response Code:", response.statusCode);
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
                reject(new Error("EgifterError: " + error));
            }
            
        });
    }

    /*async updateShipmentStatus(accessToken, shipmentId) {
        try {
            const urlShip = `https://www.usc1.gcp.kibocommerce.com/api/commerce/shipments/${shipmentId}/fulfilled`;
            console.log(urlShip);

            const response = await fetch(urlShip, {
                method: 'PUT',
                headers: {
                    'x-vol-app-claims': accessToken,
                    'x-vol-tenant': '100033',
                    'x-vol-site': '100058',
                    'Cookie': '__cf_bm=uE89w1q.iUsl66X9k7Yd7jLWLtw7SEDhzCwpxj1ZK0k-1729255129-1.0.1.1-kiMHp2bfd0nKROpQASUTtrDh38crjOpjsonSEaOU3eagoRy6ccMtb0vOt1KxOFvuS1uEjJQynVS7xxe3Yw2UFw'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(JSON.stringify(data));
            return data;
        } catch (error) {
            console.error("Unexpected error:", error);
            throw new Error("EgifterError: " + error.message);
        }
    }*/
}

module.exports = Shipment;