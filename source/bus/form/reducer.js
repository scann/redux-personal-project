import { combineForms } from 'react-redux-form';

const initialFormState = {
    newTaskMessage: '',
};

export const formReducer = combineForms({
    scheduler: {
        initialFormState,
    },
}, 'form');
