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
    }));

    describe('ng doodle api tests options > ', function () {
        it('api is present', function () {
            expect(api).to.be.an('object');
            expect(api.json).to.be.an('object');
            expect(api.json.poll).to.be.an('object');
        });

        it('should has options with only text', function () {
            var options = api.getOptionsText();
            expect(options).to.be.an('array').that.have.length(16);
            var first = options[0];
            expect(first).to.be.an('string');
        });

        it('should has options', function () {
            var options = api.getOptions();
            expect(options).to.be.an('array').that.have.length(16);
            var first = options[0];
            expect(first).to.be.an('object');
        });

        it('should fetch options by name', function () {
            var first = api.getOptionsText()[0];
            expect(first).to.be.an('string');
            var firstByName = api.getOptionByName(first);
            expect(firstByName).to.be.an('object');
            expect(firstByName).to.have.property('optionText');
            expect(first).to.equal(firstByName.optionText);
        });

        it('should fetch option by index', function () {
            expect(api.getOptionByIdx).to.be.an('function');
            var firstById = api.getOptionByIdx(0);
            expect(firstById).to.be.an('object');
            firstById = api.getOptionByIdx('4');
            expect(firstById).to.be.an('object');
        });

        it('fetching option by invalid index returns null', function () {
            expect(api.getOptionByIdx).to.be.an('function');
            var firstById = api.getOptionByIdx(-4);
            expect(firstById).to.be.an('null');
            firstById = api.getOptionByIdx('adsf');
            expect(firstById).to.be.an('null');
        });

        it('option object is complete', function () {
            var first = api.getOptionByIdx(0);
            expect(first).to.be.an('object');
            expect(first).to.have.property('optionText');
            expect(first).to.have.property('yes');
            expect(first).to.have.property('no');
            expect(first).to.have.property('maybe');
            expect(first.yes).to.be.an('array')
            expect(first.no).to.be.an('array')
            expect(first.maybe).to.be.an('array')

            var total = first.yes.length + first.no.length + first.maybe.length;
            expect(total).to.equal(api.getParticipants().length);

        });

    });
});