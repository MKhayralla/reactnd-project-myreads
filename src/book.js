import React from 'react'

const Book = (props) => (
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{
                width: 128, height: 188,
                backgroundImage: (props.book.imageLinks) ?`url("${props.book.imageLinks.thumbnail}")` : null
            }}></div>
            <div className="book-shelf-changer">
                <select value={props.book.shelf} onChange={(e) => {
                    let option = e.target ;                    
                    props.changeShelf(props.book, option.value)
                }}>
                    {/*the checked class is to determine which shelf is the book on*/}
                    <option value="move" disabled defaultValue>Move to...</option>
                    <option value="currentlyReading"
                    className={props.book.shelf === "currentlyReading" ? 'checked' : ''}>Currently Reading</option>
                    <option value="wantToRead"
                    className={props.book.shelf === "wantToRead" ? 'checked' : ''}>Want to Read</option>
                    <option value="read"
                    className={props.book.shelf === "read" ? 'checked' : ''}>Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        {(props.book.authors) ? props.book.authors.map((author) => (
            <div className="book-authors" key={author}>{author}</div>
        )) : (null)}
    </div>
)

export default Book;