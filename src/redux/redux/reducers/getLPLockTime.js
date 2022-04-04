import {LP_LOCK_TIME} from "../types/types"
let initialState ={lpLockTime:'0'};

export const setLpLockTime =(state= initialState,action)=>{
    switch(action.type){
        case LP_LOCK_TIME:
        return{
            ...state,
            lpLockTime:action.payload
        }
        default :return {...state}
    }

}