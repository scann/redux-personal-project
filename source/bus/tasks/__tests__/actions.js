import { tasksActions } from '../../tasks/actions';

describe('tasks actions:', () => {
    test('fillTasks', () => {
        expect(tasksActions.fillTasks(__.tasksList)).toMatchSnapshot();
    });

    test('createTask', () => {
        expect(tasksActions.createTask(__.testMessage.message)).toMatchSnapshot();
    });

    test('removeTask', () => {
        expect(tasksActions.removeTask(__.testMessage.id)).toMatchSnapshot();
    });

    test('completeAllTasks', () => {
        expect(tasksActions.completeAllTasks()).toMatchSnapshot();
    });

    test('updateTask', () => {
        expect(tasksActions.updateTask(__.testMessage)).toMatchSnapshot();
    });

    test('fetchTasksAsync', () => {
        expect(tasksActions.fetchTasksAsync()).toMatchSnapshot();
    });

    test('createTaskAsync', () => {
        expect(tasksActions.createTaskAsync(__.testMessage.message)).toMatchSnapshot();
    });

    test('removeTaskAsync', () => {
        expect(tasksActions.removeTaskAsync(__.testMessage.id)).toMatchSnapshot();
    });

    test('completeAllTasksAsync', () => {
        expect(tasksActions.completeAllTasksAsync()).toMatchSnapshot();
    });

    test('updateTaskAsync', () => {
        expect(tasksActions.updateTaskAsync(__.testMessage)).toMatchSnapshot();
    });
});
