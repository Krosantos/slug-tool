// We want to take a string for action type, and return both a reducer, keyed by type,
// and an action creator, for maxmium overconvenience.

export const getActionCreator = (action) => (payload) => ({ type: action, payload });

export const getReducer = (action, reducer) => {
	const result = {};
	result[action] = reducer;
	return result;
};

