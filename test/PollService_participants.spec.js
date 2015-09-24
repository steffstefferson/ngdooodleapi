describe('ngDoodle.PollService >', function () {

    var PollService, api, $httpBackend, exampleJson;
    beforeEach(module('ngDoodle'));

    beforeEach(inject(function (_ExampleJson_) {
        exampleJson = _ExampleJson_;
    }));
    beforeEach(inject(function (_PollService_) {
        PollService = _PollService_;
        api = new PollService('bdtc2fehhwifrf32');
        api.json = new exampleJson().Json();
    }));

    describe('ng doodle api tests participants > ', function () {
        it('api is present', function () {
            expect(api).to.be.an('object');
            expect(api.json).to.be.an('object');
            expect(api.json.poll).to.be.an('object');
        });

        it('should has participants', function () {
            var participants = api.getParticipants();
            expect(participants).to.be.an('array').that.have.length(10);
            var first = participants[0];
            expect(first).to.have.property('preferences');
            expect(first).to.have.property('name');
            expect(first).to.have.property('id');
        });

        it('should fetch participants by name', function () {
            var first = api.getParticipants()[0];
            var firstByName = api.getParticipantsByName(first.name);
            expect(firstByName).to.have.property('preferences');
            expect(firstByName).to.have.property('name');
            expect(firstByName).to.have.property('id');
            expect(first).to.equal(firstByName);
        });

        it('should fetch participants by id', function () {
            var first = api.getParticipants()[0];
            var firstById = api.getParticipantsById(first.id);
            expect(firstById).to.have.property('preferences');
            expect(firstById).to.have.property('name');
            expect(firstById).to.have.property('id');
            expect(first).to.equal(firstById);
        });
        it('should return undefined if participant is not found', function () {
            var firstById = api.getParticipantsById('*#unknownId');
            expect(firstById).to.be.an('null');
        });

        it('participant should have valid preferences', function () {
            var first = api.getParticipants()[0];
            var options = api.getOptions();
            expect(first).to.have.property('preferences').that.have.length(options.length);

            for (var i = 0; i < first.preferences.length; i++) {
                var letter = first.preferences[i];
                var vaildPreference = letter == 'y';
                vaildPreference = vaildPreference || letter == 'n';
                vaildPreference = vaildPreference || letter == 'q';
                vaildPreference = vaildPreference || letter == 'm';
                expect(vaildPreference).to.be.true;
            }
        });
    });
});