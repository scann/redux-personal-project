//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* fetchTasks () {
    try {
        yield put(uiActions.startSpinning());
        const response = yield apply(api, api.tasks.fetch);
        const { data: tasks, errorMessage } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(errorMessage);
        }

        yield put(tasksActions.fillTasks(tasks));
    } catch (error) {
        yield put(uiActions.emitError(error, 'fetchTasks worker'));
    } finally {
        yield put(uiActions.stopSpinning());
    }
}
