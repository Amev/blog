import openDialogAction from '../actions/openDialogAction';
import ApplicationStore from '../stores/ApplicationStore';
import {connectToStores} from 'fluxible-addons-react';
import {NavLink} from 'fluxible-router';
import React from 'react';

@connectToStores([ApplicationStore], (context) => {
	return context.getStore(ApplicationStore).getState();
})
class NavBar extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
		this.handleOpenDialog = this.handleOpenDialog.bind(this);
	}

	handleOpenDialog(event) {
		event.preventDefault();

		this.context.executeAction(openDialogAction, {});
	}

	render() {
		var signIn = '', admin = '';

		if (this.props.isLog !== true) {
			signIn = (
				<button className="action" onClick={this.handleOpenDialog}>
					Sign In
				</button>
			);
		}
		if (this.props.user && (this.props.user.accountType === 'admin' ||
				this.props.user.accountType === 'superAdmin'))
			admin = <NavLink href='/admin'> Admin </NavLink>;
		return (
			<div>
				<div className='navBar'>
					<NavLink href='/'> Home </NavLink>
					<NavLink href='/articles'> Articles </NavLink>
					<NavLink href='/about'> About </NavLink>
					{admin}
					{signIn}
				</div>
			</div>
		);
	}
}

export default NavBar;
