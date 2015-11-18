import {BaseStore} from 'fluxible/addons';

class AddArticleStore extends BaseStore {

	constructor(dispatcher) {
		super(dispatcher);
		this.mediaURI = '';
		this.title = 'Title';
		this.content = 'Votre article ...';
		this.article = new Array('Votre article ...');
	}

	getContent() {
		return this.content;
	}

	getState() {
		return {
			mediaURI: this.mediaURI,
			content: this.content,
			article: this.article,
			title: this.title
		};
	}

	updateArticle() {
		var reg = new RegExp('<div>|</div>', 'ig');

		if (this.content === '') this.article = new Array('');
		else {
			this.article = this.content.split(reg);
			this.article = this.article.filter((value) => {
				return value !== undefined && value !== '';
			});
		}
	}

	onChangeArticle(payload) {
		this.content = payload.content;
		this.updateArticle();
		this.emitChange();
	}

	onChangeTitle(payload) {
		this.title = payload.title;
		this.emitChange();
	}

	onChangeMedia(payload) {
		this.mediaURI = payload.mediaURI;
		this.emitChange();
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.title = state.title;
		this.article = state.article;
		this.content = state.content;
		this.mediaURI = state.mediaURI;
	}
}

AddArticleStore.storeName = 'AddArticleStore';
AddArticleStore.handlers = {
	'CHANGE_ARTICLE_ACTION': 'onChangeArticle',
	'CHANGE_TITLE_ACTION': 'onChangeTitle',
	'CHANGE_MEDIA_ACTION': 'onChangeMedia'
};

export default AddArticleStore;
