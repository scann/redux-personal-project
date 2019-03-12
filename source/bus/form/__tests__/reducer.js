//Reducer
import { formReducer } from '../reducer';

describe('form reducer', () => {
    test('should return initial state by default', () => {
        expect(formReducer(void 0, {})).toMatchSnapshot();
    });
});
