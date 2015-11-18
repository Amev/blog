export default {
	home: {
		path: '/',
		method: 'get',
		label: 'Home',
		handler: require('../components/Home.jsx')
	},
	articles: {
		path: '/articles',
		method: 'get',
		label: 'Articles',
		handler: require('../components/Articles.jsx'),
		action: require('../actions/getArticlesAction.js')
	},
	article: {
		path: '/article/:id',
		method: 'get',
		handler: require('../components/Article.jsx')
	},
	about: {
		path: '/about',
		method: 'get',
		label: 'About',
		handler: require('../components/About.jsx')
	},
	login: {
		path: '/login',
		method: 'get',
		label: 'Login',
		handler: require('../components/Login.jsx')
	},
	signUp: {
		path: '/signup',
		method: 'get',
		label: 'Sign up',
		handler: require('../components/SignUp.jsx')
	},
	admin: {
		path: '/admin',
		method: 'get',
		label: 'Admin',
		handler: require('../components/Admin.jsx'),
		action: require('../actions/getAdminAction.js')
	},
	addArticle: {
		path: '/admin/article',
		method: 'get',
		label: 'Add an article',
		handler: require('../components/AddArticle.jsx'),
		action: require('../actions/getAdminAction.js')
	},
	notFound: {
		path: '*',
		method: 'get',
		handler: require('../components/NotFound.jsx')
	}
};
