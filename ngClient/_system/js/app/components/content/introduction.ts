﻿//import { LoggerService } from "../../ng2/services/logger";

class IntroductionController {

    static $inject = ["dataContext", "logger", "resourcePoolFactory", "$scope", "$timeout"];

    constructor(dataContext: any, logger: any, resourcePoolFactory: any, $scope: any, $timeout: any) {

        var vm: any = this;
        vm.upoConfig = { userName: "sample", resourcePoolKey: "Unidentified-Profiting-Object" };

        // TODO Disabled for the moment, since it automatically triggers "anonymous user interacted" / coni2k - 07 Jun. "16
        //_init();

        /*** Implementations ***/

        function _init() {

            resourcePoolFactory.getResourcePoolExpanded(vm.upoConfig)
                .then(resourcePool => {

                    var increaseMultiplierTimeout = $timeout(increaseMultiplier, 500);

                    function increaseMultiplier() {

                        // Increase the multiplier
                        resourcePool.ElementSet.forEach(element => {
                            resourcePoolFactory.updateElementMultiplier(element, "increase");
                        });

                        // Then increase recursively
                        increaseMultiplierTimeout = $timeout(increaseMultiplier, 2500);
                    }

                    // When the DOM element is removed from the page,
                    // AngularJS will trigger the $destroy event on
                    // the scope. This gives us a chance to cancel any
                    // pending timer that we may have.
                    $scope.$on("$destroy",
                        event => {
                            $timeout.cancel(increaseMultiplierTimeout);
                        });
                });
        }
    }
}

export const introduction: angular.IComponentOptions = {
    controller: IntroductionController,
    controllerAs: "vm",
    templateUrl: "/_system/js/app/components/content/introduction.html?v=0.65.0"
};
