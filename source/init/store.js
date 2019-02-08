//Core
import { createStore } from 'redux';

//Roots
import { rootReducer } from './rootReducer';

//Middleware
import { enhancedStore, sagaMiddleware } from './middleware';

export const store = createStore(rootReducer, enhancedStore);
