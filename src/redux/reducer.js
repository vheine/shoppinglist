const initState = {
    articleList: [
        // {id: 1, name: "Karotten", quantity: 1, unit: 0, category: 1},
        // {id: 2, name: "Baguette", quantity: 1, unit: 2, category: 2},
        // {id: 3, name: "Trauben", quantity: 500, unit: 1, category: 0},
        // {id: 4, name: "Äpfel", quantity: 1, unit: 0, category: 0},
        // {id: 5, name: "Kartoffeln", quantity: 1, unit: 0, category: 1}
    ],
    categoryList: [
        'Obst',
        'Gemüse',
        'Backwaren',
        //'Milchprodukte',
        'Wurst/Fleisch',
        'Getränke'
    ],
    unitList: [
        'Kg',
        'Gramm',
        'Stück',
        'Liter'
    ],
    newUnit: '',
    newCategory: '',
    favoritesList: [],
    idCounter: 6,
    article: {
        quantity: '',
        unit: -1,
        name: '',
        category: -1
    },
    mode: 'list',
    filteredList: [],
    filterCategory: -1,
    sortBy: -1
}

const emptyArticleObject =  {
    quantity: '',
    unit: -1,
    name: '',
    category: -1,
    newUnit: '',
    newCategory: ''
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case 'SET_ARTICLE_LIST':
            return {
                ...state,
                articleList: action.payload
            }

        case 'SET_FAV_LIST':
            return {
                ...state,
                favoritesList: action.payload
            }

        case 'FILTER_BY_CATEGORY':
            let FILTERCAT;
            if(action.payload.target) {
                FILTERCAT = Number(action.payload.target.value);
            } else {
                FILTERCAT = -1;
            }
        
            // no filter set
            if(FILTERCAT < 0) {
                    return {
                        ...state,
                        sortBy: -1,
                        filteredList: state.articleList,
                        filterCategory: FILTERCAT
                    }
            } else {
                    const FILTERED_ARTICLE_LIST = state.articleList.filter((article) => {
                        return article.category === FILTERCAT
                    });
            
                    return {
                        ...state,
                        sortBy: -1,
                        filteredList: FILTERED_ARTICLE_LIST,
                        filterCategory: FILTERCAT
                    }
            }
        
        case 'EDIT_ARTICLE':
            return {
                ...state,
                article: {
                    ...state.article,
                    [action.payload.target.name]: action.payload.target.value
                }
            }

        case 'SET_EDITED_ARTICLE':
            return {
                ...state,
                article: action.payload
            }

        case 'SET_NEW_UNIT':
            return {
                ...state,
                newUnit: action.payload.target.value,
            }

        case 'ADD_UNIT':
            return {
                    ...state,
                    newUnit: '',
                    unitList: [...state.unitList, state.newUnit]
                }

        case 'SET_NEW_CATEGORY':
            return {
                ...state,
                newCategory: action.payload.target.value,
            }

        case 'ADD_CATEGORY':
            return {
                    ...state,
                    newCategory: '',
                    categoryList: [...state.categoryList, state.newCategory]
                }

        
        case 'ADD_TO_CART':
            return {
               ...state,
               articleList: [
                  ...state.articleList,
                  {
                    id: state.idCounter,
                    name: action.payload.name,
                    quantity: Number(action.payload.quantity),
                    unit: Number(action.payload.unit),
                    category: Number(action.payload.category)
                  }
                ],
                article: emptyArticleObject,
                filterCategory: -1,
                idCounter: state.idCounter + 1,
                sortBy: -1
            }

        case 'EDIT_CART': 
            const EDITED_ARTICLE_ARRAY = state.articleList.map((article) => {
                return article.id === action.payload.id ? action.payload : article
            });

            return {
                ...state,
                articleList: EDITED_ARTICLE_ARRAY,
                article: emptyArticleObject,
                filterCategory: -1,
                idCounter: state.idCounter,
                sortBy: -1
            }

        case 'EDIT_FAV':
            const EDITED_FAV_ARRAY = state.favoritesList.map((article) => {
                return article.id === action.payload.id ? action.payload : article
            });

            return {
                ...state,
                favoritesList: EDITED_FAV_ARRAY,
                article: emptyArticleObject
            }

        case 'REMOVE_FROM_CART':
            
            const NEW_ARTICLE_ARRAY = state.articleList.filter((ele) => {
                return ele.id !== action.payload
            });
        
            return {
                ...state,
                idCounter: state.idCounter,
                articleList: NEW_ARTICLE_ARRAY
            }

        case 'CLEAR_CART':
        
            let NEW_CART_WITHOUT_CURRENT_CATEGORY;

            // check wheather no payload is passed = "Alle löschen" button has been clicked
            if(!action.payload){
                if(state.filterCategory === -1) {
                    NEW_CART_WITHOUT_CURRENT_CATEGORY  = []
                } else {
                    NEW_CART_WITHOUT_CURRENT_CATEGORY = state.articleList.filter((article) => {
                        return article.category !== state.filterCategory
                    })
                }
                
            } else {
                NEW_CART_WITHOUT_CURRENT_CATEGORY = state.articleList.filter((article) => {
                    return article.category !== action.payload
                })
            }
            return {
                ...state,
                filterCategory: -1,
                sortBy: -1,
                articleList: NEW_CART_WITHOUT_CURRENT_CATEGORY
            }
            
        case 'ADD_TO_FAV':
            const ELEMENT_INDEX = state.favoritesList.findIndex((ele) => {return ele.id === action.payload.id});
            // only add article to favorites list, when not already in favorites list
            if(ELEMENT_INDEX === -1) {
                return {
                    ...state,
                    favoritesList: [...state.favoritesList, action.payload]
                }
            } else {
                return {
                    ...state
                }
            }
            break;
           

        case 'REMOVE_FROM_FAV':
        
            const NEW_FAV_ARRAY = state.favoritesList.filter((ele) => {
                return ele.id !== action.payload
            })
        
            return {
                ...state,
                favoritesList: NEW_FAV_ARRAY
            }

        case 'SET_MODE':
            return {
                ...state,
                mode: action.payload
            }

        case 'SET_ID_COUNTER':
            return {
                ...state,
                idCounter: Number(action.payload)
            }

        case 'CLEAR_ARTICLE':
            return {
                ...state,
                article: emptyArticleObject
            }

        case 'SORT_ARTICLE_LIST':
            if(action.payload.target) {
                const SORT_BY = action.payload.target.value.split(' ')[0];
                const SORT_TYPE = action.payload.target.value.split(' ')[1];
                let list;
                let key;
                switch(state.mode){
                    case 'list':
                        list = state.articleList;
                        key = "articleList";
                        break;
                    case 'filter':
                        list = state.filteredList;
                        key = "filteredList";
                        break;
                    default:
                        list = state.articleList;
                        key = "articleList";
                }

                const SORTED_ARTICLE_LIST = list.sort((a,b) => {
                    
                    // set sorting back to inital 
                    if(SORT_BY === -1) {
                        if(a.id < b.id) {
                            return -1
                        } else if(a.id > b.id) {
                            return 1
                        } else {
                            return 0
                        }
                    } else if(SORT_BY === 'category'){
                        if(a.category < b.category) {
                            return -1
                        } else if(a.category > b.category) {
                            return 1
                        } else {
                            return 0
                        }
                    } 
                    else {
                        // sort ascending
                        if(SORT_TYPE === 'asc') {
                            return a[SORT_BY].localeCompare(b[SORT_BY])
                        } // sort descending 
                        else if(SORT_TYPE === 'desc'){
                            return -(a[SORT_BY].localeCompare(b[SORT_BY]))
                        }
                    }
                    return 0
                })

                return {
                    ...state,
                    [key]: SORTED_ARTICLE_LIST,
                    sortBy: action.payload.target.value
                }
            } else {
                return {
                    ...state,
                    sortBy: Number(action.payload)
                }
            }
            

        default:
            return state;
    }
}

export default reducer