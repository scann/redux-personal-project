//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* updateTask ({ payload: task }) {
    try {
        yield put(uiActions.startSpinning());
        const response = yield apply(api, api.tasks.update, [task]);

        const { data: [updatedTask], message: errorMessage } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(errorMessage);
        }

        yield put(tasksActions.updateTask(updatedTask));
    } catch (error) {
        yield put(uiActions.emitError(error, 'updateTask worker'));
    } finally {
        yield put(uiActions.stopSpinning());
    }
}