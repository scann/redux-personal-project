//Core
import { put, call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { List } from 'immutable';

//Instruments
import { api } from '../../../REST';
import { tasksActions } from '../actions';
import { uiActions } from '../../ui/actions';
import { completeAllTasks } from '../saga/workers';

describe('completeAllTasks saga:', () => {
    it('should complete a 200 status response scenario', () => {
        const initialState = List();
        const tasks = (state) => state.tasks;

        return expectSaga(completeAllTasks)
            .withState(initialState)
            .put(uiActions.startSpinning())
            .provide([
                [select(tasks), __.tasksList]
            ])
            //.put(tasksActions.completeAllTasks())
            .put(uiActions.stopSpinning())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {

        await expectSaga(completeAllTasks)
            .put(uiActions.startSpinning())
            //.put(uiActions.emitError(__.emitError, 'completeAllTasks worker'))
            .put(uiActions.stopSpinning())
            .run();
    });

});
