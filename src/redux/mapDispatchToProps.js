const mapDispatchToProps = (dispatch) => {
    return {
        setArticleList: (articleList) => {
            dispatch({
                type: 'SET_ARTICLE_LIST',
                payload: articleList
            })
        },
        setFavList: (favList) => {
            dispatch({
                type: 'SET_FAV_LIST',
                payload: favList
            })
        },
        setIdCounter: (idCounter) => {
            dispatch({
                type: 'SET_ID_COUNTER',
                payload: idCounter
            })
        },
        editArticle: (event) => {
            dispatch({
                type: 'EDIT_ARTICLE',
                payload: event
            })
        },
        setEditedArticle: (article) => {
            dispatch({
                type: 'SET_EDITED_ARTICLE',
                payload: article
            })
        },
        setNewUnit: (event) => {
            dispatch({
                type: 'SET_NEW_UNIT',
                payload: event
            })
        },
        addUnit: (event) => {
            dispatch({
                type: 'ADD_UNIT',
                payload: event
            })
        },
        setNewCategory: (event) => {
            dispatch({
                type: 'SET_NEW_CATEGORY',
                payload: event
            })
        },
        addCategory: (event) => {
            dispatch({
                type: 'ADD_CATEGORY',
                payload: event
            })
        },
        filterByCategory: (event) => {
            dispatch({
                type: 'FILTER_BY_CATEGORY',
                payload: event
            })
        },
        addToCart: (article) => {
            dispatch({
                type: 'ADD_TO_CART',
                payload: article
            })
        },
        editCart: (article) => {
            dispatch({
                type: 'EDIT_CART',
                payload: article
            })
        },
        removeFromCart: (articleId) => {
            dispatch({
                type: 'REMOVE_FROM_CART',
                payload: articleId
            })
        },
        clearCart: (filterCategory) => {
            dispatch({
                type: 'CLEAR_CART',
                payload: filterCategory
            })
        },
        editFav: (article) => {
            dispatch({
                type: 'EDIT_FAV',
                payload: article
            })
        },
        addToFav: (article) => {
            dispatch({
                type: 'ADD_TO_FAV',
                payload: article
            })
        },
        removeFromFav: (articleId) => {
            dispatch({
                type: 'REMOVE_FROM_FAV',
                payload: articleId
            })
        },
        clearArticle: () => {
            dispatch({
                type: 'CLEAR_ARTICLE'
            })
        },
        setMode: (type) => {
            dispatch({
                type: 'SET_MODE',
                payload: type
            })
        },
        sortArticleList: (event) => {
            dispatch({
                type: 'SORT_ARTICLE_LIST',
                payload: event
            })
        },
        setArticleListCopy: () => {
            dispatch({
                type: 'SET_ARTICLE_LIST_COPY'
            })
        }
    }
}

export default mapDispatchToProps