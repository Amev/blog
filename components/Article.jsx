import {connectToStores} from 'fluxible-addons-react';
import ArticleStore from '../stores/ArticleStore';
import React from 'react';

@connectToStores([ArticleStore], (context) => {
	return context.getStore(ArticleStore).getState();
})
class Article extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		var article = '', title = '', image = '', reg = undefined;

		if (this.props.article.length > 0) {
			article = this.props.article.map((line) => {
				reg = new RegExp('\\*(.*?)\\*', 'g');
				line = line.replace(reg, '<strong>$1</strong>');
				reg = new RegExp('\\[(.*?)\\]\\(([^ ]*?)\\)', 'gi');
				line = line.replace(reg, '<a href="$2">$1</a>');
				reg = new RegExp('^##(.*)', 'gi');
				if (reg.test(line))
					return line.replace(reg, '<h1>$1</h1>');
				return "<p>" + line + "</p>";
			});
			article = article.join('');
		}
		if (this.props.title.length > 0)
			title = <div className='AddArticleTitle'>{this.props.title}</div>;
		if (this.props.mediaURI !== '')
			image = <img src={this.props.mediaURI} className="AddArticleCover" />;
		return (
			<div className='articleContainer'>
				{image}
				{title}
				<div dangerouslySetInnerHTML={{__html: article}} />
			</div>
		);
	}
}

export default Article;
