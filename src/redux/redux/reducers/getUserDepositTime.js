import {USER_DEPOSIT_TIME} from "../types/types"
let initialState ={userDepositTime:true};

export const setLpDepositTime =(state= initialState,action)=>{
    switch(action.type){
        case USER_DEPOSIT_TIME:
        return{
            ...state,
            userDepositTime:action.payload
        }
        default :return {...state}
    }

}