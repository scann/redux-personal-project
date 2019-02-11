//Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

//Instruments
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';

export function* createTask ({ payload: message }) {
    try {
        //yield put(uiActions.startFetching());
        const response = yield apply(api, api.tasks.create, [message]);
        const { data: task, errorMessage } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(errorMessage);
        }

        yield put(tasksActions.createTask(task));
        yield put(actions.reset('form.scheduler'));
    } catch (error) {
        console.log('createTask worker error');
        //yield put(uiActions.emitError(error, 'fetchTasks worker'));
    } finally {
        //yield put(uiActions.stopFetching());
    }
}