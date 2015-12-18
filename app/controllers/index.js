'use strict';

module.exports = function(app, q) {
	require('./user')(app);
	require('./session')(app);
	require('./stripePayment')(app);
};
