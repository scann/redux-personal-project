/* Setup files module.
**
** This module will be executed before each test.
**
** This module contains a code to configure or set up the
** testing environment before each test. Since every test
** runs in its own environment, these scripts will be
** executed in the testing environment immediately before
** executing the test code itself.
**
** This module excutes before setupFramework module.
**
*/

// Mocks
import { LocalStorage } from './mocks/localStorage';
import { fetch } from './mocks/fetch';

const successMessage = 'TEST_SUCCESS_MESSAGE.';
const errorMessage = 'TEST_ERROR_MESSAGE.';
const token = 'TEST_TOKEN';
const error = new Error(errorMessage);
const emitError = new Error();

const filter = 'FILTER_STRING';

global.localStorage = new LocalStorage();

global.__ENV__ = global.__PROD__ = process.env.NODE_ENV;

const testMessage = {
    id:      'TEST_ID',
    message: 'TEST_MESSAGE',
};

const tasksList = {
    tasks: [
        {
            id:        'TEST_ID1',
            message:   'TEST_MESSAGE1',
            completed: true,
            favorite:  true,
        },
        {
            id:        'TEST_ID2',
            message:   'TEST_MESSAGE2',
            completed: false,
            favorite:  false,
        }
    ],
};

const responseDataSuccess = {
    data:    tasksList,
    message: successMessage,
};

const responseDataFail = {
    message: error,
};

const fetchResponseSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const fetchResponseFail400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

global.__ = {
    errorMessage,
    token,
    error,
    emitError,
    filter,
    testMessage,
    tasksList,
    fetchResponseSuccess,
    fetchResponseFail400,
};
global.fetch = fetch;
global.localStorage = new LocalStorage();
