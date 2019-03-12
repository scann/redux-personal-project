//Core
import { put, apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

//Instruments
import { api } from '../../../REST';
import { tasksActions } from '../actions';
import { uiActions } from '../../ui/actions';
import { fetchTasks } from '../saga/workers';

describe('fetchTasks saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(fetchTasks)
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.tasks.fetch), __.fetchResponseSuccess]])
            .put(tasksActions.fillTasks(__.tasksList))
            .put(uiActions.stopSpinning())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(fetchTasks)
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.tasks.fetch), __.fetchResponseFail400]])
            .put(uiActions.emitError(__.emitError, 'fetchTasks worker'))
            .put(uiActions.stopSpinning())
            .run();
    });
});
