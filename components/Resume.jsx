import React from 'react';

class Resume extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		let	author = this.props.article.autor.firstName + ' ' + this.props.article.autor.lastName,
			commentCount = this.props.article.commentCount,
			media = this.props.article.mediaURL,
			resume = this.props.article.content, //a changer par resume
			title = this.props.article.title;

		resume = resume.slice(0, 50) + '...';
		return (
			<div className="Resume" style={{
					backgroundImage: 'url(' + media + ')',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center'}}>
				<h1 className="ResumeTitle">{title}</h1>
				<div className="ResumeContent">{resume}</div>
				<div className="ResumeMeta">{"By " + author + "."}</div>
				<span className="commentCount">{commentCount}</span>
			</div>
		);
	}
}

export default Resume;
