import { Component } from 'react';
import { type Book } from '../types';
import './Card.scss';

export default class Card extends Component<{ book: Book }> {
  render() {
    const { book } = this.props;
    return (
      <div className="card">
        <strong>{book.title}</strong>
        <div>Published Year: {book.publishedYear}</div>
        <div>Published Month: {book.publishedMonth}</div>
        <div>Pages: {book.numberOfPages}</div>
        <div>Audiobook: {book.audiobook ? 'Yes' : 'No'}</div>
      </div>
    );
  }
}
