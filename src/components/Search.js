import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import '../App.css'
import Book from './Book'

class Search extends React.Component {

    state = {
        query: '',
        books: []
    }
    componentDidMount() {
        // console.log('Did mount')


    }

    updateBook = (book, shelf) => {

        BooksAPI.update(book, shelf)
            .then((books) => {
                const newState = this.state.books.map(b => {
                    if (b.id === book.id) {
                        b.shelf = shelf;
                    }
                    return b;
                });
                this.setState({ books: newState })
            })
    }
    updateQuery = (query) => {
        this.search(query, 10)
    }

    search = (query, maxResults) => {
        if (query !== '') {

            BooksAPI.search(query, maxResults)
                .then((books) => {

                    if (books === undefined) {
                        books = [];
                    }

                    if (books.error) {
                        books = [];
                    }
                    if (books.length > 0) {
                        let promises = [];
                        for (let basicDetail of books) {
                            promises.push(
                                BooksAPI.get(basicDetail.id).then(book => {

                                    return book;
                                })
                            )
                        }
                        Promise.all(promises).then((details) => {

                            this.setState({ books: details })
                            //console.log('ALL PROMISES RESOLVED')
                        })
                    }else{
                        this.setState({ books: [] })
                    }
                })
        } else {
            this.setState({ books: [], query })
        }
    }
    render() {
        const { books } = this.state;


        return (

            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search"
                        to="/"
                    >List</Link>

                    <div className="search-books-input-wrapper">

                        <input type="text"
                            placeholder="Search by title or author"

                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">

                    <ol className="books-grid">

                        {books.map((book) => (

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

        )
    }
}


export default Search;