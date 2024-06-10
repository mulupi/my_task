import { MODIFY_BOOKS_READING_LIST, MODIFY_SEARCH_TITLE } from "./ActionTypes";

const initialState = {
    books: [],
    searchTerm: ""
};

const bookReducer = (state = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case MODIFY_BOOKS_READING_LIST:
            return {
                ...state,
                books: action.payload
            };
        case MODIFY_SEARCH_TITLE:
            return {
                ...state,
                searchTerm: action.payload
            };
        default:
            return state;
    };
}
export default bookReducer;

