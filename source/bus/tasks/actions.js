//Types
import { types } from './types';

export const tasksActions = {
    //Sync
    fillTasks: (tasks) => {
        return {
            type:    types.FILL_TASKS,
            payload: tasks,
        };
    },
    createTask: (message) => {
        return {
            type:    types.CREATE_TASK,
            payload: message,
        };
    },
    removeTask: (taskId) => {
        return {
            type:    types.REMOVE_TASK,
            payload: taskId,
        };
    },
    completeAllTasks: () => {
        return {
            type: types.COMPLETE_ALL_TASKS,
        };
    },

    //Async
    fetchTasksAsync: () => {
        return {
            type: types.FETCH_TASKS_ASYNC,
        };
    },
    createTaskAsync: (message) => {
        return {
            type:    types.CREATE_TASK_ASYNC,
            payload: message,
        };
    },
    removeTaskAsync: (taskId) => {
        return {
            type:    types.REMOVE_TASK_ASYNC,
            payload: taskId,
        };
    },
    completeAllTasksAsync: () => {
        return {
            type: types.COMPLETE_ALL_TASKS_ASYNC,
        };
    },
};
