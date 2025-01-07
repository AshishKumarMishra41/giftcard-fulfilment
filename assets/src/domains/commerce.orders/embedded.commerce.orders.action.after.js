/**
 * Implementation for embedded.commerce.orders.action.after

 * This custom function will receive the following context object:
{
  "exec": {
    "setItemAllocation": {
      "parameters": [
        {
          "name": "allocationId",
          "type": "number"
        },
        {
          "name": "expiration",
          "type": "date"
        },
        {
          "name": "productCode",
          "type": "string"
        },
        {
          "name": "itemId",
          "type": "string"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.order.orderItem"
      }
    },
    "setAttribute": {
      "parameters": [
        {
          "name": "fqn",
          "type": "string"
        },
        {
          "name": "values",
          "type": "object"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.order.order"
      }
    },
    "removeAttribute": {
      "parameters": [
        {
          "name": "fqn",
          "type": "string"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.order.order"
      }
    },
    "setData": {
      "parameters": [
        {
          "name": "key",
          "type": "string"
        },
        {
          "name": "value",
          "type": "object"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.order.order"
      }
    },
    "removeData": {
      "parameters": [
        {
          "name": "key",
          "type": "string"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.order.order"
      }
    },
    "setItemData": {
      "parameters": [
        {
          "name": "key",
          "type": "string"
        },
        {
          "name": "value",
          "type": "object"
        },
        {
          "name": "itemId",
          "type": "string"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.order.orderItem"
      }
    },
    "removeItemData": {
      "parameters": [
        {
          "name": "key",
          "type": "string"
        },
        {
          "name": "itemId",
          "type": "string"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.order.orderItem"
      }
    },
    "setDutyAmount": {
      "parameters": [
        {
          "name": "dutyAmount",
          "type": "number"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.order.order"
      }
    }
  },
  "get": {
    "order": {
      "parameters": [],
      "return": {
        "type": "mozu.commerceRuntime.contracts.orders.order"
      }
    }
  }
}


 */
const SubmitGiftCardOrder = require("../../egifter/submitGiftcardOrder");

module.exports = function(context, callback) {
  const gcOrder = new SubmitGiftCardOrder();
  console.log("06-01-2025 Order after -->> ",context.get.order);
  gcOrder.sendGiftcardOrderFraudCheck(orderDtls)
    .then(result => {
      console.log("Gift card order created successfully:", result);
      context.response.end();
      callback();
    })
    .catch(error => {
      console.error("Failed to create gift card order:", error.message);
      callback("Failed to create gift card order:");
    });
};