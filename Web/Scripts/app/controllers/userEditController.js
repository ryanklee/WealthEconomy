//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

(function () {
    'use strict';

    var controllerId = 'userEditController';
    angular.module('main')
        .controller(controllerId, ['userService',
            'logger',
            '$location',
            '$routeParams',
            userEditController]);

    function userEditController(userService,
		logger,
		$location,
		$routeParams) {
        logger = logger.forSource(controllerId);

        var isNew = $location.path() === '/User/new';
        var isSaving = false;

        // Controller methods (alphabetically)
        var vm = this;
        vm.cancelChanges = cancelChanges;
        vm.isSaveDisabled = isSaveDisabled;
        vm.user = null;
        vm.saveChanges = saveChanges;
        vm.hasChanges = hasChanges;

        initialize();

        /*** Implementations ***/

        function cancelChanges() {

            $location.path('/User');

            if (userService.hasChanges()) {
                userService.rejectChanges();
                logWarning('Discarded pending change(s)', null, true);
            }
        }

        function hasChanges() {
            return userService.hasChanges();
        }

        function initialize() {

            if (isNew) {
                // TODO For development enviroment, create test entity?
            }
            else {
                userService.getUser($routeParams.Id)
                    .then(function (data) {
                        vm.user = data;
                    })
                    .catch(function (error) {
                        // TODO User-friendly message?
                    });
            }
        };

        function isSaveDisabled() {
            return isSaving ||
                (!isNew && !userService.hasChanges());
        }

        function saveChanges() {

            if (isNew) {
                userService.createUser(vm.user);
            } else {
                // To be able to do concurrency check, RowVersion field needs to be send to server
				// Since breeze only sends the modified fields, a fake modification had to be applied to RowVersion field
                var rowVersion = vm.user.RowVersion;
                vm.user.RowVersion = '';
                vm.user.RowVersion = rowVersion;
            }

            isSaving = true;
            return userService.saveChanges()
                .then(function (result) {
                    $location.path('/User');
                })
                .catch(function (error) {
                    // Conflict (Concurrency exception)
                    if (error.status === '409') {
                        // TODO Try to recover!
                    }
                })
                .finally(function () {
                    isSaving = false;
                });
        }
    };
})();
