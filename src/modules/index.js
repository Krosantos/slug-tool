import { assign } from 'lodash';
import convertSlugs from './pairs/convertSlugs';
import setRawInput from './pairs/setRawInput';

const actionMap = assign(
	{},
	convertSlugs.reducer,
	setRawInput.reducer,
);

export const rootReducer = (state, action) => {
	if (!state) return {};
	if (!actionMap[action.type]) return { ...state };
	const result = actionMap[action.type](state, action);
	return result;
};
