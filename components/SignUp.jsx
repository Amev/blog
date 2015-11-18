import closeDialogAction from '../actions/closeDialogAction';
import postSignUpAction from '../actions/postSignUpAction';
import switchSignAction from '../actions/switchSignAction';
import ReactDOM from 'react-dom';
import React from 'react';

class SignUp extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.handleCloseDialog = this.handleCloseDialog.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		var	infos = {
			email: ReactDOM.findDOMNode(this.refs.email).value.trim(),
			password: ReactDOM.findDOMNode(this.refs.password).value.trim(),
			lastName: ReactDOM.findDOMNode(this.refs.lastName).value.trim(),
			firstName: ReactDOM.findDOMNode(this.refs.firstName).value.trim()
		};

		this.context.executeAction(postSignUpAction, infos);
		this.context.executeAction(closeDialogAction, {});
	}

	handleSignUp(event) {
		event.preventDefault();

		this.context.executeAction(switchSignAction, {});
	}

	handleCloseDialog(event) {
		event.preventDefault();

		this.context.executeAction(closeDialogAction, {});
	}

	render() {
		return (
			<div className="dialog__content">
				<input type="button" value="Close" onClick={this.handleCloseDialog} />
				<form onSubmit={this.handleSubmit}>
					<div>
						<div className="input input--nao">
							<input type="text" required placeholder="Email" ref="email"
								className="input__field input__field--nao"/>
							<svg className="graphic graphic--nao" width="300%" height="100%"
									viewBox="0 0 1200 60" preserveAspectRatio="none">
								<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
							</svg>
						</div>
						<div className="input input--nao">
							<input type="password" required placeholder="Password"
								className="input__field input__field--nao" ref="password"/>
							<svg className="graphic graphic--nao" width="300%" height="100%"
									viewBox="0 0 1200 60" preserveAspectRatio="none">
								<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
							</svg>
						</div>
					</div>
					<div>
						<div className="input input--nao">
							<input type="text" required placeholder="First name"
								className="input__field input__field--nao" ref="firstName"/>
							<svg className="graphic graphic--nao" width="300%" height="100%"
									viewBox="0 0 1200 60" preserveAspectRatio="none">
								<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
							</svg>
						</div>
						<div className="input input--nao">
							<input type="text" required placeholder="Last name"
								className="input__field input__field--nao" ref="lastName"/>
							<svg className="graphic graphic--nao" width="300%" height="100%"
									viewBox="0 0 1200 60" preserveAspectRatio="none">
								<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
							</svg>
						</div>
					</div>
					<input type="submit" value="Sign up" />
				</form>
				<div>
					<input type="button" value="Sign in with my account"
						onClick={this.handleSignUp} />
				</div>
			</div>
		);
	}
}

export default SignUp;
