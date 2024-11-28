const request = require('request');

class Authenticate {
     authenticate() {
        return new Promise((resolve, reject) => {
            try {
                const requestOptions = {
                    json: true,
                    method: 'POST',
                    url: 'https://t100033-s100058.sb.usc1.gcp.kibocommerce.com/api/platform/applications/authtickets',
                    body: {
                        "applicationId": "FFM.fleetform_data_integration_dev.1.0.0.Release",
                        "sharedSecret": "78f655a1d0c349c9ae2596be0ce1b7f3"
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            
                request(requestOptions, (error, response, body) => {
                    if (error) {
                        console.error("Authentication failed:", error.message);
                        reject(new Error("EgifterError: " + error.message));
                    } else {
                        console.log("Response Code:", response.statusCode);
                        if (response.statusCode !== 200 && response.statusCode !== 201) {
                            console.error("Failed: HTTP response code:", response.statusCode);
                            console.error("Failed: HTTP response message:", response.statusMessage);
                            reject(new Error("EgifterError: " + response.statusMessage));
                        } else {
                            const accessToken = body.accessToken;
                            console.log("Initial Authentication successful. Access Token:", accessToken);
                            resolve(accessToken);
                        }
                    }
                });
            } catch (error) {
                console.error("Unexpected error:", error.message);
                reject(new Error("EgifterError: " + error.message));
            }

        });
        
    }
}

module.exports = Authenticate;