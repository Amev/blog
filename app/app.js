import ApplicationStore from '../stores/ApplicationStore';
import AddArticleStore from '../stores/AddArticleStore';
import Component from '../components/Application.jsx';
import ArticleStore from '../stores/ArticleStore';
import RouteStore from '../stores/RouteStore';
import Fluxible from 'fluxible';

let app = new Fluxible({
	component: Component,
	stores: [
		ApplicationStore,
		AddArticleStore,
		ArticleStore,
		RouteStore
	]
});

export default app;
