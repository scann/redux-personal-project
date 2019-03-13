//Core
import { put, select, call } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* completeAllTasks () {
    try {
        yield put(uiActions.startSpinning());
        const tasks = yield select((state) => state.tasks);
        const completedTasks = tasks.map((task) => task.set('completed', true)).toJS();

        const promises = completedTasks.map((task) => api.tasks.complete(task));
        const responses = yield call([Promise, Promise.all], promises);

        for (const response of responses) {
            if (response.status !== 200) {
                throw new Error('Task was not completed');
            }
        }

        yield put(tasksActions.completeAllTasks());
    } catch (error) {
        yield put(uiActions.emitError(error, 'completeAllTasks worker'));
    } finally {
        yield put(uiActions.stopSpinning());
    }
}
