import {
  GET_USER_THB_BALANCE,
  GET_WALLET_ADDRESS,
  GET_USER_THB_LP_BALANCE,
  GET_USER_BRL,
  GET_USER_TAMOUNT,
  GET_USER_TAMOUNT_LP,
  GET_USER_BRL_LP,
  GET_USER_MINT_BRAWL_POINTS,
  GET_CURRENT_BP_TOKENS,
  GET_MAX_BP_TOKENS,
  LP_LOCK_TIME,
  USER_DEPOSIT_TIME,
} from "../types/types";
import { loadWeb3 } from "../../../Component/Api/api";
import Web3 from "web3";
import {
  thbTokenAddress,
  thbTokenAbi,
} from "../../../Component/Utils/ThbToken";
import {
  thbLpTokenAddress,
  thbLpTokenAbi,
} from "../../../Component/Utils/ThbLpToken";
import {
  stakingContractAddress,
  stakingContractAbi,
} from "../../../Component/Utils/Staking";
import { toast } from "react-toastify";
import {
  nftContratAddress,
  nftContractAbi,
} from "../../../Component/Utils/Nft";

const webSupply = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");

let thbTokenContractOf = new webSupply.eth.Contract(
  thbTokenAbi,
  thbTokenAddress
);
let thbLpTokenContractOf = new webSupply.eth.Contract(
  thbLpTokenAbi,
  thbLpTokenAddress
);
let stakingCOntractOf = new webSupply.eth.Contract(
  stakingContractAbi,
  stakingContractAddress
);

export const getWallet = () => async (dispatch) => {
  let address = await loadWeb3();
  dispatch({
    type: GET_WALLET_ADDRESS,
    payload: address,
  });
};

export const getUserThbBalance = () => async (dispatch) => {
  let address = await loadWeb3();
  if (address == "No Wallet") {
    console.log("Not Connected");
  } else if (address == "Wrong Network") {
    console.log("Wrong Network");
  } else {
    const web3 = window.web3;
    let userthbBalance = await thbTokenContractOf.methods
      .balanceOf(address)
      .call();
    userthbBalance = web3.utils.fromWei(userthbBalance);
    userthbBalance = parseInt(userthbBalance);
    // console.log("userthbBalance ",userthbBalance);
    dispatch({
      type: GET_USER_THB_BALANCE,
      payload: userthbBalance,
    });
  }
};

export const getUserThbLpBalance = () => async (dispatch) => {
  let address = await loadWeb3();
  if (address == "No Wallet") {
    console.log("Not Connected");
  } else if (address == "Wrong Network") {
    console.log("Wrong Network");
  } else {
    const web3 = window.web3;
    let userThbLpBalance = await thbLpTokenContractOf.methods
      .balanceOf(address)
      .call();
    userThbLpBalance = web3.utils.fromWei(userThbLpBalance);
    userThbLpBalance = parseInt(userThbLpBalance);

    dispatch({
      type: GET_USER_THB_LP_BALANCE,
      payload: userThbLpBalance,
    });
  }
};

export const getUserTHbTamount = () => async (dispatch) => {
  let address = await loadWeb3();
  if (address == "No Wallet") {
    console.log("Not Connected");
  } else if (address == "Wrong Network") {
    console.log("Wrong Network");
  } else {
    const web3 = window.web3;
    let userThbData = await stakingCOntractOf.methods.User(address).call();
    let tAmount = userThbData.Tamount;
    tAmount = web3.utils.fromWei(tAmount);
    tAmount = parseFloat(tAmount);
    dispatch({
      type: GET_USER_TAMOUNT,
      payload: tAmount,
    });
  }
};

export const getUserTHbLPTamount = () => async (dispatch) => {
  let address = await loadWeb3();
  if (address == "No Wallet") {
    console.log("Not Connected");
  } else if (address == "Wrong Network") {
    console.log("Wrong Network");
  } else {
    const web3 = window.web3;
    let userThbLpData = await stakingCOntractOf.methods.UserLP(address).call();
    let tAmountlp = userThbLpData.Tamount;
    tAmountlp = web3.utils.fromWei(tAmountlp);
    tAmountlp = parseFloat(tAmountlp);
    dispatch({
      type: GET_USER_TAMOUNT_LP,
      payload: tAmountlp,
    });
  }
};
export const getUserBrl = () => async (dispatch) => {
  let address = await loadWeb3();
  if (address == "No Wallet") {
    console.log("No Wallet");
  } else if (address == "Wrong Network") {
    console.log("Wrong Network");
  } else {
    const web3 = window.web3;
    let userBrawlPoint = await stakingCOntractOf.methods
      .BPcalculator(address)
      .call();
    userBrawlPoint = web3.utils.fromWei(userBrawlPoint);
    userBrawlPoint = parseInt(userBrawlPoint);

    dispatch({
      type: GET_USER_BRL,
      payload: userBrawlPoint,
    });
  }
};

