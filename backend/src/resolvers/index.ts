import { booksData } from '../data/books';

export const resolvers = {
  Query: {
    books: () => booksData,
    book(_: any, args: any) {
      return booksData.filter((book) => book.title.toLowerCase().includes(args.title.toLowerCase()));
    },
  },
};
