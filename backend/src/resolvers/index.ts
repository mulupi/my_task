import { booksData } from '../data/books';

export const resolvers = {
  Query: {
    books: () => booksData,
    book(_: any, args: any) {
      return booksData.filter((book) => book.title.includes(args.title));
    },
  },
};

let tree = "hhk"
