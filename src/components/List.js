import React  from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps'

function List(props) {

    let cartfunction;
    let articleList;

    switch(props.mode){
        case 'edit':
            cartfunction = (props) => {
                return props.editCart(props.article); 
            }
            break;
        case 'add':
            cartfunction = (props) => {
                return props.addToCart(props.article); 
            }
            break;
        case 'filter':
            articleList = props.filteredList;
            break;

        case 'list':
            articleList = props.articleList
            break;
        default:
    }


    function editArticle(props, article) {
        props.setEditedArticle(article);
        props.setMode('edit');
    }

    function showModal() {
        document.getElementById('deleteAll').style.display = 'block';
        document.getElementById('deleteAll').style.background = 'rgba(0,0,0,0.5)';
    }
    
    function closeModal(d) {
        document.getElementById('deleteAll').style.display = 'none';
   }

    function removeAllArticles() {
        document.getElementById('deleteAll').style.display = 'none';
        props.clearCart(); 
        props.setMode('list');
    }

    function toggleShow(selector) {
        if(document.querySelector(selector).classList.value.includes('hidden')) {
            show(selector);
        } else {
            hide(selector);
        }
    }

    function show(selector) {
        document.querySelector(selector).classList.remove('hidden');
    }

    function hide(selector) {
        document.querySelector(selector).classList.add('hidden');
    }

    return (
        <>
        { (props.mode === 'list' || props.mode === 'filter') ?
                    (
                        <>
                        <div className='row'>
                            <h2>Artikel</h2>
                        </div>
                        <div className='row bg justify-content-around'>
                            <div className='col-5 align-items-center justify-content-around'>
                                Filtern nach 
                                <select className='d-inline-block w-50' value={props.filterCategory} name="filterByCategory" onChange={props.filterByCategory}>
                                    <option value="-1">Alle Kategorien anzeigen</option>
                                    {
                                        
                                        props.categoryList.map((category, index) => {
                                            return <option key={index} value={index}>{category}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-5 align-items-center justify-content-around'>
                                Sortieren nach
                                <select className='d-inline-block w-50' value={props.sortBy} name="sortBy" onChange={(e) => {props.sortArticleList(e)}}>
                                    <option value="-1 -1">Bitte Sortierung wählen:</option>
                                    <option value="name asc">Name aufsteigend</option>
                                    <option value="name desc">Name absteigend</option>
                                </select>
                            </div>
                        </div>
                        
                            { articleList.length > 0 ?
                                (<ul className='mt-4'>
                                    <li className="header d-flex justify-content-between align-items-center">
                                        <span className="col-6 column d-flex">
                                            <span className="col"><strong>Menge</strong></span>
                                            <span className="col"><strong>Name</strong></span>
                                            <span className='col'><strong>Kategorie</strong></span>
                                        </span>
                                        
                                        {
                                            ((props.filterCategory === -1 && props.articleList.length > 1) || 
                                                (props.filterCategory !== -1 && props.filteredList.length > 1))  &&
                                            (<div className="col-6 column d-flex justify-content-start">
                                                <button className="col-3 btn btn-danger" onClick={showModal}>Alle löschen</button>
                                            </div>)
                                        }
                                            
                                        
                                    </li>
                                        {
                                            articleList.map((article) => {
                                                return (
                                                    <li key={article.id} className="d-flex justify-content-between align-items-center">
                                                        <span className="col-6 column d-flex">
                                                            <span className="col">{article.quantity} {props.unitList[article.unit]}</span>
                                                            <span className="col">{article.name}</span>
                                                            <span className='col'> {props.categoryList[article.category]}</span>
                                                        </span>
                                                        <div className="col-6 d-flex justify-content-around">
                                                            <button className="btn btn-warning" onClick={(e) => {props.removeFromCart(article.id)}}>löschen</button>
                                                            <button className="btn btn-light" onClick={(e) => {editArticle(props, article)}}>bearbeiten</button> 
                                                            <button className="btn btn-light" title="zur Favoritenliste hinzufügen" onClick={(e) => {props.addToFav(article)}}><i className="bi bi-heart-fill"></i> hinzufügen</button>
                                                        </div>
                                                    </li>)
                                            })
                                        }
                                          
                                </ul>) :
                               <div className="my-5">
                                    {
                                        props.mode === 'filter' ?
                                        `Keine Artikel in der Kategorie ${props.categoryList[props.filterCategory]} gefunden` :
                                        'Keine Artikel in der Einkaufsliste gefunden.'
                                    }
                               </div>
                            }
                            <div id="deleteAll" className="modal" tabIndex="-1" role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Alle Artikel löschen</h5>
                                        </div>
                                        <div className="modal-body">
                                            <p>Wollen Sie wirklich alle Artikel löschen?</p>
                                            <button type="button" className="btn btn-light answer-no" data-dismiss="modal" onClick={closeModal}>Nein</button>
                                            <button type="button" className="btn btn-danger answer-yes" onClick={removeAllArticles}>Ja, alle Artikel löschen</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) :
                    (<>
                        <h2>{props.mode === 'edit' ? 'Artikel bearbeiten' : 'Neuer Artikel'}</h2>
                        <form className="row" onSubmit={(e) => {e.preventDefault()}}>
                            <div className='col-6'>
                                <input type="number" placeholder="Menge (optional)" min="1" 
                                    name="quantity" value={props.article.quantity}
                                    onChange={props.editArticle} />
                                <select className="inline w-50" value={props.article.unit} name="unit" onChange={props.editArticle}>
                                    <option key={-1} value="-1">Bitte Einheit wählen</option>
                                    {
                                        props.unitList.map((unit, index) => {
                                            return <option key={index} value={index}>{unit}</option>
                                        })
                                    }
                                </select> <button className="btn btn-warning" title="Einheit hinzufügen" onClick={(e) => {toggleShow('.addNewUnit')}}><i className="bi bi-plus-square"></i> Neue Einheit</button>
                                <div className="addNewUnit hidden">
                                    <input className="w-50" type="text" placeholder="Neue Einheit" value={props.newUnit} name="newUnit" onChange={props.setNewUnit} />
                                    <button className="btn btn-light" onClick={(e) => {props.addUnit(); hide('.addNewUnit')}} disabled={!props.newUnit}>Einheit hinzufügen</button>
                                </div>
                                <input type="text" placeholder="Name" 
                                    name="name" value={props.article.name}
                                    onChange={props.editArticle} />
                                <select className="inline w-50" value={props.article.category} name="category" onChange={props.editArticle}>
                                    <option value="-1">Bitte Kategorie wählen</option>
                                    {
                                        props.categoryList.map((category, index) => {
                                            return <option key={index} value={index}>{category}</option>
                                        })
                                    }
                                </select><button className="btn btn-warning" title="Kategorie hinzufügen" onClick={(e) => {toggleShow('.addNewCategory')}}><i className="bi bi-plus-square"></i> Neue Kategorie</button>
                                <div className="addNewCategory py-2 hidden">
                                    <input className="w-50" type="text" placeholder="Neue Kategorie" value={props.newCategory} name="newCategory" onChange={props.setNewCategory} />
                                    <button className="btn btn-light" onClick={(e) => {props.addCategory(); hide('.addNewCategory');}}
                                        disabled={!props.newCategory}>Einheit hinzufügen</button>
                                </div>
                                <div className="mt-3">
                                    <button className='btn btn-warning' 
                                        disabled={!props.article.quantity || !props.article.name}
                                        onClick={(e) => { e.preventDefault(); cartfunction(props); props.setMode('list')}}>
                                        { props.mode === 'edit' ? 'Ändern' : 'Hinzufügen' }
                                    </button>
                                    <button className="btn btn-light" onClick={(e) => {e.preventDefault(); props.setMode('list')}}>Zurück</button>
                                </div>
                            </div>
                        </form>
                    </>)
                }   
                </>
    )

}

export default connect(mapStateToProps, mapDispatchToProps) (List);