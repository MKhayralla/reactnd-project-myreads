import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './book'
import ReactLoading from 'react-loading'


class Search extends Component {
    //on typing new search query
    handleInputChange = (e) => {
        const target = e.target
        const query = target.value
        this.props.handleChange(query)
    }
    render = () => (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                    <input type="text" name='query' placeholder="Search by title or author" onChange={this.handleInputChange} />
                </div>
            </div>
            {(this.props.loading) ? (
                <ReactLoading className="loading" color="green" type="spinningBubbles" height={100} width={100} />
            ) :
                (
                    (this.props.books && this.props.books.length > 0) ?
                        (<div className="search-books-results">
                            <ol className="books-grid">
                                {this.props.books.map((book) => (
                                    <li key={book.id}>
                                        <Book book={book} changeShelf={this.props.changeShelf} />
                                    </li>
                                ))}
                            </ol>
                        </div>) : (<h1 className="announcement">No Books Found !</h1>)
                )}

        </div>
    )
}



export default Search;