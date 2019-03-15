//Core
import { put, apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

//Instruments
import { api } from '../../../REST';
import { tasksActions } from '../actions';
import { uiActions } from '../../ui/actions';
import { updateTask } from '../saga/workers';

describe('updateTask saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(updateTask, { payload: __.task })
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.tasks.update, [__.task]), __.fetchResponseSuccessUpdate]])
            .put(tasksActions.updateTask(__.task))
            .put(uiActions.stopSpinning())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(updateTask, { payload: __.task })
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.tasks.update, [__.task]), __.fetchResponseFail400Update]])
            .put(uiActions.emitError(__.emitError, 'updateTask worker'))
            .put(uiActions.stopSpinning())
            .run();
    });
});
