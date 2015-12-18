/**
 * Created by muddassir on 18/12/15.
 */
'use strict';
module.exports = function(app) {
  app.getKey = function(type) {
    if (type == 'test') {
      return 'sk_test_xVcn0L0rxkKMltPL9l9DN5KV';
    } else if (type == "live") {
      return 'sk_live_lyHaccFb8joxNRjwKmtFk9Ym';
    }
  }
};
