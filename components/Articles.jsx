import React from 'react';

class Articles extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return <p>This is Articles</p>;
	}
}

export default Articles;
