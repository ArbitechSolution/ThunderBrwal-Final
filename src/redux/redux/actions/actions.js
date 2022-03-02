
import {GET_WALLET_ADDRESS} from '../types/types'
import {loadWeb3} from '../../../Component/Api/api'


export const getWallet = () => async (dispatch) => {
    
    let address = await loadWeb3();
    dispatch({
        type: GET_WALLET_ADDRESS,
        payload:address
    })
}

