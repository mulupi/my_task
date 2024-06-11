import { Book } from '../types/common';

export default function Paginate(books:Array<Book>, page: number, limit: number): Array<Book>{
    const startIndex:number = (page-1)*limit;
    const result:Array<Book> = books.slice(startIndex,startIndex+limit)
    return result
}