import { combineReducers } from "redux";
import { CLEAR_SYMBOLS, SET_SYMBOLS } from "./actions";

function SymbolReducer(state = [], action) {
    const {type, payload} = action;

    let new_state = [...state];

    switch(type) {
        case CLEAR_SYMBOLS:
            localStorage.removeItem("assign_symbols");
            return [];
        case SET_SYMBOLS:
            new_state = payload;
            break;
        default:
            return state;
    }

    localStorage.setItem("assign_symbols", JSON.stringify(new_state));
    return new_state;
}

export default combineReducers({
    symbols: SymbolReducer
});
