import changeArticleAction from '../actions/changeArticleContentAction';
import addArticleAction from '../actions/addArticleAction';
import AddArticleStore from '../stores/AddArticleStore';
import {connectToStores} from 'fluxible-addons-react';
import ContentEditable from './ContentEditable.jsx';
import ReactDOM from 'react-dom';
import React from 'react';

@connectToStores([AddArticleStore], (context) => {
	return context.getStore(AddArticleStore).getState();
})
class AddArticle extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeMedia = this.handleChangeMedia.bind(this);
	}

	handleChange(event) {
		event.preventDefault();
		var payload = {content: event.target.value, section: 'content'};

		this.context.executeAction(changeArticleAction, payload);
	}

	handleChangeTitle(event) {
		event.preventDefault();
		var	payload = {title: event.target.value, section: 'title'};

		this.context.executeAction(changeArticleAction, payload);
	}

	handleChangeMedia(event) {
		event.preventDefault();
		var file = ReactDOM.findDOMNode(this.refs.media).files[0],
			reader = new FileReader(),
			payload = new Object();

		reader.onload = (fileData) => {
			payload.mediaURI = fileData.target.result;
			payload.section = 'media';
			this.context.executeAction(changeArticleAction, payload);
		};
		reader.readAsDataURL(file);
	}

	handleSubmit(event) {
		event.preventDefault();
		var article = new Object(),
			reader = new FileReader(),
			file = ReactDOM.findDOMNode(this.refs.media).files[0];

		article.content = this.props.content;
		article.title = ReactDOM.findDOMNode(this.refs.title).value.trim();
		if (article.title && article.content && file) {
			reader.onload = (fileData) => {
				article.mediaURI = fileData.target.result;
				this.context.executeAction(addArticleAction, article);
			};
			reader.readAsDataURL(file);
		} else console.log('Missing some data');
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
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" required placeholder="Title"
						onChange={this.handleChangeTitle} ref="title" />
					<ContentEditable html={this.props.content} onChange={this.handleChange} />
					<input type="file" accept="image/*" ref="media"
						onChange={this.handleChangeMedia} />
					<input type="submit" value="Post" />
				</form>
				{image}
				{title}
				<div dangerouslySetInnerHTML={{__html: article}} />
			</div>
		);
	}
}

export default AddArticle;
