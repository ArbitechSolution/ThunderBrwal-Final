
import {GET_USER_BRL} from "../types/types"
let initialState ={brlPoint:'0'};

export const getUserBrlpoint =(state= initialState,action)=>{
    switch(action.type){
        case GET_USER_BRL:
        return{
            ...state,
            brlPoint:action.payload
        }
        default :return {...state}
    }

}