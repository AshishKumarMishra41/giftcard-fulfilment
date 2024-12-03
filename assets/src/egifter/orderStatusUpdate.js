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
                            //console.log("Order fetch successful. Data:", orderDtls);
                            resolve(orderDtls);
                        }
                    }
                });
            } catch(error){
                console.error("Error: "+error.message);
                reject(new Error("OrderError: " + error));
            }
            
        });
    }
    getOrderActions(accessToken, orderId) {
        return new Promise((resolve, reject) => {
            
            try{
                const requestOptions = {
                    json: true,
                    method: 'GET',
                    url: `https://t100033-s100058.sb.usc1.gcp.kibocommerce.com/api/commerce/orders/${orderId}/actions`,
                    headers: {
                        'x-vol-app-claims': accessToken,
                        'x-vol-tenant': '100033',
                        'x-vol-site': '100058',
                        //'Cookie': '__cf_bm=.S18zhLVD_cw.W1z7_T0B7bOuOzBXQHMZ80ngd7p3Ks-1729084320-1.0.1.1-ODYkoZ4PIyExFb_ZBD15fJf3vJPbZqC5kIv0_t8vXd8DoHhSmsuexNgEsEixS5rDS8LR68vvQnI8T.LZJGxvDQ'
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
                            const orderActions = body;
                            //console.log("Order fetch successful. Data:", orderDtls);
                            resolve(orderActions);
                        }
                    }
                });
            } catch(error){
                console.error("Error: "+error.message);
                reject(new Error("OrderError: " + error));
            }
            
        });
    }
    performOrderAction(accessToken, orderId, orderAction) {
        return new Promise((resolve, reject) => {
            const obj = {
                "actionName": orderAction
            };
            console.log(JSON.stringify(obj));
            try{
                const requestOptions = {
                    // json: true,
                    method: 'POST',
                    url: `https://t100033-s100058.sb.usc1.gcp.kibocommerce.com/api/commerce/orders/${orderId}/actions`,
                    headers: {
                        'x-vol-app-claims': accessToken,
                        'x-vol-tenant': '100033',
                        'x-vol-site': '100058',
                        'content-type': 'application/json'
                        //'authorization': 'Bearer '+accessToken
                        //'Cookie': '__cf_bm=.S18zhLVD_cw.W1z7_T0B7bOuOzBXQHMZ80ngd7p3Ks-1729084320-1.0.1.1-ODYkoZ4PIyExFb_ZBD15fJf3vJPbZqC5kIv0_t8vXd8DoHhSmsuexNgEsEixS5rDS8LR68vvQnI8T.LZJGxvDQ'
                    },
                    body: JSON.stringify(obj)
                };
    
                console.log("Request: ", requestOptions);
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
                            const orderActionsResp = body;
                            //console.log("Order fetch successful. Data:", orderDtls);
                            resolve(orderActionsResp);
                        }
                    }
                });
            } catch(error){
                console.error("Error: "+error.message);
                reject(new Error("OrderError: " + error));
            }
            
        });
    }
    updateOrderAttribute(accessToken, orderId, status) {
        return new Promise((resolve, reject) => {
            const obj = [{
                "fullyQualifiedName": "Tenant~giftcardfraudstatus",
                "values": [
                    status ? true : false
                ]
            }];
            console.log(JSON.stringify(obj));
            try{
                const requestOptions = {
                    // json: true,
                    method: 'PUT',
                    url: `https://t100033-s100058.sb.usc1.gcp.kibocommerce.com/api/commerce/orders/${orderId}/attributes`,
                    headers: {
                        'x-vol-app-claims': accessToken,
                        'x-vol-tenant': '100033',
                        'x-vol-site': '100058',
                        'content-type': 'application/json'
                        //'authorization': 'Bearer '+accessToken
                        //'Cookie': '__cf_bm=.S18zhLVD_cw.W1z7_T0B7bOuOzBXQHMZ80ngd7p3Ks-1729084320-1.0.1.1-ODYkoZ4PIyExFb_ZBD15fJf3vJPbZqC5kIv0_t8vXd8DoHhSmsuexNgEsEixS5rDS8LR68vvQnI8T.LZJGxvDQ'
                    },
                    body: JSON.stringify(obj)
                };
    
                console.log("Request: ", requestOptions);
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
                            const orderActionsResp = body;
                            //console.log("Order fetch successful. Data:", orderDtls);
                            resolve(orderActionsResp);
                        }
                    }
                });
            } catch(error){
                console.error("Error: "+error.message);
                reject(new Error("OrderError: " + error));
            }
            
        });
    }
}

module.exports = OrderStatusUpdate;