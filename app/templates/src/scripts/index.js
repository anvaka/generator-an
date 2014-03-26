require('./appController');

var ngApp = angular.module('<%= appname %>', []);

require('an').flush(ngApp);

angular.bootstrap(document, [ngApp.name]);

module.exports = ngApp;
