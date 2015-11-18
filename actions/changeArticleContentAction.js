function changeArticleAction(context, payload) {
	if (payload.section === 'content')
		context.dispatch('CHANGE_ARTICLE_ACTION', payload);
	else if (payload.section === 'title')
		context.dispatch('CHANGE_TITLE_ACTION', payload);
	else if (payload.section === 'media')
		context.dispatch('CHANGE_MEDIA_ACTION', payload);
}

export default changeArticleAction;
