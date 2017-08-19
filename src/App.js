import React , { Component } from 'react'
import { Route } from 'react-router-dom'

import Search from './components/Search'
import List from './components/List'
import './App.css'

class BooksApp extends Component {  

  
       
    

  render() {
    return (
      <div className="app">
       
        
        <Route path='/search'  render={(history) =>(
          <Search />
         )}/>
        <Route exact path='/' render={({history}) => ( 
          <List/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
