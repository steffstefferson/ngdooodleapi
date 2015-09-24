describe('DoodleApi', function () {

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

    describe('ng doodle api tests for comments of poll > ', function () {

        it('should has comments', function () {
            var comments = api.getComments();
            expect(comments).to.be.an('array').that.have.length(2);
            var comment = comments[0];
            expect(comment).to.be.an('object');
            expect(comment).to.has.property('commentHTML');
            expect(comment).to.has.property('commentator');
            expect(comment).to.has.property('commentedDateTime');
        });
    });
});