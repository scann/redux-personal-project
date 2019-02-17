//Core
import { Map } from 'immutable';

//Types
import { types } from './types';

const initialState = Map({
    isTasksFetching: false,
    tasksFilter:     '',
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_SPINNING:
            return state.set('isTasksFetching', true);

        case types.STOP_SPINNING:
            return state.set('isTasksFetching', false);

        case types.UPDATE_TASKS_FILTER:
            return state.set('tasksFilter', action.payload);

        default:
            return state;
    }
};
