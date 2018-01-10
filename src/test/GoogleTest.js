import chai from 'chai';

export default class GoogleTest {
    constructor(driver) {
        // Setup Assertion Library
        const assert = chai.assert;
        const should = chai.should();

        describe('Google Test', function() {
            // Ensure Google Opens
            it('Open Google', function() {
                return driver.get('https://www.google.com');
            });

            // Make sure the title is a string
            it('Get String', function() {
                return driver.getTitle().then(function(title) {
                    title.should.be.a('string');
                });
            });

            // Make sure the title is 'Google'
            it('Get Title', function() {
                return driver.getTitle().then(function(title) {
                    assert.equal('Google', title);
                });
            });
        });
    }
}
