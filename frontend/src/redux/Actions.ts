import { MODIFY_BOOKS_READING_LIST, MODIFY_SEARCH_TITLE } from "./ActionTypes";
import { Book } from '../types/common';

export const modifyList = (books: Array<Book>) => {
    return {
        type: MODIFY_BOOKS_READING_LIST,
        payload: books,
    };
};

export const modifySearch = (searchTerm:string) => {
    return {
        type: MODIFY_SEARCH_TITLE,
        payload: searchTerm,
    };
};