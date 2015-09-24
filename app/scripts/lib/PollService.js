/**
 * @ngdoc service
 * @name pollService
 * @description
 *  Provides a service for accessing the data of a doodle.com poll
 */
/* global google */
(function () {
    'use strict';

    var PollService = function ($log, $http, $q) {
        return function PollService(key, server) {
            var server = server || 'http://doodle.frickler.ch/doodleJsonFetcher.php?keyOfPoll=';
            this.url = server + key;
            this.json = {};


            /**
             * loads the json of the poll from the backend. (backend and the poll key are defined when creating the service object)
             * @memberof PollService
             * @returns {HttpPromise} which will be resolved as soon as the poll is ready to use.
             */
            this.load = function () {
                var deferred = $q.defer();
                var promise = $http.get(this.url);
                var ok = this;

                promise.then(function (data) {
                    ok.json = data.data;
                    deferred.resolve(this.json);
                }, function (error) {
                    $log.error('could not load url' + url);
                    deferred.reject(error);
                });
                return deferred.promise;

            };

            /**
             * returns all participants of the poll
             * @memberof PollService
             * @returns an array of participants
             */
            this.getParticipants = function () {
                return this.json.poll.participants;
            };

            /**
             * fetch the participant by its id
             * @memberof PollService
             * @param {id} id of the participant
             * @returns the participant or null if not found.
             */
            this.getParticipantsById = function (id) {
                return this._getParticipantsBy('id', id);
            };


            /**
             * fetch the participant by its name, if the name is not unique the first
             * matching participant is returned.
             * @memberof PollService
             * @param {name} name of the participant
             * @returns the participant or null if not found.
             */
            this.getParticipantsByName = function (name) {
                return this._getParticipantsBy('name', name);
            };

            /**
             * @access private
             * @memberof PollService
             * fetch a participant by the defined key matching a value
             * @param {key} key to compare
             * @param {value} value to compare
             * @returns the participant or null if not found.
             */
            this._getParticipantsBy = function (key, value) {
                var all = this.getParticipants();
                for (var i = 0; i < all.length; i++) {
                    if (all[i][key] == value) {
                        return all[i];
                    }
                }
                return null;
            };

            /** 
             * Creation an option object
             * @memberof PollService
             * @access private
             * @returns the participant or null if not found.
             */
            this._createOption = function (text, id) {
                var option = {
                    yes: [],
                    no: [],
                    maybe: [],
                    unknown: [],
                    optionText: text,
                    id: id,
                    rating: 0
                };

                var all = this.getParticipants();
                for (var i = 0; i < all.length; i++) {
                    if (all[i].preferences[id] == 'y') {
                        option.yes = option.yes.concat([all[i]]);
                    } else if (all[i].preferences[id] == 'm') {
                        option.maybe = option.maybe.concat([all[i]]);
                    } else if (all[i].preferences[id] == 'n') {
                        option.no = option.no.concat([all[i]]);
                    } else if (all[i].preferences[id] == 'q') {
                        option.unknown = option.unknown.concat([all[i]]);
                    } else {
                        $log.warn('unknown preference ' + all[i].preferences[id]);
                    }
                }
                //todo better rating algorithm
                option.date = this._convertToDate(text);
                option.rating = option.yes.length * 4 + option.maybe.length * 2 + option.unknown.length;
                option.all = function () {
                    var all = [
                        {
                            name: 'yes',
                            participants: option.yes
                      },
                        {
                            name: 'no',
                            participants: option.no
                      },
                        {
                            name: 'maybe',
                            participants: option.maybe
                      },
                        {
                            name: 'unknown',
                            participants: option.unknown
                      }];
                    return all;
                };
                return option;
            };

            /**
             * returning all available options of a poll
             * @memberof PollService
             * @returns an array of option objects
             */
            this.getOptions = function () {
                var all = this.getOptionsText();
                var options = [];
                for (var i = 0; i < all.length; i++) {
                    options = options.concat(this._createOption(all[i], i));
                }
                return options;
            };

            /**
             * returning all available options (text only)  of a poll
             * @memberof PollService
             * @returns an array of option string
             */
            this.getOptionsText = function () {
                return this.json.poll.optionsText;
            };

            /**
             * @memberof PollService
             * fetch an option object by its name
             * @param {name} name of option
             * @returns the option object or null if not found
             */
            this.getOptionByName = function (name) {
                var all = this.getOptionsText();
                for (var i = 0; i < all.length; i++) {
                    if (all[i] == name) {
                        return this._createOption(all[i], i);
                    }
                }
                return null;
            };

            /**
             * @memberof PollService
             * fetch an option object by its index
             * @param {idx} index of option
             * @returns the option object or null if not found
             */
            this.getOptionByIdx = function (idx) {
                var all = this.getOptionsText();
                if (isNaN(idx) || idx < 0 || all == null || all.length <= idx) {
                    return null;
                }
                return this._createOption(all[idx], idx);
            };

            /**
             * @memberof PollService
             * returns the option with the best approval
             * @returns the option object
             */
            this.getBestOption = function () {
                var options = this.getOptions();
                if (options.length == 0) {
                    return null;
                }
                var bestOption = options[0];
                for (var i = 1; i < options.length; i++) {
                    if (bestOption.rating < options[i].rating) {
                        bestOption = options[i];
                    }
                }
                return bestOption;
            };

            /**
             * @memberof PollService
             * returns the option with next upcoming date
             * @returns the option object
             */
            this.getUpcomingOption = function () {
                var options = this.getOptions();
                var today = new Date();
                today.setDate(today.getDate() + 1);
                for (var i = 0; i < options.length; i++) {
                    if (options[i].date >= today) {
                        return options[i];
                    }
                }
                return null;
            };

            /**
             * @memberof PollService
             * fetching all comments
             * @returns array of comment
             */
            this.getComments = function () {
                return this.json.poll.comments;
            }

            /**
             * @memberof PollService
             * @access private
             * try to convert the option name to a date
             * @returns array of comment
             */
            this._convertToDate = function (text) {
                if (text.indexOf(" ") > 0) {
                    text = text.split(" ")[1];
                }
                if (text.indexOf(".") > 0) {
                    $log.info("convertToDate: text detected as german date " + text);
                    text = text.split(".")[1] + "/" + text.split(".")[0] + "/" + text.split(".")[2];
                }
                return new Date(text);
            };
        };
    }
    angular.module('ngDoodle').service('PollService', PollService);
})();