import React from 'react';

class Home extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div>
				<p>This is Home</p>
			</div>
		);
	}
}

export default Home;
