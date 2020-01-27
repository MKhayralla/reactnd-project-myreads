import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Search from './search'
import Bookshelf from './bookshelf'

import * as BooksAPI from './BooksAPI'

import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    searching : false
  }
  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    })
  }
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      BooksAPI.getAll().then((results) => {
        this.setState({
          books : results
        })
      })
    })
  }
  handle_search = (query) => {
    
    if (!query || query.trim() === '') {
      
      this.setState({
        searchResults: []
      })
      return ;
    }
    
    this.setState({
      searching : true
    })
    BooksAPI.search(query).then((results) => {
      const output = results.map((result) => {
        let found = this.state.books.find((book) => book.id === result.id) ;
        return found ? found : result ;
      })
      this.setState({
        searchResults: output,
        searching : false
      })
    }).catch(
      () => {
        this.setState({
          searchResults : [],
          searching : false
        })
      }
    )
  }

  render = () => (
    <div className="app">
      <Switch>
        <Route path="/search"><Search changeShelf={this.changeShelf} loading={this.state.searching} books={this.state.searchResults} handleChange={this.handle_search} /></Route>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf  changeShelf={this.changeShelf} title="Currently Reading" books={this.state.books.filter((book) => (book.shelf === "currentlyReading"))} />
              <Bookshelf  changeShelf={this.changeShelf} title="Want to Read" books={this.state.books.filter((book) => (book.shelf === "wantToRead"))} />
              <Bookshelf  changeShelf={this.changeShelf} title="Read" books={this.state.books.filter((book) => (book.shelf === "read"))} />
            </div>
            <div className="open-search">
              <Link to='/search'><button>Add a book</button></Link>
            </div>
          </div>
        )} />
      </Switch>
    </div >
  )
}

export default BooksApp
