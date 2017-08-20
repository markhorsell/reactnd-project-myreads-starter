import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
//import '../App.css'
//import Book from './Book'
import Shelf from './Shelf'

class List extends Component {
    state = {
        wantToRead: [],
        currentlyReading: [],
        read: []
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
         
            const wantToRead = books.filter(b => {
                return b.shelf === 'wantToRead'
            })
            const currentlyReading = books.filter(b => {
                return b.shelf === 'currentlyReading'
            })
            const read = books.filter(b => {
                return b.shelf === 'read'
            })

        
            this.setState({ 
                wantToRead:wantToRead, 
                currentlyReading:currentlyReading, 
                read:read })
        })
    }
   
    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then((books) => {

                //refresh shelves without calling API
                
                let wantToRead = this.state.wantToRead.filter(b => {
                    return b.id !== book.id
                })
                let currentlyReading = this.state.currentlyReading.filter(b => {
                    return b.id !== book.id
                })
                let read = this.state.read.filter(b => {
                    return b.id !== book.id
                })
                
                
                    if(shelf==='wantToRead'){
                        wantToRead.push(book)

                    }
                    if(shelf==='currentlyReading'){
                        currentlyReading.push(book)
                    }
                    if(shelf==='read'){
                            read.push(book)
                    }
                this.setState({ 
                    wantToRead:wantToRead, 
                    currentlyReading:currentlyReading, 
                    read:read }) 
            })
    }
    render() {
        const { wantToRead,currentlyReading, read } = this.state;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf books={currentlyReading} title="Currently Reading" updateFunc={this.updateBook} />
                        <Shelf books={wantToRead} title="Want to read" updateFunc={this.updateBook} />
                        <Shelf books={read} title="Read" updateFunc={this.updateBook} />
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