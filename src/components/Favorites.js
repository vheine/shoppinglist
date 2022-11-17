import React from 'react';
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps';
import mapDispatchToProps from '../redux/mapDispatchToProps';

function Favorites(props) {

    function editArticle(props, article) {
        props.setEditedArticle(article);
        props.setMode('edit');
    }
    
    return (
        <>
        
            { 
                props.mode === 'list' ?
                    (
                        <>
                        <h2>Favoriten</h2>
                            { 
                                props.favoritesList.length > 0 ?
                                (<ul>
                                    <li className="header d-flex justify-content-between align-items-center">
                                        <span className="col-6 column d-flex">
                                            <span className="col"><strong>Menge</strong></span>
                                            <span className="col"><strong>Name</strong></span>
                                            <span className='col'><strong>Kategorie</strong></span>
                                        </span>
                                    </li>
                                     {
                                        props.favoritesList.map((article) => {
                                            return (
                                                <li key={article.id} className="d-flex justify-content-between align-items-center">
                                                    <span className="col-6 column d-flex">
                                                        <span className="col">{article.quantity} {props.unitList[article.unit]}</span>
                                                        <span className="col">{article.name}</span>
                                                        <span className='col'> {props.categoryList[article.category]}</span>
                                                    </span>
                                                    <div className="col-6 d-flex justify-content-around">
                                                        <button className="btn btn-warning" onClick={(e) => {props.removeFromFav(article.id)}}>löschen</button>
                                                        <button className="btn btn-light" onClick={(e) => {editArticle(props, article)}}>bearbeiten</button> 
                                                        <button className="btn btn-light" title="zur Einkaufsliste hinzufügen" onClick={(e) => {props.addToCart(article)}}><i className="bi bi-card-checklist"></i> hinzufügen</button>
                                                    </div>
                                                </li>)
                                         })
                                    }
                                </ul>) : 'Keine Favoriten vorhanden'
                             } 
                        </>
                    ) :
                props.mode === 'edit' &&
                (<>
                    <h2>Artikel bearbeiten</h2>
                    <form className="row" onSubmit={(e) => {e.preventDefault()}}>
                        <div className='col-6'>
                            <input type="text" placeholder="Menge (optional)" 
                                name="quantity" value={props.article.quantity}
                                onChange={props.editArticle} />
                            <select value={props.article.unit} name="unit" onChange={props.editArticle}>
                                <option key={-1} value="-1">Bitte Einheit wählen</option>
                                {
                                    props.unitList.map((unit, index) => {
                                        return <option key={index} value={index}>{unit}</option>
                                    })
                                }
                            </select>
                            <input type="text" placeholder="Name" 
                                name="name" value={props.article.name}
                                onChange={props.editArticle} />
                            <select value={props.article.category} name="category" onChange={props.editArticle}>
                                <option value="-1">Bitte Kategorie wählen</option>
                                {
                                    props.categoryList.map((category, index) => {
                                        return <option key={index} value={index}>{category}</option>
                                    })
                                }
                            </select>
                            <button className='btn btn-warning' 
                                disabled={!props.article.quantity || !props.article.name}
                                onClick={(e) => { 
                                    props.editFav({
                                        id: props.article.id,
                                        quantity: props.article.quantity,
                                        unit: props.article.unit,
                                        name: props.article.name,
                                        category: props.article.category
                                    });
                                    props.setMode('list')}}>Ändern</button>
                            <button className="btn btn-light" onClick={(e) => {props.setMode('list')}}>Zurück</button>
                        </div>
                    </form>
                </>)
            }
        </>
        
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (Favorites);