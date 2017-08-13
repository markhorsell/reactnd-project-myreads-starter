import React , { Component } from 'react'
import { Route } from 'react-router-dom'

import Search from './components/Search'
import List from './components/List'
import './App.css'

class BooksApp extends Component {  

  
  constructor(props) {
    super(props);
    this.state = {showSearchPage: false};
  }
 
 
  /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() =>(
          <div>
          Nothing here - see search or list</div>
        )}/>
        <Route path='/search'  render={(history) =>(
          <Search />
         )}/>
        <Route path='/list' render={({history}) => (
          <List />
        )}/>
      </div>
    )
  }
}

export default BooksApp
