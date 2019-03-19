//Core
import { createStore } from 'redux';

//Roots
import { rootReducer } from '../rootReducer';
import { store } from '../store';

//Middleware
import { enhancedStore } from '../middleware';

export const referenceStore = createStore(rootReducer, enhancedStore);

describe('store:', () => {
    test('should have valid initial state shape', () => {
        expect(store.getState()).toEqual(referenceStore.getState());
    });
});
