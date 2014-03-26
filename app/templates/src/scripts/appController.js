require('an').controller(AppController);

function AppController($scope) {
  $scope.greeting = '<%= greeting %>';
}
