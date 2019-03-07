//Core
import { fromJS, List } from 'immutable';

//Instruments
import { types } from './types';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TASKS:
            return fromJS(action.payload);

        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));

        case types.REMOVE_TASK:
            const taskId = fromJS(action.payload);

            return state.filter((task) => task.get('id') !== taskId);

        case types.COMPLETE_ALL_TASKS:

            return state.map((task) => task.set('completed', true));

        case types.UPDATE_TASK:
            return state.update(
                state.findIndex(
                    (task) => task.get('id') === action.payload.id),
                () => fromJS(action.payload)
            );

        default:
            return state;
    }
};
