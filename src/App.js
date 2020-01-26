import React from 'react' ;
import Search from './search.js' ;
import Bookshelf from './bookshelf.js' ;
import books from './books_list.js' ;

// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  go_back = () => {
    this.setState({
      showSearchPage: false
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search back={() => this.go_back()}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf title="Currently Reading" books={books.filter((book) => (book.shelf==="currentlyReading"))}/>
              <Bookshelf title="Want to Read" books={books.filter((book) => (book.shelf==="wantToRead"))}/>
              <Bookshelf title="Read" books={books.filter((book) => (book.shelf==="read"))}/>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
