//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';

export function* fetchTasks () {
    try {
        //yield put(uiActions.startFetching());
        const response = yield apply(api, api.tasks.fetch);
        const { data: tasks, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.fillTasks(tasks));
    } catch (error) {
        console.log('fetchTasks worker error');
        //yield put(uiActions.emitError(error, 'fetchTasks worker'));
    } finally {
        //yield put(uiActions.stopFetching());
    }
}