export const getUserBrLp = () => async (dispatch) => {
  let address = await loadWeb3();
  if (address == "No Wallet") {
    console.log("Not Connected");
  } else if (address == "Wrong Network") {
    console.log("Wrong Network");
  } else {
    const web3 = window.web3;
    let userBrawlLpPoint = await stakingCOntractOf.methods
      .BPcalculatorforLP(address)
      .call();
    userBrawlLpPoint = web3.utils.fromWei(userBrawlLpPoint);
    userBrawlLpPoint = parseInt(userBrawlLpPoint);

    dispatch({
      type: GET_USER_BRL_LP,
      payload: userBrawlLpPoint,
    });
  }
};
export const getUserBrawlMintPoint = () => async (dispatch) => {
  let address = await loadWeb3();
  if (address == "No Wallet") {
    console.log("Not Connected");
  } else if (address == "Wrong Network") {
    console.log("Wrong Network");
  } else {
    const web3 = window.web3;
    let bpCalculator = await stakingCOntractOf.methods.balances(address).call();
    bpCalculator = web3.utils.fromWei(bpCalculator);
    // bpCalculator = bpCalculator.toLocaleString(undefined, { minimumFractionDigits: 1 })
    bpCalculator = parseFloat(bpCalculator);
    dispatch({
      type: GET_USER_MINT_BRAWL_POINTS,
      payload: bpCalculator,
    });
  }
};

export const getCurrentBpTokens = () => async (dispatch) => {
  const web3 = window.web3;
  let currentbp = await stakingCOntractOf.methods.currentBP().call();
  dispatch({
    type: GET_CURRENT_BP_TOKENS,
    payload: currentbp,
  });
};
export const getMaxBpTokens = () => async (dispatch) => {
  let maxbp = await stakingCOntractOf.methods.maxBPToken().call();
  dispatch({
    type: GET_MAX_BP_TOKENS,
    payload: maxbp,
  });
};

export const getLpLockTime = () => async (dispatch) => {
  let lpLockTime = await stakingCOntractOf.methods.LPlocktime().call();
  dispatch({
    type: LP_LOCK_TIME,
    payload: lpLockTime,
  });
};
export const getUserDepositTime = () => async (dispatch) => {
  let decidedVar = true;
  let tiemObj = {};

  let address = await loadWeb3();
  if (address == "No Wallet") {
    console.log("Not Connected");
  } else if (address == "Wrong Network") {
    console.log("Wrong Network");
  } else {
    let timestamp = Math.floor(new Date().getTime() / 1000);
    let lpLockTime = await stakingCOntractOf.methods.LPlocktime().call();
    let userLP = await stakingCOntractOf.methods.UserLP(address).call();
    let remainingTime;
    let depositTimes = userLP.Deposit_time;
    let addedTime = parseInt(depositTimes) + parseInt(lpLockTime);
    if (timestamp < addedTime) {
      remainingTime = parseInt(addedTime) - parseInt(timestamp);

      if (parseInt(remainingTime) > 0) {
        let d = Math.floor(remainingTime / (3600 * 24));
        let h = Math.floor((remainingTime % (3600 * 24)) / 3600);
        let m = Math.floor((remainingTime % 3600) / 60);
        let s = Math.floor(remainingTime % 60);

        // tiemObj = {
        //     days:d,
        //     hours:h,
        //     minutes:m,
        //     seconds:s
        // }
        if (d > 0) {
          tiemObj = { ...tiemObj, days: d };
        } else {
          tiemObj = { ...tiemObj, days: 0 };
        }
        if (h > 0) {
          tiemObj = { ...tiemObj, hours: h };
        } else {
          tiemObj = { ...tiemObj, hours: 0 };
        }
        if (m > 0) {
          tiemObj = { ...tiemObj, minutes: m };
        } else {
          tiemObj = { ...tiemObj, minutes: 0 };
        }
        if (s > 0) {
          tiemObj = { ...tiemObj, seconds: s };
        } else {
          tiemObj = { ...tiemObj, seconds: 0 };
        }
      }

      // decidedVar=false
    } else {
      remainingTime = 0;
      tiemObj = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      // decidedVar = true
    }

    dispatch({
      type: USER_DEPOSIT_TIME,
      payload: tiemObj,
    });
  }
};
