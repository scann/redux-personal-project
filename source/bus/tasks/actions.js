//Types
import { types } from './types';

export const tasksActions = {
    //Sync
    fillTasks: (posts) => {
        return {
            type:    types.FILL_TASKS,
            payload: posts,
        };
    },

    //Async
    fetchTasksAsync: () => {
        return {
            type: types.FETCH_TASKS_ASYNC,
        };
    },
};
