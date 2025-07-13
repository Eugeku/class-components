import { Component } from 'react';
import Card from '@components/Card';
import { type Book } from '@/types';

interface Props {
  books: Book[];
}

export default class CardList extends Component<Props> {
  render() {
    return (
      <>
        {this.props.books.map((p) => (
          <Card key={p.title} book={p} />
        ))}
      </>
    );
  }
}
