import {GET_ACCOUNT} from '../type';

let initialState ;
export const getUserAccount=(state= initialState,action)=>{
    switch(action.type){
        case GET_ACCOUNT:
        return{
            ...state,
            post : action.payload

        }
        default : return state;
    }
}