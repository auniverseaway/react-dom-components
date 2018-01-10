import SauceLabs from 'saucelabs';
import WebServer from '../../index';
import DriverFactory from './DriverFactory';
import GoogleTest from './GoogleTest';
import LocalTest from './LocalTest';

export default class TestRunner {
    constructor() {
        this.init();
    }

    static test(driver) {
        new GoogleTest(driver);
        new LocalTest(driver);
    }

    init() {
        const server = new WebServer();

        const suiteName = 'UI Tests';
        const webDriver = new DriverFactory(suiteName);
        const drivers = webDriver.drivers;

        const saucelabs = TestRunner.getSauceLabs();

        // Run all the tests for each driver
        drivers.forEach((driver) => {
            let failedCount = 0;

            describe(`${suiteName} on ${driver.driverName}`, function() {
                this.timeout(0);

                TestRunner.test(driver);

                afterEach(function () {
                    if (this.currentTest.state !== 'passed') {
                        failedCount += 1;
                    }
                });

                /**
                 * After a suite has run, update SauceLabs
                 * and quit the driver.
                 */
                after(function() {
                    TestRunner.setJobState(
                        saucelabs,
                        driver.sessionID,
                        failedCount === 0
                    );
                    driver.quit();
                });
            });
        });

        after(function() {
            server.close();
        });
    }

    static setJobState(saucelabs, id, hasPassed) {
        if (saucelabs !== null) {
            saucelabs.updateJob(id, { passed: hasPassed });
        }
    }

    static getSauceLabs() {
        if (process.env.TEST_BROWSER === 'sauce') {
            const username = process.env.SAUCE_USERNAME;
            const accessKey = process.env.SAUCE_ACCESS_KEY;
            const saucelabs = new SauceLabs({
                username: username,
                password: accessKey
            });
            return saucelabs;
        }
        return null;
    }
}