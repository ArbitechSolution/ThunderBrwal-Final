import {GET_USER_THB_BALANCE} from '../types/types';
let initialState = {bal:"0"};



export const getThbbalance =(state= initialState,action)=>{
    console.log("reducer",action)
    switch (action.type){
        case GET_USER_THB_BALANCE:
        return {
            ...state,
            bal:action.payload

        }
        default:return {...state}
    }
}