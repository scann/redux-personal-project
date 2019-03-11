//Core
import { List, fromJS } from 'immutable';

//Reducer
import { tasksReducer } from '../reducer';

//Actions
import { tasksActions } from '../actions';

const initialState = List();

describe('tasks reducer', () => {
    test('should return initial state by default', () => {
        expect(tasksReducer(void 0, {})).toEqual(initialState);
    });

    test('should handle FILL_TASKS action', () => {
        expect(tasksReducer(void 0, tasksActions.fillTasks(__.tasksList))).toEqual(fromJS(__.tasksList));
    });

    test('should handle CREATE_TASK action', () => {
        expect(tasksReducer(void 0, tasksActions.createTask(__.testMessage))).toEqual(initialState.unshift(fromJS(__.testMessage)));
    });

    test('should handle REMOVE_TASK action', () => {
        expect(tasksReducer(void 0, tasksActions.removeTask(__.testMessage))).toEqual(initialState.filter((task) => task.get('id') !== __.testMessage.id));
    });

    test('should handle COMPLETE_ALL_TASKS action', () => {
        expect(tasksReducer(void 0, tasksActions.completeAllTasks(__.tasksList)))
            .toEqual(initialState.map((task) => task.set('completed', true)));
    });

    test('should handle UPDATE_TASK action', () => {
        expect(tasksReducer(void 0, tasksActions.updateTask(__.testMessage)))
            .toEqual(initialState.update(
                initialState.findIndex(
                    (task) => task.get('id').toEqual(__.testMessage.id)),
                () => fromJS(__.testMessage)));
    });

});
