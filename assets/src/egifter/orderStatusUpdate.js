const request = require('request');

class OrderStatusUpdate {
    getOrderDetails(accessToken, orderId) {
        return new Promise((resolve, reject) => {
            
            try{
                const requestOptions = {
                    json: true,
                    method: 'GET',
                    url: `https://t100033-s100058.sb.usc1.gcp.kibocommerce.com/api/commerce/orders/${orderId}`,
                    headers: {
                        'x-vol-app-claims': accessToken,
                        'x-vol-tenant': '100033',
                        'x-vol-site': '100058',
                        //'Cookie': '__cf_bm=.S18zhLVD_cw.W1z7_T0B7bOuOzBXQHMZ80ngd7p3Ks-1729084320-1.0.1.1-ODYkoZ4PIyExFb_ZBD15fJf3vJPbZqC5kIv0_t8vXd8DoHhSmsuexNgEsEixS5rDS8LR68vvQnI8T.LZJGxvDQ'
                    }
                };
    
                request(requestOptions, (error, response, body) => {
                    if (error) {
                        logger.error("Fetch Order failed:", error.message);
                        reject(new Error("Order Error: " + error.message));
                    } else {
                        logger.log(response.statusCode);
                        if (response.statusCode !== 200 && response.statusCode !== 201) {
                            logger.error("Failed: HTTP response code:", response.statusCode);
                            logger.error("Failed: HTTP response message:", response.statusMessage);
                            reject(new Error("Order Error: " + response.statusMessage));
                        } else {
                            const orderDtls = body;
                            logger.log("Order fetch successful. Data:", orderDtls);
                            resolve(orderDtls.status);
                        }
                    }
                });
            } catch(error){
                logger.error("Error: "+error.message);
                reject(new Error("OrderError: " + error));
            }
            
        });
    }
}

module.exports = OrderStatusUpdate;