import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Search from './search'
import Bookshelf from './bookshelf'

import * as BooksAPI from './BooksAPI'

import './App.css'

//shelves object
const shelves = [{
  status: 'currentlyReading', title: 'Currently Reading'
}, {
  status: 'wantToRead', title: 'Want to Read'
}, {
  status: 'read', title: 'Read'
}]
class BooksApp extends React.Component {
  //state contains shelf book, search results and loading indicator to pass down to children
  state = {
    books: [],
    searchResults: [],
    searching: false,
    query: ''
  }
  //fetch books on loading
  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    })
  }
  //match search results with personal books
  match = (bookList) => {
    return bookList.map((result) => {
      let found = this.state.books.find((book) => book.id === result.id);
      return found ? found : result;
    })
  }
  //change the book shelf 
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      BooksAPI.getAll().then((results) => {
        this.setState((currentState) => {
          let nextState = currentState;
          nextState.books = results;
          nextState.searchResults = this.match(currentState.searchResults);
          return nextState;
        })
      })
    })
  }
  //search for books
  handle_search = (query) => {
    //empty query
    if (!query || query.trim() === '') {

      this.setState({
        searchResults: []
      })
      return;
    }
    if (query === this.state.query) {
      return;
    }
    //start searching
    this.setState({
      query: query
    })
    this.setState({
      searching: true
    })
    BooksAPI.search(query).then((results) => {
      //match results with personal books
      const output = this.match(results)
      this.setState({
        searchResults: output,
        searching: false
      })
    }).catch(
      () => {
        this.setState({
          //empty results for failed queries
          searchResults: [],
          searching: false
        })
      }
    )
  }
  //rendering the component
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
              {shelves.map((shelf) => (
                <Bookshelf changeShelf={this.changeShelf} title={shelf.title} books={this.state.books.filter((book) => (book.shelf === shelf.status))} key={shelf.status} />
              ))}
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
