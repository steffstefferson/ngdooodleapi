function ExampleJson() {
    return function ExampleJson() {
        this.Json = function () {
            return {
                "poll": {
                    "prettyUrl": "http://doodle.com/bdtc2fehhwifrf32",
                    "showAds": true,
                    "optionsText": [
         "Mo 16.03.15",
         "Mo 23.03.15",
         "Mo 30.03.15",
         "Mo 06.04.15",
         "Mo 13.04.15",
         "Mo 20.04.15",
         "Mo 27.04.15",
         "Mo 04.05.15",
         "Mo 11.05.15",
         "Mo 18.05.15",
         "Mo 25.05.15",
         "Mo 01.06.15",
         "Mo 08.06.15",
         "Mo 15.06.15",
         "Mo 22.06.15",
         "Mo 29.06.15"
      ],
                    "type": "date",
                    "title": "Trainingsplan 2015",
                    "participants": [
                        {
                            "preferences": "nnynyyyyyynyyyyy",
                            "name": "Tom K.",
                            "id": "-5252627537238276166",
                            "locked": false
         },
                        {
                            "preferences": "nnnnnnnynnnnnnnn",
                            "name": "Ädu R.",
                            "id": "-8803087716820974183",
                            "locked": false
         },
                        {
                            "preferences": "ynnnnyyyyynnyyyy",
                            "name": "Leo S.",
                            "id": "-966019439165994965",
                            "locked": false
         },
                        {
                            "preferences": "yyyyyyynnnnyyyyy",
                            "name": "Jano S.",
                            "id": "6453632464410757195",
                            "locked": false
         },
                        {
                            "preferences": "nyynnyyyyynnnnnn",
                            "name": "Budi B.",
                            "id": "-599062341670475831",
                            "locked": false
         },
                        {
                            "preferences": "nnynynyyynnnnnnn",
                            "name": "Bruno T.",
                            "id": "-3664410608310963813",
                            "locked": false
         },
                        {
                            "preferences": "ynynyyyyyynnnnnn",
                            "name": "Chris F.",
                            "id": "-3359759555720811837",
                            "locked": false
         },
                        {
                            "preferences": "ynyyyyyynynyynnn",
                            "name": "Jonas E.",
                            "id": "-1213128600878963031",
                            "locked": false
         },
                        {
                            "preferences": "nyyyyyynnnnyyyyy",
                            "name": "Martin B.",
                            "id": "-9079974801700342300",
                            "locked": false
         },
                        {
                            "preferences": "yqqyyyynyyyynnnn",
                            "name": "Stef Käser",
                            "id": "-2206804791691264180",
                            "locked": false
         }
      ],
                    "comments": [
                        {
                            "commentHTML": "zwei Wochen verletzt",
                            "commentator": "Michael",
                            "commentedDateTime": "10.05.15 16:30",
                            "emailHash": "a01016a58a27e89b118d795d535c067a",
                            "id": "1459633443",
                            "locked": true,
                            "userBehindCommentator": "ksmg4e31p783mpfqhqdu07atrsf5zcsg"
         },
                        {
                            "commentHTML": "ab ca. 19:00 als Claudio Ersatz in der Halle",
                            "commentator": "Cedric",
                            "commentedDateTime": "24.11.14 13:21",
                            "emailHash": "39c9ecad2ddfc86f037b7a900c9100ec",
                            "id": "2104129235",
                            "locked": true,
                            "userBehindCommentator": "73n9mav99szah3np9wtuayd7tdn6578u"
         }
      ]
                }
            };
        };
    };
};
angular.module('ngDoodle').service('ExampleJson', ExampleJson);