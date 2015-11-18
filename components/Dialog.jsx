import closeDialogAction from '../actions/closeDialogAction';
import openDialogAction from '../actions/openDialogAction';
import ApplicationStore from '../stores/ApplicationStore';
import ReactCSS from 'react-addons-css-transition-group';
import {connectToStores} from 'fluxible-addons-react';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import React from 'react';

@connectToStores([ApplicationStore], (context) => {
	return context.getStore(ApplicationStore).getState();
})
class Dialog extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
		this.handleOpenDialog = this.handleOpenDialog.bind(this);
		this.handleCloseDialog = this.handleCloseDialog.bind(this);
	}

	handleOpenDialog(event) {
		event.preventDefault();

		this.context.executeAction(openDialogAction, {});
	}

	handleCloseDialog(event) {
		event.preventDefault();

		console.log('parent: ', event.target);
		if (event.target.className === "dialogBox")
			this.context.executeAction(closeDialogAction, {});
	}

	render() {
		var login = '', signUp = '', overlay = '';

		if (this.props.isLog !== true && this.props.dialog === true) {
			if (this.props.signUp === true) {
				signUp = (
					<div className="dialogBox">
						<SignUp />
					</div>
				);
			} else {
				login = (
					<div className="dialogBox">
						<Login />
					</div>
				);
			}
			overlay = (
				<div className="dialogBox">
					<div className="dialog__overlay" onClick={this.handleCloseDialog}>
					</div>
				</div>
			);
		}
		return (
			<div>
				<ReactCSS transitionName="example" transitionEnterTimeout={400} transitionLeaveTimeout={250}>
					{overlay}
				</ReactCSS>
				<ReactCSS transitionName="translate" transitionEnterTimeout={400} transitionLeaveTimeout={250}>
					{login}
				</ReactCSS>
				<ReactCSS transitionName="translate" transitionEnterTimeout={400} transitionLeaveTimeout={250}>
					{signUp}
				</ReactCSS>
			</div>
		);
	}
}

export default Dialog;
