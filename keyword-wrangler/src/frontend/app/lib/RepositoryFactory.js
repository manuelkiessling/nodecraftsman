'use strict';

(function() {

  var app = angular.module('app');

  app.factory(
    'RepositoryFactory',
    ['Restangular', '$q', RepositoryFactory]
  );

  function RepositoryFactory(Restangular, $q) {

    Restangular.setBaseUrl('/api/');

    var Repository = function(options) {
      this.endpoint = options.endpoint;
      this.retrieveItems = options.retrieveItems;
    };

    Repository.prototype.readAll = function() {
      var self = this;
      var deferred = $q.defer();
      Restangular.all(self.endpoint + '/').doGET().then(function(data) {
        var items = self.retrieveItems(data);
        deferred.resolve(items);
      });
      return deferred.promise;
    };

    Repository.prototype.createOne = function(newItem) {
      var self = this;
      var deferred = $q.defer();
      Restangular.one(self.endpoint + '/', '').post('', newItem).then(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    };

    Repository.prototype.updateOne = function(item) {
      var self = this;
      var deferred = $q.defer();
      Restangular.one(self.endpoint, item.id).post('', item).then(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    };

    Repository.prototype.deleteOne = function(item) {
      var self = this;
      var deferred = $q.defer();
      Restangular.one(self.endpoint, item.id).remove().then(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    };

    return Repository;

  }

})();