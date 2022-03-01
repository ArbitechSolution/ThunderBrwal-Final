import { combineReducers } from "redux";
import {getUserAccount} from '../Reducers/getAccount';


const  allReducers = combineReducers({
    getUserAccount: getUserAccount
})
export default allReducers;