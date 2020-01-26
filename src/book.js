import React from 'react';
//functional component to render the book
const Book = (props) => (
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${props.book.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
                <select>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
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