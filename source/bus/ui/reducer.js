//Core
import { fromJS } from 'immutable';

//Types
import { types } from './types';

const initialState = fromJS({
    isTasksFetching: false,
    tasksFilter:     '',
    editTask:        {
        id:         '',
        newMessage: '',
    },
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_SPINNING:
            return state.set('isTasksFetching', true);

        case types.STOP_SPINNING:
            return state.set('isTasksFetching', false);

        case types.UPDATE_TASKS_FILTER:
            return state.set('tasksFilter', action.payload);

        case types.START_EDITING_TASK:
            return state.update('editTask', (editTask) =>
                editTask.merge(fromJS({
                    id:         action.payload.id,
                    newMessage: action.payload.message,
                })),
            );
        case types.RESET_EDITING_TASK:
            return state.set('editTask', initialState.get('editTask'));

        case types.UPDATE_TASK_MESSAGE:
            return state.setIn(['editTask', 'newMessage'], action.payload);

        default:
            return state;
    }
};
