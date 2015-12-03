import {BaseStore} from 'fluxible/addons';

class ArticlesStore extends BaseStore {

	constructor(dispatcher) {
		super(dispatcher);
		this.articles = new Array();
	}

	getArticles() {
		return this.articles;
	}

	getState() {
		return {articles: this.articles};
	}

	createArticle(payload) {
		return {
			commentCount: payload.commentCount,
			postDate: payload.postDate,
			mediaURL: payload.mediaURL,
			content: payload.content,
			title: payload.title,
			autor: payload.autor,
			id: payload.id
		};
	}

	onReceiveArticles(payload) {
		for (var i = 0, len = payload.length; i < len; i++) {
			let article = this.createArticle(payload[i]);

			if (this.articles.indexOf(article) === -1)
				this.articles.push(payload[i]);
		}
		this.articles.sort((a, b) => {
			if (a.postDate < b.postDate) return 1;
			if (b.postDate > b.postDate) return -1;
			return 0;
		});
		this.emitChange();
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.articles = state.articles;
	}
}

ArticlesStore.storeName = 'ArticlesStore';
ArticlesStore.handlers = {
	'FETCH_ARTICLES_ACTION': 'onReceiveArticles'
};

export default ArticlesStore;
