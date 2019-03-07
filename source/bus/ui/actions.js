//Types
import { types } from './types';

export const uiActions = {
    startSpinning: () => {
        return {
            type: types.START_SPINNING,
        };
    },
    stopSpinning: () => {
        return {
            type: types.STOP_SPINNING,
        };
    },
    emitError: (error, meta = null) => {
        return {
            type:    types.EMIT_ERROR,
            payload: error,
            error:   true,
            meta,
        };
    },
    updateTasksFilter: (filter) => {
        return {
            type:    types.UPDATE_TASKS_FILTER,
            payload: filter,
        };
    },
    startEditingTask: (id, message) => {
        return {
            type:    types.START_EDITING_TASK,
            payload: {
                id,
                message,
            },
        };
    },
    resetEditingTask: () => {
        return {
            type: types.RESET_EDITING_TASK,
        };
    },
    confirmEditingTask: (taskId, message) => {
        return {
            type:    types.CONFIRM_EDITING_TASK,
            payload: {
                taskId,
                message,
            },
        };
    },
    updateTaskMessage: (message) => {
        return {
            type:    types.UPDATE_TASK_MESSAGE,
            payload: message,
        };
    },
};
