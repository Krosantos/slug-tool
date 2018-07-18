import slugify from 'slugify';
import { getActionCreator, getReducer } from './pairFactory';

const action = 'CONVERT_SLUGS';

const creator = getActionCreator(action);

const reducer = getReducer(action, (state) => {
	const raw = state.rawInput;
	const rawInput = format(raw);
	return { ...state, rawInput };
});

const format = (raw) => {
	const lines = raw.split('\n');
	const formatted = lines.map((line) => formatLine(line));
	return formatted.join('');
};

const formatLine = (raw) => {
	const shards = raw.split('/');
	const slugged = shards.map((shard) => slugify(shard, { lower: true }));
	const together = slugged.join('/');
	return `${together}\n`;
};

export default {
	creator,
	reducer,
};
