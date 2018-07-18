import { getActionCreator, getReducer } from './pairFactory';

const action = 'SET_RAW_INPUT';

const creator = getActionCreator(action);

const reducer = getReducer(action, (state, { payload }) => ({ ...state, rawInput: payload }));

export default {
	creator,
	reducer,
};
