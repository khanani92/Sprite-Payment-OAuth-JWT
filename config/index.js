(function() {
    'use strict';
    module.exports = function(db, app) {
        app.controllers = {};
        app.db = {};
        app.services = {};


        require('./db')(db);
        require('./logs')(app);
        require('./stripeKeys')(app);
    }
})();
