import { MODIFY_BOOKS_READING_LIST } from "./ActionTypes";

const initialState = {
    books: []
};

const bookReducer = (state = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case MODIFY_BOOKS_READING_LIST:
            return {
                ...state,
                books: action.payload
            };
        default:
            return state;
    };
}
export default bookReducer;

