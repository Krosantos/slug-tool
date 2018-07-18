import React from 'react';
import { connect } from 'react-redux';
import setRawInput from '../modules/pairs/setRawInput';

const mapDispatchToProps = (dispatch) => ({
	setInput: (value) => dispatch(setRawInput.creator(value)),
});

const mapStateToProps = (state) => ({
	currentValue: state.rawInput,
});

const TextArea = ({
	setInput,
	currentValue,
}) => (
	<textarea
		className="type-space"
		onChange={(e) => setInput(e.target.value)}
		value={currentValue}
	/>
);

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
