import React from 'react';
//functional component to render the book
const Book = (props) => (
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${props.book.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
                <select>
                    {/*the checked class is to determine which shelf is the book on*/}
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading" className={props.book.shelf === "currentlyReading" ? 'checked' : ''}>Currently Reading</option>
                    <option value="wantToRead" className={props.book.shelf === "wantToRead" ? 'checked' : ''}>Want to Read</option>
                    <option value="read" className={props.book.shelf === "read" ? 'checked' : ''}>Read</option>
                    <option value="none" selected>None</option>
                </select>
            </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        {props.book.authors.map((author) => (
            <div className="book-authors" key={author}>{author}</div>
        ))}
    </div>
)

export default Book;