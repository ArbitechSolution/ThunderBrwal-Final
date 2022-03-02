
import {GET_USER_THB_BALANCE, GET_WALLET_ADDRESS} from '../types/types'
import {loadWeb3} from '../../../Component/Api/api'
import Web3 from "web3";
import { thbTokenAddress, thbTokenAbi } from "../../../Component/Utils/ThbToken"
import { thbLpTokenAddress, thbLpTokenAbi } from '../../../Component/Utils/ThbLpToken'
import { stakingContractAddress, stakingContractAbi } from '../../../Component/Utils/Staking'
import { toast } from 'react-toastify';
import { nftContratAddress, nftContractAbi } from '../../../Component/Utils/Nft'

const webSupply = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");


let thbTokenContractOf = new webSupply.eth.Contract(thbTokenAbi, thbTokenAddress);
let stakingCOntractOf = new webSupply.eth.Contract(stakingContractAbi, stakingContractAddress);



export const getWallet = () => async (dispatch) => {
    console.log("get wallet 121212");
    let address = await loadWeb3();
    dispatch({
        type: GET_WALLET_ADDRESS,
        payload:address
    })
}

export const getUserThbBalance =()=> async(dispatch)=>{
    const web3 = window.web3
    console.log("get Action")
    console.log("get getUserThbBalance 1212");
    let address = await loadWeb3();
    let userthbBalance = await thbTokenContractOf.methods.balanceOf(address).call();
    let myVal = 12;
    userthbBalance =parseInt(userthbBalance)/1000000000000000000;
    userthbBalance = parseFloat(userthbBalance).toFixed(3)
    console.log("userthbBalance",userthbBalance);

    dispatch({
        type:GET_USER_THB_BALANCE,
        payload:userthbBalance
    })
}

