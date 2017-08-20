import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

class Shelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        updateFunc:PropTypes.func.isRequired
        
    }
   
    render() {
        const { books, title, updateFunc } = this.props;
        return (

            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    title={book.title}
                                    authors={book.authors}
                                    cover={'url(' + book.imageLinks.thumbnail + ')'}
                                    shelf={book.shelf}
                                    change={(event) => updateFunc(book, event.target.value)}
                                />
                            </li>))}
                    </ol>
                </div>
            </div>)
    }
}

export default Shelf;