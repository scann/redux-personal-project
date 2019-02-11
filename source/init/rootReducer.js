//Core
import { combineReducers } from 'redux';

//Reducers
import { tasksReducer as tasks } from '../bus/tasks/reducer';
import { formReducer as form } from '../bus/form/reducer';

export const rootReducer = combineReducers({
    tasks,
    form,
});
