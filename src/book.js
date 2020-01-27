import React, { Component } from 'react'

class Book extends Component {
    state = {
        shelf: true
    }
    componentDidMount = () =>{
        if (this.props.book.shelf) {
            this.setState({shelf : true})
        } else {
            this.setState({shelf : false})
        }
    }
    render = () => (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={/*styles and missing image handling*/{
                    width: 128, height: 188,
                    backgroundImage: (this.props.book.imageLinks) ? `url("${this.props.book.imageLinks.thumbnail}")` : null
                }}></div>
                <div className="book-shelf-changer">
                    <select value={this.props.book.shelf || 'none'} onChange={(e) => {
                        //change shelf on new selection
                        let option = e.target
                        if (option.value === 'none') {
                            this.setState({
                                shelf: false
                            })
                        } else {
                            this.setState({
                                shelf: true
                            })
                        }
                        this.props.changeShelf(this.props.book, option.value)
                    }}>
                        {/*the checked class is to determine which shelf is the book on*/}
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading"
                            className={(this.state.shelf && this.props.book.shelf === "currentlyReading" && 'checked')||''}>Currently Reading</option>
                        <option value="wantToRead"
                            className={(this.state.shelf && this.props.book.shelf === "wantToRead" && 'checked')||''}>Want to Read</option>
                        <option value="read"
                            className={(this.state.shelf && this.props.book.shelf === "read" && 'checked')||''}>Read</option>
                        {this.state.shelf ? (
                            <option value="none">None</option>
                        ) : (
                                <option value="none" className="checked">None</option>
                            )}
                    </select>
                </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            {(this.props.book.authors) ? this.props.book.authors.map((author) => (
                <div className="book-authors" key={author}>{author}</div>
            )) : (null)}
        </div>
    )
}



export default Book;