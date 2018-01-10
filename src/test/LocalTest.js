import { Builder, By, until } from 'selenium-webdriver';
import chai from 'chai';

export default class LocalTest {
    constructor(driver) {
        // Setup Assertion Library
        const assert = chai.assert;
        const should = chai.should();

        describe('Local Test', function() {
            // Ensure Local Opens
            it('Open Local', function() {
                return driver.get('http://localhost:3000');
            });

            // Make sure the title is 'Google'
            it('Get Title', function() {
                return driver.getTitle().then(function(title) {
                    assert.equal('React DOM Components Test', title);
                });
            });

            it('Get Element', function() {
                return driver.findElement(By.id('logo')).then(function (element) {
                    return element.getAttribute('outerHTML').then(function (outer) {
                        console.log(outer);
                    });
                });
            });
        });
    }
}
