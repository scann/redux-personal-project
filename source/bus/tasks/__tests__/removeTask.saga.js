//Core
import { put, apply } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

//Instruments
import { api } from '../../../REST';
import { uiActions } from '../../ui/actions';
import { tasksActions } from '../actions';
import { removeTask } from '../saga/workers';

const removeTaskAction = tasksActions.removeTaskAsync(__.testMessage.id);

const saga = cloneableGenerator(removeTask)(removeTaskAction);
let clone = null;

describe('removeTask saga', () => {
    describe('should pass until response received', () => {
        test('should dispatch "startSpinning" action', () => {
            expect(saga.next().value).toEqual(put(uiActions.startSpinning()));
        });

        test('should call a fetch request', () => {
            expect(saga.next().value).toEqual(
                apply(api, api.tasks.remove, [__.testMessage.id])
            );
            clone = saga.clone();
        });
    });

    describe('should handle a 400 status response', () => {
        test('a fetch request should return 400 status response', () => {
            expect(clone.next(__.fetchResponseFail400).value).toEqual(
                apply(__.fetchResponseFail400, __.fetchResponseFail400.json)
            );
        });

        test('should contain a response data object', () => {
            expect(clone.next(__.responseDataFail).value).toEqual(
                put(uiActions.emitError(__.emitError, 'removeTask worker'))
            );
        });

        test('should dispatch "stopSpinning" action', () => {
            expect(clone.next().value).toEqual(put(uiActions.stopSpinning()));
        });

        test('should finish', () => {
            expect(clone.next().done).toBe(true);
        });
    });

    describe('should handle a 204 status response', () => {

        test('should dispatch "removeTask" action', () => {
            expect(saga.next(__.fetchResponseSuccess204).value).toMatchSnapshot();
        });

        test('should dispatch "stopSpinning" action', () => {
            expect(saga.next().value).toMatchSnapshot();
        });

        test('should finish', () => {
            expect(saga.next().done).toBe(true);
        });
    });
});
