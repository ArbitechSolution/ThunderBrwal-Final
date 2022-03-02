import {combineReducers} from 'redux';
import {connectWallet,} from './reducers/getWalletAddrss'
import {getThbbalance} from './reducers/getUserThbBalance'
const allReducer = combineReducers({

    connectWallet:connectWallet,
    getThbbalance:getThbbalance
});

export default allReducer;