import { combineReducers } from "redux"
import { userReducer } from "./userReducers"
import {searchReducers} from "./searchReducers"
import {cartReducers} from "./cartReducers"

const rootReducer = combineReducers(
    {
        user:userReducer,
        search:searchReducers,
        cart:cartReducers,

    }
)
export default rootReducer