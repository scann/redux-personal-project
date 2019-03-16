//Core
import { put, call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

//Instruments
import { api } from '../../../REST';
import { tasksActions } from '../actions';
import { uiActions } from '../../ui/actions';
import { completeAllTasks } from '../saga/workers';
import { tasksReducer, initialState } from '../reducer';

describe('completeAllTasks saga:', () => {
    it('should complete a 200 status response scenario', () => {
        const selector = (state) => state.tasks;

        return expectSaga(completeAllTasks, __.tasksListCompleted)
            .put(uiActions.startSpinning())
            .withReducer(tasksReducer, initialState)
            .provide([[matchers.select.selector(selector), __.tasksList]])
            .provide({ all: () => __.tasksListCompleted })
            //.provide([[call([Promise, Promise.all], promises), promises]])
            //.put(tasksActions.completeAllTasks())
            .put(uiActions.stopSpinning())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(completeAllTasks)
            .put(uiActions.startSpinning())
            //.provide([[apply(api, api.tasks.update, [__.task]), __.fetchResponseFail400Update]])
            //.put(uiActions.emitError(__.emitError, 'updateTask worker'))
            .put(uiActions.stopSpinning())
            .run();
    });

});
