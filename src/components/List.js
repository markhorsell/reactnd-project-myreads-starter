import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import '../App.css'
import Book from './Book'


class List extends Component {
 
    state = {
        books: []
    }
    componentDidMount() {
   

        BooksAPI.getAll().then((books) => {
            this.setState({ books })
         
        })
    }

    updateBook = (book, shelf) => {
       // console.log(this);
       // console.log('Call BooksAPI.update(' + book + ',' + shelf + ') ')
        BooksAPI.update(book, shelf)
            .then((books) => {
                const newState = this.state.books.map(b => {
                    if (b.id === book.id) {
                        b.shelf = shelf;
                    }
                    return b;
                });
                this.setState({books: newState })
            })
    }
    render() {
        //console.log('Render List')
        const { books } = this.state;

        const wantToRead = books.filter(b => {
            return b.shelf === 'wantToRead'
        })
        const currentlyReading = books.filter(b => {
            return b.shelf === 'currentlyReading'
        })
        const read = books.filter(b => {
            return b.shelf === 'read'
        })

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">

                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {currentlyReading.map((book) => (
                                        <li key={book.id}>
                                            <Book
                                                title={book.title}
                                                authors={book.authors}
                                                cover={'url(' + book.imageLinks.thumbnail + ')'}
                                                shelf={book.shelf}
                                                change={(event) => this.updateBook(book, event.target.value)}
                                            />
                                        </li>))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {wantToRead.map((book) => (
                                        <li key={book.id}>
                                            <Book
                                                title={book.title}
                                                authors={book.authors.join(' ')}
                                                cover={'url(' + book.imageLinks.thumbnail + ')'}
                                                shelf={book.shelf}
                                                change={(event) => this.updateBook(book, event.target.value)}

                                            />
                                        </li>))}
                                </ol>

                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {read.map((book) => (
                                        <li key={book.id}>
                                            <Book
                                                title={book.title}
                                                authors={book.authors}
                                                cover={'url(' + book.imageLinks.thumbnail + ')'}
                                                shelf={book.shelf}
                                                change={(event) => this.updateBook(book, event.target.value)}

                                            />
                                        </li>))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="open-search">
                    <Link
                        to="/search"
                    >Search</Link>
                </div>

            </div>
        )
    }
}


export default List;