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
import { fromJS, Map } from 'immutable';

const successMessage = 'TEST_SUCCESS_MESSAGE.';
const errorMessage = 'TEST_ERROR_MESSAGE.';
const token = 'TEST_TOKEN';
const error = new Error(errorMessage);
const emitError = new Error();

const filter = 'FILTER_STRING';

global.localStorage = new LocalStorage();

global.__ENV__ = global.__PROD__ = process.env.NODE_ENV;
global.__DEV__ = true;

const testMessage = {
    id:      'TEST_ID',
    message: 'TEST_MESSAGE',
};

const task = {
    id:        'TEST_ID',
    message:   'TEST_MESSAGE',
    completed: false,
    favorite:  true,
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
const tasksListCompleted = fromJS(

    Map({
        id:        'TEST_ID1',
        message:   'TEST_MESSAGE1',
        completed: true,
        favorite:  true,
    }),
    Map({
        id:        'TEST_ID2',
        message:   'TEST_MESSAGE2',
        completed: true,
        favorite:  false,
    }),
);

const responseDataSuccess = {
    data:    tasksList,
    message: successMessage,
};

const responseDataFail = {
    message: errorMessage,
};

const responseDataSuccessUpdate = {
    data: [
        task,
        successMessage
    ],
};

const responseDataFailUpdate = {
    data: [
        task,
        error
    ],
};

const fetchResponseSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const fetchResponseSuccessUpdate = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccessUpdate)),
};

const fetchResponseFail400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const fetchResponseFail400Update = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFailUpdate)),
};

const fetchResponseSuccess204 = {
    status: 204,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

global.__ = {
    errorMessage,
    token,
    error,
    emitError,
    filter,
    testMessage,
    tasksList,
    tasksListCompleted,
    task,
    fetchResponseSuccess,
    fetchResponseFail400,
    fetchResponseFail400Update,
    responseDataFail,
    responseDataFailUpdate,
    responseDataSuccess,
    fetchResponseSuccess204,
    fetchResponseSuccessUpdate,
};
global.fetch = fetch;
global.localStorage = new LocalStorage();
