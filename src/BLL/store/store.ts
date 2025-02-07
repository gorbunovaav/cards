import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {profileReducer} from "../profile/profileReducer";
import {registerReducer} from "../register/registerReducer";
import {loginReducer} from "../login/loginReducer";
import {forgotReducer} from "../forgot/forgot-reducer";
import {newPasswordReducer} from "../forgot/newPassword-reducer";
import {packsReducer} from "../packs/packs-reducer";
import {cardsReducer} from "../cards/cards-reducer";
import {errorReducer} from "../Error/errorReducer";


const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer,
    profile: profileReducer,
    newPasswordReducer: newPasswordReducer,
    packs: packsReducer,
    cardsReducer:cardsReducer,
    error:errorReducer,

});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

export type IAppStore = ReturnType<typeof reducers>;

// @ts-ignore
window.store = store;
