import React from 'react';
import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import mapStateToProps from './redux/mapStateToProps'
import mapDispatchToProps from './redux/mapDispatchToProps'
import List from './components/List';
import Favorites from './components/Favorites';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css';


function App(props) {
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if(Storage){
      const articleListString = localStorage.getItem('articleList');
      if(articleListString !== null) {
        const articleListArray = JSON.parse(articleListString);
        props.setArticleList(articleListArray);
      }

      const favListString = localStorage.getItem('favList');
      if(favListString !== null){
        const favListArray = JSON.parse(favListString);
        props.setFavList(favListArray);
      }
      const idCounterString = localStorage.getItem('idCounter');
      if(idCounterString !== null){
        const idCounter =JSON.parse(idCounterString);
        props.setIdCounter(idCounter);
      }
    }
  },[])

  useEffect(() => {
    if(Storage) {
      const idCounterString = JSON.stringify(props.idCounter);
      localStorage.setItem('idCounter', idCounterString);
    }
  },[props.idCounter])

  useEffect(() => {
    if(Storage) {
      const articleListString = JSON.stringify(props.articleList);
      localStorage.setItem('articleList', articleListString);
    }
  }, [props.articleList, props.favoritesList])


  useEffect(() => {
    if(Storage) {
      const favListString = JSON.stringify(props.favoritesList);
      localStorage.setItem('favList', favListString);
    }
  }, [props.favoritesList])

  useEffect(() => {
    const FILTER_CATEGORY = JSON.stringify(props.filterCategory);
    localStorage.setItem('filterCategory', FILTER_CATEGORY);
    if(props.filterCategory >= 0){
      props.setMode('filter');
    } else {
      props.setMode('list');
    }
  }, [props.filterCategory])

  useEffect(() => {
    const SORT_BY = JSON.stringify(props.sortBy);
    localStorage.setItem('sortBy', SORT_BY);
  }, [props.sortBy])

  function clearFilterAndSort() {
    props.filterByCategory(-1);
    props.sortArticleList(-1);
  }
  
  
  return (
    <div className="container">
      <div className="header row align-items-center">
        <h1 className="col-6">
          Einkaufsliste
        </h1>
        <div className="col-6 d-flex justify-content-around">
          <div>
            <button className="btn btn-light" 
              onClick={
                (e)=>{
                  clearFilterAndSort();
                  props.setMode('list');
                  navigate('/');
                }}><i className="bi bi-card-checklist"></i> Artikelliste ({props.articleList.length})</button>
          </div>
          <div>
            <button className="btn btn-light" 
            onClick={
              (e) => {
                props.clearArticle();
                props.setMode('add');
                navigate('/');
              }
            }><i className="bi bi-bag-plus-fill"></i> Artikel hinzufügen</button>
          </div>
          <div>
            <button className="btn btn-light" 
            onClick={
              (e) => {
                props.setMode('list');
                navigate('/favorites');
              }
            }><i className="bi bi-heart-fill"></i> Favoriten ({props.favoritesList.length})</button>
          </div>
        </div>
      </div>
      <main className="mb-4">
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
