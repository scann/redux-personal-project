//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* removeTask ({ payload: taskId }) {
    try {
        yield put(uiActions.startSpinning());
        const response = yield apply(api, api.tasks.remove, [taskId]);

        if (response.status !== 204) {
            const { errorMessage } = yield apply(response, response.json);

            throw new Error(errorMessage);
        }

        yield put(tasksActions.removeTask(taskId));
    } catch (error) {
        yield put(uiActions.emitError(error, 'removeTask worker'));
    } finally {
        yield put(uiActions.stopSpinning());
    }
}
