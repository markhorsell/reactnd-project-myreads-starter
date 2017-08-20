import React from 'react'
import PropTypes from 'prop-types';

import '../App.css'

class Book extends React.Component {
   
    render() {
         const { title, authors, cover, change, shelf } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:cover }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={change} value={shelf}>
                            <option value="default" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        )
    }
}
Book.propTypes = {
       title: PropTypes.string.isRequired,
         authors: PropTypes.array.isRequired,
         cover: PropTypes.string.isRequired,
         change: PropTypes.func.isRequired,
         shelf: PropTypes.string.isRequired
        
    }


export default Book;