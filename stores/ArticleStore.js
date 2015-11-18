import {BaseStore} from 'fluxible/addons';

class ArticleStore extends BaseStore {

	constructor(dispatcher) {
		super(dispatcher);
		this.article = new Object();
		this.mediaURL = '';
		this.title = '';
		this.content = '';
	}

	getState() {
		return {
			mediaURL: this.mediaURL,
			content: this.content,
			article: this.article,
			title: this.title
		};
	}

	onReceiveArticle(payload) {
		if (payload.article) {
			this.article = payload.article;
			this.title = payload.article.title;
			this.content = payload.article.content;
			this.mediaURL = payload.article.mediaURL;
			this.emitChange();
		}
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.title = state.title;
		this.article = state.article;
		this.content = state.content;
		this.mediaURL = state.mediaURL;
	}
}

ArticleStore.storeName = 'ArticleStore';
ArticleStore.handlers = {
	'NAV_ARTICLE_PAGE': 'onReceiveArticle'
};

export default ArticleStore;
