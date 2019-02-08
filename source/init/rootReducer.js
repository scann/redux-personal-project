//Core
import { combineReducers } from 'redux';

//Reducers
import { tasksReducer as tasks } from '../bus/tasks/reducer';

export const rootReducer = combineReducers({
    tasks,
});
