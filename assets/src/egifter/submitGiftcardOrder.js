const request = require('request');
const MFFGiftCardConstants = {
    POST: 'POST',
    APPLICATION_JSON: 'application/json'
};

const promoOrderUrl = "https://api-stage.egifter.com/v3/OrderNotification";
const userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11";
const accessToken = "r9l5tt9ld1r0ndr0k179r8r0l195nd2ck6h11th1rr9cl2n1rr20nt2c2r282ctr"; 

class SubmitGiftCardOrder {
    sendGiftcardOrderFraudCheck(orderDtls) {

        return new Promise((resolve, reject) => {

            var payload = {
                "orderStatus": "Accepted",
                "externalOrderNumber": "o305740038",
                "totalOrderQuantity": 1,
                "externalOrderId": "MG22129600",
                "items": [
                  {
                    "sku": "101544719",
                    "price": 50.0,
                    "externalItemId": "101544719",
                    "quantity": 1
                  }
                ],
                "shippingDetails": {
                  "shippingCode": "Digital",
                  "shippingAddress": {
                    "Address1": "527 6TH AVE S",
                    "Address2": "TEST",
                    "City": "SAINT CLOUD",
                    "State": "MN",
                    "PostalCode": "56301-4337",
                    "Country": "US",
                    "FirstName": "Vinod",
                    "LastName": "Rai",
                    "Email": "binodkumar.ray@skillnetinc.com",
                    "Phone": "7872681812"
                  }
                },
                "Userblob": "{\"authorizationStep\":\"POST_AUTHORIZATION\",\"checkoutTime\":1727440221,\"orderType\":\"WEB\",\"accountOwner\":{\"accountId\":\"193260000\",\"created\":1665733910,\"email\":\"binodkumar.ray@skillnetinc.com\",\"firstName\":\"Binod\",\"lastLoginIP\":\"\",\"lastName\":\"Ray\",\"pastOrdersCount\":\"\",\"pastOrdersSum\":\"\",\"registrationIP\":\"\"},\"connectionInformation\":{\"forterTokenCookie\":\"bcaf7b703b054e09bc73d53c30aab6a3_1727360280316__UDF43-m4_11ck_\"},\"customerAccountData\":{\"status\":\"ACTIVE\",\"type\":\"PRIVATE\"},\"payment\":[{\"amount\":{\"amountUSD\":\"50.0\"},\"defaultPaymentMethod\":false,\"delayedCharge\":false,\"numberOfInstallments\":0,\"creditCard\":{\"bin\":\"401200\",\"cardBank\":\"\",\"cardBrand\":\"visa\",\"cardType\":\"CREDIT\",\"countryOfIssuance\":\"US\",\"expirationMonth\":\"12\",\"expirationYear\":\"2025\",\"lastFourDigits\":\"0537\",\"nameOnCard\":\"BINOD K\",\"paymentGatewayData\":{\"authorizationStep\":\"post-authorization\",\"gatewayMerchantId\":\"\",\"gatewayName\":\"aci_rcs\",\"gatewayTransactionId\":\"8ac7a4a2923371a201923375c1f70d15\",\"integrationType\":\"PA\"},\"paymentProcessorData\":{\"processorMerchantId\":\"\",\"processorName\":\"\",\"processorTransactionId\":\"\"},\"verificationResults\":{\"authorizationCode\":\"OK2981\",\"authorizationProcessedWith3DS\":false,\"avsFullResult\":\"Y\",\"avsNameResult\":\"M\",\"cvvResult\":\"U\",\"processorResponseText\":\"\"}},\"billingDetails\":{\"address\":{\"address1\":\"527 6TH AVE S\",\"address2\":\"TEST\",\"city\":\"SAINT CLOUD\",\"company\":\"\",\"country\":\"US\",\"region\":\"MN\",\"zip\":\"56301-4337\"},\"personalDetails\":{\"email\":\"binodkumar.ray@skillnetinc.com\",\"firstName\":\"Binod\",\"lastName\":\"Ray\"},\"phone\":[{\"phone\":\"7872681812\",\"smsVerified\":{\"sent\":true,\"verified\":true}}]}}],\"totalAmount\":{\"amountUSD\":\"50.0\"}}",
                "PendingOrderId": "OCN15404465",
                "CallbackUrl": "https://t100033-s100058.sb.usc1.gcp.kibocommerce.com/api-egifter-fraud"
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