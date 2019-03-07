//Core
import { fromJS } from 'immutable';

//Reducer
import { uiReducer } from '../reducer';

//Actions
import { uiActions } from '../actions';

const initialState = fromJS({
    isTasksFetching: false,
    tasksFilter:     '',
    editTask:        {
        id:         '',
        newMessage: '',
    },
});

describe('ui reducer', () => {
    test('should return initial state by default', () => {
        expect(uiReducer(void 0, {})).toEqual(initialState);
    });

    test('should handle START_SPINNING action', () => {
        expect(uiReducer(void 0, uiActions.startSpinning())).toEqual(initialState.set('isTasksFetching', true));
    });

    test('should handle STOP_SPINNING action', () => {
        expect(uiReducer(void 0, uiActions.stopSpinning())).toEqual(initialState.set('isTasksFetching', false));
    });

    test('should handle UPDATE_TASKS_FILTER action', () => {
        expect(uiReducer(void 0, uiActions.updateTasksFilter(__.filter))).toEqual(initialState.set('tasksFilter', __.filter));
    });

    test('should handle START_EDITING_TASK action', () => {
        expect(uiReducer(void 0, uiActions.startEditingTask(__.testMessage.id, __.testMessage.message)))
            .toEqual(initialState.update('editTask', (editTask) =>
                editTask.merge(fromJS({
                    id:         __.testMessage.id,
                    newMessage: __.testMessage.message,
                })),
            ));
    });

    test('should handle RESET_EDITING_TASK action', () => {
        expect(uiReducer(void 0, uiActions.resetEditingTask())).toEqual(initialState.set('editTask', initialState.get('editTask')));
    });

    test('should handle UPDATE_TASK_MESSAGE action', () => {
        expect(uiReducer(void 0, uiActions.updateTaskMessage(__.testMessage.message))).
            toEqual(initialState.setIn(['editTask', 'newMessage'], __.testMessage.message));
    });

});
