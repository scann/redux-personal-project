//Actions
import { uiActions } from '../actions';

describe('ui actions:', () => {
    test('startSpinning', () => {
        expect(uiActions.startSpinning()).toMatchSnapshot();
    });

    test('stopSpinning', () => {
        expect(uiActions.stopSpinning()).toMatchSnapshot();
    });

    test('emitError', () => {
        expect(uiActions.emitError(__.error)).toMatchSnapshot();
    });

    test('updateTasksFilter', () => {
        expect(uiActions.updateTasksFilter(__.filter)).toMatchSnapshot();
    });

    test('startEditingTask', () => {
        expect(uiActions.startEditingTask(__.testMessage.id, __.testMessage.message)).toMatchSnapshot();
    });

    test('resetEditingTask', () => {
        expect(uiActions.resetEditingTask()).toMatchSnapshot();
    });

    test('confirmEditingTask', () => {
        expect(uiActions.confirmEditingTask(__.testMessage.id, __.testMessage.message)).toMatchSnapshot();
    });

    test('updateTaskMessage', () => {
        expect(uiActions.updateTaskMessage(__.testMessage.message)).toMatchSnapshot();
    });
});
