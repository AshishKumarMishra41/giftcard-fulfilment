const request = require('request');
const MFFGiftCardConstants = {
    POST: 'POST',
    APPLICATION_JSON: 'application/json'
};

const promoOrderUrl = "https://api-stage.egifter.com/v3/OrderNotification";
const userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11";
const accessToken = "r9l5tt9ld1r0ndr0k179r8r0l195nd2ck6h11th1rr9cl2n1rr20nt2c2r282ctr"; 

class SubmitGiftCardOrder {
    sendGiftcardOrderFulfilment(orderDtls, ocn) {

        return new Promise((resolve, reject) => {

            var payload = {
                "orderStatus": "Approved",
                "externalOrderNumber": "MG4351300",
                "totalOrderQuantity": 50,
                "externalOrderId": "o2398046629",
                "items": [
                  {
                    "sku": "101138313",
                    "price": 125.0,
                    "externalItemId": "101138313",
                    "quantity": 1
                  }
                ],
                "shippingDetails": {
                  "shippingCode": "USPS1",
                  "shippingAddress": {
                    "Address1": "4725 DAHLGREN RD",
                    "City": "CARVER",
                    "State": "MN",
                    "PostalCode": "55315-2201",
                    "Country": "US",
                    "FirstName": "Adam",
                    "LastName": "Holder",
                    "Email": "info@carverdental.com",
                    "Phone": "9529609060"
                  }
                },
                "PendingOrderId": ocn,
                "CallbackUrl": "https://t100033-s100058.sb.usc1.gcp.kibocommerce.com/api-egifter-shipment"
              };
            
            try{
                const promoOrder = payload;

                const requestOptions = {
                    json: true,
                    method: MFFGiftCardConstants.POST,
                    url: promoOrderUrl,
                    body: promoOrder,
                    headers: {
                        'User-Agent': userAgent,
                        'Accept': MFFGiftCardConstants.APPLICATION_JSON,
                        'Content-Type': MFFGiftCardConstants.APPLICATION_JSON,
                        'AccessToken': accessToken
                    }
                };

                console.log("Egifter request body:", promoOrder);

                request(requestOptions, (error, response, body) => {
                    if (error) {
                        console.error("Error occurred:", error.message);
                        reject(new Error("EgifterError: " + error.message));
                    } else {
                        console.log("Response Code:", response.statusCode);
                        if (response.statusCode != 200 && response.statusCode != 201) {
                            console.error("Failed: HTTP response code:", response.statusCode);
                            console.error("Failed: HTTP response message:", response.statusMessage);
                            reject(new Error("EgifterError: " + response.statusMessage));
                        } else {
                            resolve(body);
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

module.exports = SubmitGiftCardOrder;