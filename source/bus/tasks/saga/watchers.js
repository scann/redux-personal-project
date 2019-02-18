//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import {fetchTasks, createTask, removeTask, completeAllTasks} from './workers';

export function* watchFetchTasks () {
    yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasks);
}

export function* watchCreateTask () {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

export function* watchRemoveTask () {
    yield takeEvery(types.REMOVE_TASK_ASYNC, removeTask);
}

export function* watchCompleteAllTasks () {
    yield takeEvery(types.COMPLETE_ALL_TASKS_ASYNC, completeAllTasks);
}
export function* watchTasks () {
    yield all([call(watchFetchTasks), call(watchCreateTask), call(watchRemoveTask), call(watchCompleteAllTasks)]);
}
