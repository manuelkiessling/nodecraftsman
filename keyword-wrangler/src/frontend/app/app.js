(function () {
  'use strict'

  angular
    .module('app', ['ngRoute', 'ngGrid', 'restangular'])
    .config(config)

  function config ($routeProvider) {
    // This makes app/keywords/KeywordsController.js handle the http://localhost:8080/#/ URL
    $routeProvider
      .when('/', {
        templateUrl: 'app/keywords/partials/editor.html',
        controller: 'KeywordsController',
        controllerAs: 'controllerScope'
      })
  };
})()
