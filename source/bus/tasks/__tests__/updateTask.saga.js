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
        await expectSaga(updateTask, [__.task])
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.tasks.update, [__.task]), __.fetchResponseSuccessUp]])
            //.put(tasksActions.updateTask(__.task.message))
            .put(uiActions.stopSpinning())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(updateTask, __.task)
            .put(uiActions.startSpinning())
            .provide([[apply(api, api.tasks.update, [__.task]), __.fetchResponseFail400]])
            //.provide([[put(uiActions.emitError(__.emitError, 'updateTasks worker')), __.emitError]])
            .put(uiActions.stopSpinning())
            .run();
    });
});
