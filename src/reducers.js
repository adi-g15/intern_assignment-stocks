import { combineReducers } from "redux";
import { CLEAR_SYMBOLS, SET_SYMBOLS } from "./actions";

function DropDownReducer(state = [], action) {

}

function SymbolReducer(state = [], action) {
    const {type, payload} = action;

    switch(type) {
        case CLEAR_SYMBOLS:
            localStorage.removeItem("assign_symbols");
            return [];
        case SET_SYMBOLS: {
            let new_state = [...payload];
            localStorage.setItem("assign_symbols", JSON.stringify(new_state));
            break;
        }
        default:
            return state;
    }

    return state;
}

export default combineReducers({
    symbols: SymbolReducer
});
