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
};
