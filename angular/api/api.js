'use strict';

angular.module('Api', [])
    .config(function () {})

    .constant('baseUrlMockeyWeb', 'http://10.10.10.123:8080')

    .constant('loginUrl', '/system/login')
    .constant('expensesUrl', '/expense')
    .constant('currenciesUrl', '/currency')
    .constant('expenseTypesUrl', '/expenseTypes')
    .constant('reportsUrl', '/expense/report')
    .constant('projectsUrl', '/project')
    .constant('imagesUrl', '/image')
    .constant('reportExpensesUrl', '/expense/report/expenses')

    .constant('expensesPath', '/expenses')
    .constant('reportsPath', '/reports')
    .constant('expensePath', '/expense');
