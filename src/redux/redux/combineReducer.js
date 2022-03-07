import {combineReducers} from 'redux';
import {connectWallet,} from './reducers/getWalletAddrss'
import {getThbbalance} from './reducers/getUserThbBalance'
import{getThbLpbalance} from './reducers/getUserThbLpBalance'
import {tAmount} from './reducers/getUserthbTamount'
import {tAmountLp} from './reducers/getUserthbLpTamount'
import {getUserBrlpoint} from './reducers/getUserBrlPoint'
import{getUserBrLplpoint} from './reducers/getUserBrlLpPoint'
import {getBrawlPointMint} from './reducers/getUsersbrwalPointMint'
const allReducer = combineReducers({

    connectWallet:connectWallet,
    getThbbalance:getThbbalance,
    getThbLpbalance:getThbLpbalance,
    tAmount:tAmount,
    tAmountLp:tAmountLp,
    getUserBrlpoint:getUserBrlpoint,
    getUserBrLplpoint:getUserBrLplpoint,
    getBrawlPointMint:getBrawlPointMint
});

export default allReducer;