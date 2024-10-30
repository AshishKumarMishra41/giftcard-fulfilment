module.exports = {
  'http.storefront.routes': {
      actionName: 'http.storefront.routes',
      customFunction: require('./domains/storefront/http.storefront.routes')
  },
  'updateFulfillment': {
      actionName: 'http.storefront.routes',
      customFunction: require('./domains/storefront/updateFulfillment')
  }
};