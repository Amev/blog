import {NavLink} from 'fluxible-router';
import React from 'react';

class Admin extends React.Component {

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
				<p>This is Admin</p>
				<NavLink href='/admin/article'> Add an article </NavLink>
			</div>
		);
	}
}

export default Admin;
