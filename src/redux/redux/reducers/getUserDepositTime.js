import {USER_DEPOSIT_TIME} from "../types/types"
let initialState ={userDepositTime:{
    days:0,
    hours:0,
    minutes:0,
    seconds:0
}};

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