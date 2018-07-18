import React from 'react';
import { connect } from 'react-redux';
import convertSlugs from './modules/pairs/convertSlugs';
import TextArea from './components/TextArea';
import styles from './static/index.css'; // eslint-disable-line no-unused-vars

const mapDispatchToProps = (dispatch) => ({
	convert: () => dispatch(convertSlugs.creator()),
});

const App = ({
	convert,
}) => (
	<div className="outer">
		<div className="drag-bar" />
		<TextArea />
		<button className="convert-button" onClick={convert}>Convert</button>
	</div>
);

export default connect(null, mapDispatchToProps)(App);
