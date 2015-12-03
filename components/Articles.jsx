import {connectToStores} from 'fluxible-addons-react';
import ArticlesStore from '../stores/ArticlesStore';
import Resume from './Resume.jsx';
import React from 'react';

@connectToStores([ArticlesStore], (context) => {
	return context.getStore(ArticlesStore).getState();
})
class Articles extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		let	articles = this.props.articles, resumes = '';

		resumes = articles.map((article) => {
			return <Resume article={article} key={article.id} />;
		});
		return (
			<div className="resumeList">
				{resumes}
			</div>
		);
	}
}

export default Articles;
