import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Search from './search.js'
import Bookshelf from './bookshelf.js'
import books from './books_list.js'

// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {

  }


  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/search"><Search /></Route>
          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Bookshelf title="Currently Reading" books={books.filter((book) => (book.shelf === "currentlyReading"))} />
                <Bookshelf title="Want to Read" books={books.filter((book) => (book.shelf === "wantToRead"))} />
                <Bookshelf title="Read" books={books.filter((book) => (book.shelf === "read"))} />
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
}

export default BooksApp
