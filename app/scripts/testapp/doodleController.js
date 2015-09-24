(function () {
    'use strict';
    angular.module('testapp')
        .controller('DoodleTestController', function (PollService) {
            var vm = this;
            vm.message = "loading.....";
            vm.pollLoaded = false;
            vm.newkey = 'bdtc2fehhwifrf32';

            vm.displayOption = function (option) {
                vm.optionDetail = vm.api.getOptionByName(option);
            };

            vm.selectParticipant = function (participant) {
                vm.selectedParticipant = participant;
            };

            vm.defineOptionClass = function (idx) {
                if (vm.selectedParticipant == null) {
                    return;
                }
                return 'option_' + vm.selectedParticipant.preferences[idx];

            };

            vm.reloadPoll = function () {
                vm.key = vm.newkey;
                vm.message = "loading.....";
                vm.api = new PollService(vm.key);
                vm.api.load().then(function () {
                    vm.selectedParticipant = null;
                    vm.message = 'doodle with key ' + vm.key + ' successful loaded';
                    vm.pollLoaded = true;
                    vm.optionDetail = vm.api.getOptions()[0];
                }, function () {
                    vm.message = 'unable to load doodle with key ' + vm.key;
                });
            };

            vm.reloadPoll();
        });
}());