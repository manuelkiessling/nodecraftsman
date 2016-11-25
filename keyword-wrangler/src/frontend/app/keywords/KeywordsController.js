(function () {
  'use strict'

  angular
      .module('app')
      .controller('KeywordsController', KeywordsController)

  KeywordsController.$inject = ['$scope', 'RepositoryFactory', 'resolveEntity']

  function KeywordsController (controllerScope, RepositoryFactory, resolveEntity) {
    /*  == Frontend Initialisation ==  */

    /*  All of this happens as soon as the page loads */

    /*  resolveEntity is a helper function which is used in partials/keywordCategoryGridCell.html
        in order to display the name of a keyword category based on it's id */
    controllerScope.resolveEntity = resolveEntity

    /*  A repository is the connection between this controller and the REST API.
        We use one for keyword categories... */
    var KeywordCategoriesRepository = new RepositoryFactory({
      endpoint: 'keywords/categories',
      retrieveItems: function (data) {
        return data._items
      }
    })
    // ...and one for keywords
    var KeywordsRepository = new RepositoryFactory({
      endpoint: 'keywords',
      retrieveItems: function (data) {
        return data._items
      }
    })
    /*  When the frontend loads, we want the controller to immediately load all keyword categories
        and keywords from the API */
    KeywordCategoriesRepository.readAll().then(function (keywordCategories) {
      controllerScope.keywordCategories = keywordCategories
      KeywordsRepository.readAll().then(function (keywords) {
        controllerScope.keywords = keywords
      })
    })
    /* The grid.  This part is best  ... oh yeah the listen to Tron soundtrack comment ... ! */
    controllerScope.keywordsGridOptions = {
      data: 'keywords', // this makes the grid use the data in controllerScope.keywords
      enableCellSelection: false, // breaks edit of cells with element if true
      enableCellEdit: true,
      keepLastSelected: false,
      enableRowSelection: false,
      multiSelect: false,
      enableSorting: true,
      enableColumnResize: true,
      enableColumnReordering: true,
      showFilter: false,
      rowHeight: '40',
      columnDefs: [
        {
          field: 'id',
          displayName: 'ID',
          enableCellEdit: false,
          width: '80px'
        },
        {
          field: 'value',
          displayName: 'Value'
        },
        {
              // The keyword category field does not use the built-in cell template, but our own
          field: 'keywordCategoryID',
          displayName: 'Category',
          cellTemplate: 'app/keywords/partials/keywordCategoryGridCell.html',
          editableCellTemplate: 'app/keywords/partials/keywordCategoryGridCellEditor.html'
        },
        {
              // Same goes for the operations column
          field: '',
          displayName: 'Operations',
          cellTemplate: 'app/keywords/partials/operationsGridCell.html',
          enableCellEdit: false,
          sortable: false
        }
      ]
    }

    /*  == Frontend operations == */

    //  These functions are called when the frontend is operated, E.g. if a button is clicked

    controllerScope.createKeyword = function (newKeyword) {
      controllerScope.$broadcast('ngGridEventEndCellEdit')
      if (newKeyword.value.length > 0) {
        KeywordsRepository.createOne(newKeyword).then(function () {
          KeywordsRepository.readAll().then(function (keywords) {
            controllerScope.keywords = keywords
          })
        })
      }
    }

    controllerScope.updateKeyword = function (keyword) {
      controllerScope.$broadcast('ngGridEventEndCellEdit')
      KeywordsRepository.updateOne(keyword)
    }

    controllerScope.deleteKeyword = function (keyword) {
      controllerScope.$broadcast('ngGridEventEndCellEdit')
      KeywordsRepository.deleteOne(keyword).then(function () {
        KeywordsRepository.readAll().then(function (keywords) {
          controllerScope.keywords = keywords
        })
      })
    }

    //  These are here to make the grid behave cleanly in regards to the keyword category select

    controllerScope.stopEditingKeywordCategory = function () {
      controllerScope.$broadcast('ngGridEventEndCellEdit')
    }

    controllerScope.$on('ngGridEventRows', function (newRows) {
      controllerScope.$broadcast('ngGridEventEndCellEdit')
    })
  };
})()
