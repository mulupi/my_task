import {MODIFY_BOOKS_READING_LIST} from "./ActionTypes";
import { Book } from '../types/common';

export const modifyList = (books:Array<Book>) => {
    return {
        type: MODIFY_BOOKS_READING_LIST,
        payload: books,
    };
};