import ReactDOM from 'react-dom';
import React from 'react';

class Input extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		console.log(this.props);
		return (
			<div className="input input--nao">
				<input required placeholder={this.props.placeholder}
					className="input__field input__field--nao" type={this.props.type}
					id="input-1" ref={this.props.reference}/>
				<svg className="graphic graphic--nao" width="300%" height="100%"
						viewBox="0 0 1200 60" preserveAspectRatio="none">
					<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
				</svg>
			</div>
		);
	}
}

export default Input;
