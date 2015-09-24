describe('ngDoodle.PollService > ', function () {

    var PollService, api, $httpBackend, exampleJson;
    beforeEach(module('ngDoodle'));

    beforeEach(inject(function (_ExampleJson_) {
        exampleJson = _ExampleJson_;
    }));
    beforeEach(inject(function (_PollService_) {
        PollService = _PollService_;
        api = new PollService('bdtc2fehhwifrf32');
        api.json = new exampleJson().Json();
        //make sure the poll is not outdated
        api.json.poll.optionsText[api.json.poll.optionsText.length - 1] = "Mo 11.06.23";
    }));

    describe('ng doodle api tests for special options > ', function () {

        it('should has a best option', function () {
            var option = api.getBestOption();
            expect(option).to.be.an('object');
            expect(option.rating).to.be.above(0);

            var options = api.getOptions();
            for (var i = 0; i < options.length; i++) {
                expect(option.rating).to.at.least(options[i].rating);
            }
        });

        it('should be able to convert the dates', function () {
            var dateEnglish = api._convertToDate("Mon 3/16/15");
            var dateGerman = api._convertToDate("Mo 16.3.15");
            expect(dateEnglish).to.be.an('date');
            expect(dateGerman).to.be.an('date');

            expect(dateEnglish.getTime()).to.equal(dateGerman.getTime());

            expect(dateEnglish.getDate()).to.equal(16);
            expect(dateEnglish.getMonth() + 1).to.equal(3);
            expect(dateEnglish.getFullYear()).to.equal(2015);

        });

        it('should has an upcoming option', function () {
            var option = api.getUpcomingOption();
            expect(option).to.be.an('object');
            console.log('upcoming date is: ' + option.optionText);
            var today = new Date();
            today.setDate(today.getDate() + 1);
            expect(option.date.getTime()).to.at.least(today.getTime());
        });
    });
});