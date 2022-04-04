import React, { useState, useEffect, useRef } from 'react'
import "./StakePage.css"
// import Vector10 from "../../Assets/Vector10.png"
// import B from "../../Assets/--02 1.png"
// import vector99 from "../../Assets/vector 99.png"
// import vector100 from "../../Assets/100 2.png"
import { getWallet, getUserThbBalance, getUserThbLpBalance, getUserTHbTamount, getUserTHbLPTamount,getLpLockTime,
   getUserBrLp, getUserBrl,getUserDepositTime } from '../../redux/redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ImInfo } from 'react-icons/im';
import Group578 from "../../Assets/Group 578.png"
import Group579 from "../../Assets/Group 579.png"
import { thbTokenAddress, thbTokenAbi } from "../../Component/Utils/ThbToken"
import { thbLpTokenAddress, thbLpTokenAbi } from '../../Component/Utils/ThbLpToken'
import { stakingContractAddress, stakingContractAbi } from '../../Component/Utils/Staking'
import takingthbbnb from "../../Assets/taking-thb-bnb.png"
import stakingthb from "../../Assets/staking-thb.png"
function StakePage() {

  let [myDisableBtn,setmyDisableBtn] = useState(true)

  let stakeAmount = useRef(0);
  let stakeAmountLp = useRef(0);
  let [btnTxt, setBtTxt] = useState("Connect Wallet")
  let dispatch = useDispatch();
  let { acc } = useSelector(state => state.connectWallet)
  let { thbBal } = useSelector(state => state.getThbbalance)
  let { thbLpBal } = useSelector(state => state.getThbLpbalance)
  let { tamount } = useSelector(state => state.tAmount);
  let { tamountlp } = useSelector(state => state.tAmountLp)
  let { brlPoint } = useSelector(state => state.getUserBrlpoint)
  let { brlLPPoint } = useSelector(state => state.getUserBrLplpoint)
  let {lpLockTime} = useSelector (state => state.setLpLockTime)
  let {userDepositTime} = useSelector(state=> state.setLpDepositTime)


    console.log("userDepositTime",userDepositTime);
    // console.log("AddTime",AddTime);
     

    // const myDisFunc =()=>{
    //   let AddTime = parseInt(lpLockTime) + parseInt(userDepositTime);
      
    //   if (parseInt(timestamp)>= parseInt(AddTime)){
    // console.log("AddTime if",AddTime);

    //     setmyDisableBtn(false)

    //   }else{
    // console.log("AddTime else" ,AddTime);

    //     setmyDisableBtn(true)
    //   }
    // }




// const disableButon =()=>{

//     console.log("timestamp disableButon",timestamp);
//     console.log("lpLockTime disableButon",lpLockTime);
//     console.log("DEPOSIT_TIME disableButon",userDepositTime);

    
//    }
  const getAccount = () => {
    dispatch(getUserThbBalance())
    dispatch(getWallet())
    dispatch(getUserThbLpBalance())
    dispatch(getUserTHbTamount())
    dispatch(getUserTHbLPTamount())
    if (acc == "No Wallet") {
      setBtTxt("Connect Wallet")
    }
    else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network")
    }
    else if (acc == "Connect Wallet") {
      setBtTxt("Connect Wallet")
    }
    else {
      let myAcc = acc?.substring(0, 4) + "..." + acc?.substring(acc?.length - 4);
      setBtTxt(myAcc);

    }
  }

  /// here goes the staking Functions for THB

  const stakeVal = async () => {
    if (acc == "No Wallet") {
      toast.error("Connect Wallet")
    }
    else if (acc == "Wrong Network") {
      toast.error("Wrong Newtwork please connect to test net")

    } else if (acc == "Connect Wallet") {
      toast.error("Not Connected")
    } else {
      try {
        let enteredVal = stakeAmount.current.value;
        // console.log("U NEterd", enteredVal);
        const web3 = window.web3;
        let thbTokenContractOf = new web3.eth.Contract(thbTokenAbi, thbTokenAddress);
        let stakingCOntractOf = new web3.eth.Contract(stakingContractAbi, stakingContractAddress);
        let userThbBal = web3.utils.toWei(thbBal.toString())
        if (enteredVal > 0) {
          if (parseFloat(userThbBal) >= parseFloat(enteredVal)) {
            if (tamount <= 0) {
              enteredVal = web3.utils.toWei(enteredVal.toString());
              await thbTokenContractOf.methods.approve(stakingContractAddress, enteredVal.toString()).send({
                from: acc
              })
              toast.success("Transaction Confirmed")

              await stakingCOntractOf.methods.Stake(enteredVal.toString()).send({
                from: acc
              })
              stakeAmount.current.value = ""
              toast.success("Transaction Confirmed")
              dispatch(getUserTHbTamount())
              dispatch(getUserTHbLPTamount())
              dispatch(getUserThbBalance())
              dispatch(getUserThbLpBalance())
              dispatch(getUserBrLp())
              dispatch(getUserBrl())

            } else {
              toast.error("You Have Already Staked. Please Unstake and try again")
            }



          } else {
            toast.error("Insufficient balance")
            console.log("Insufficient Balance");
          }

        } else {
          console.log("Staking Amount must be greater than 0");
          toast.error("Staking Amount must be greater than 0")
        }
      } catch (e) {
        console.log("Error while staking amount", e);
        toast.error("Transaction Failed")
      }
    }
  }


  // Unstake Function for Thb
  const unstake = async () => {
    // console.log("ACC=", acc)
    if (acc == "No Wallet") {
      toast.error("Not Connected to Wallet")

    }
    else if (acc == "Wrong Network") {
      toast.error("Wrong Newtwork please connect to test net")
    } else if (acc == "Connect Wallet") {
      toast.error("Not Connected")
    }

    else {
      try {

        const web3 = window.web3
        let stakingCOntractOf = new web3.eth.Contract(stakingContractAbi, stakingContractAddress);
        if (tamount > 0) {
          await stakingCOntractOf.methods.withdrawtoken().send({
            from: acc
          })
          toast.success("Transaction Confirmed")
          dispatch(getUserTHbTamount())
          dispatch(getUserTHbLPTamount())
          dispatch(getUserThbBalance())
          dispatch(getUserThbLpBalance())
          dispatch(getUserBrLp())
          dispatch(getUserBrl())
        } else {
          toast.error("You have not staked yet")
          console.log("You have not staked yet");
        }


      } catch (e) {
        console.log("Error while staking amount", e);
        toast.error("Transaction Failed")

      }
    }

  }

  // stake functions for Lp THB

  const stakeLpVal = async () => {
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      setBtTxt("Connect Wallet")
    }
    else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network")
    } else if (acc == "Connect Wallet") {
      toast.error("Not Connected")
    } else {
      try {

        let enteredVal = stakeAmountLp.current.value;
        // console.log("U NEterd", enteredVal);
        const web3 = window.web3;
        let thbLpTokenContractOf = new web3.eth.Contract(thbLpTokenAbi, thbLpTokenAddress);
        let stakingCOntractOf = new web3.eth.Contract(stakingContractAbi, stakingContractAddress);
        let userThbLpBal = web3.utils.toWei(thbLpBal.toString())
        if (enteredVal > 0) {
          if (parseFloat(userThbLpBal) >= parseFloat(enteredVal)) {
            if (tamountlp <= 0) {
              enteredVal = web3.utils.toWei(enteredVal.toString());
              await thbLpTokenContractOf.methods.approve(stakingContractAddress, enteredVal.toString()).send({
                from: acc
              })
              toast.success("Transaction Confirmed")
              await stakingCOntractOf.methods.StakeforLP(enteredVal.toString()).send({
                from: acc
              })
              stakeAmountLp.current.value = ""
              toast.success("Transaction Confirmed")
              dispatch(getUserTHbTamount())
              dispatch(getUserTHbLPTamount())
              dispatch(getUserThbBalance())
              dispatch(getUserThbLpBalance())
              dispatch(getLpLockTime())
              dispatch(getUserDepositTime())
              dispatch(getUserBrLp())
              dispatch(getUserBrl())
              setmyDisableBtn(true)

            } else {
              toast.error("You have staked already. Unstake and try again.")
            }


          } else {
            toast.error("Insufficient Balance")
            console.log("Insufficient Balance");
          }

        } else {
          console.log("Staking Amount must be greater than 0");
          toast.error("Staking Amount must be greater than 0")
        }
      } catch (e) {
        console.log("Error while staking amount", e);
        toast.error("Transaction Failed")

      }
    }
  }

  // // function for Unstaking LPThb

  const unstakeLp = async () => {
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      setBtTxt("Connect Wallet")
    }
    else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network")
    } else if (acc == "Connect Wallet") {
      toast.error("Not Connected")
    } else {
      try {

        let timestamp = Math.floor(new Date().getTime() / 1000)
        // console.log("timestamp", timestamp);

        const web3 = window.web3;
        let stakingCOntractOf = new web3.eth.Contract(stakingContractAbi, stakingContractAddress);
        let lpLockTime = await stakingCOntractOf.methods.LPlocktime().call()
        let userLP = await stakingCOntractOf.methods.UserLP(acc).call()
        let depositTimes = userLP.Deposit_time
        let AddTime = +lpLockTime + +depositTimes;
        // console.log("AddTime", AddTime);
        if (tamountlp > 0) {
          if (timestamp >= AddTime) {
            await stakingCOntractOf.methods.withdrawLPtoken().send({
              from: acc
            })
            toast.success("Transaction Confirmed")
            dispatch(getUserTHbTamount())
            dispatch(getUserTHbLPTamount())
            dispatch(getUserThbBalance())
            dispatch(getUserThbLpBalance())
            dispatch(getUserBrLp())
            dispatch(getUserBrl())
          } else {
            toast.error("Unlocked Time Not Reached !")
          }


        } else {
          toast.error("You have not staked any Lp Tokens yet")
          console.log("You have not staked any Lp Tokens yet");
        }

      } catch (e) {
        console.log("Error while staking amount", e);
        toast.error("Transaction Failed")
      }
    }
  }





  // // function For redeeming THB
  const redeemTHB = async () => {

    // console.log("ACC=", acc)
    if (acc == "No Wallet") {
      setBtTxt("Connect Wallet")
    }
    else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network")
    } else if (acc == "Connect Wallet") {
      toast.error("Not Connected")
    } else {
      try {
        const web3 = window.web3
        let redeemContract = new web3.eth.Contract(stakingContractAbi, stakingContractAddress);
        const bPBlance = await redeemContract.methods.BPcalculator(acc).call();
        // console.log("BPBlance", bPBlance);
        if (bPBlance > 0) {

          await redeemContract.methods.redeem().send({
            from: acc
          })
          toast.success("Transaction Confirmed")
          dispatch(getUserTHbTamount())
          dispatch(getUserTHbLPTamount())
          dispatch(getUserThbBalance())
          dispatch(getUserThbLpBalance())
          dispatch(getUserBrLp())
          dispatch(getUserBrl())
        } else {
          toast.error("You have no Brawl Point yet")
          console.log("You have not staked yet");
        }

      } catch (e) {
        console.log("Error While Redeeming THB", e);
        toast.error("Transaction Failed")
      }
    }

  }

  // // function for redeeming LPThb
  const RedeemLPTHP = async () => {
    // console.log("ACC=", acc)
    if (acc == "No Wallet") {
      setBtTxt("Connect Wallet")
    }
    else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network")
    } else if (acc == "Connect Wallet") {
      toast.error("Not Connected")
    } else {
      try {
        const web3 = window.web3
        let redeemLPContract = new web3.eth.Contract(stakingContractAbi, stakingContractAddress);
        let blanceLP = await redeemLPContract.methods.BPcalculatorforLP(acc).call();
        if (blanceLP > 0) {
          await redeemLPContract.methods.redeemforLp().send({
            from: acc
          })
          toast.success("Transaction Confirmed")
          dispatch(getUserTHbTamount())
          dispatch(getUserTHbLPTamount())
          dispatch(getUserThbBalance())
          dispatch(getUserBrLp())
          dispatch(getUserBrl())
          dispatch(getUserThbLpBalance())
        } else {
          toast.error("You have no LP Brawl Point yet")
          console.log("You have not staked yet");
        }

      } catch (e) {
        console.log("Error while RedeemLP", e);
        toast.error("Transaction Failed")
      }
    }
  }






  // useEffect(()=>{
  //   setInterval(() => {
  //   }, 500)
  // },[])

useEffect(()=>{
  setInterval(() => {
    dispatch(getUserBrLp())
    dispatch(getUserBrl())
    dispatch(getUserDepositTime())
  }, 3000)
},[])

  useEffect(() => { 
    dispatch(getLpLockTime())
    dispatch(getUserDepositTime())
    dispatch(getWallet())
    dispatch(getUserTHbTamount())
    dispatch(getUserTHbLPTamount())
    dispatch(getUserThbBalance())
    dispatch(getUserThbLpBalance())
  }, [])
  return (
    <div className='StakePageImage'>
      <div className='container pt-3'>
        <div className='row d-flex justify-content-center align-items-center pb-3'>
          <div className='col-md-12 col-11 Stakeboxs pt-4 pb-4'>
            <div className='row '>
              <div className='col-md-8 offset-md-2 d-flex align-items-center'>
                <img src="https://i.ibb.co/SJLFXL2/Vector10.png" className="stakeimage" />
              </div>
              <div className='col-md-2 d-flex justify-content-end'>
                <button className='btn btnstake' onClick={getAccount}>{acc === "No Wallet" ? "Connect MetaMask" : acc === "Connect Wallet" ? acc : acc === "Connect to Rinkebey" ? acc : acc.substring(0, 5) + "..." + acc.substring(acc.length - 5)}</button>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <p className='stakepageP'>Stake $ THB Tokens to Earn BRL Points</p>
              </div>
            </div>
            <div className='row d-flex justify-content-center justify-content-evenly pt-4'>
              <div className='col-lg-4 col-11 '>
                <div className='row Stakeboxs1 pt-3 mt-3'>
                  <div className='col-10'>
                  <p className='text-white fs-5 fw-bold mt-1'><img src="https://i.ibb.co/pfXvJYN/02-1.png" width="35px" /> THB</p>
                  </div>
                  <div className='col-2'>
                    <div class="social">
                      <div class="social__container">
                        <div class="social__content">
                          <ImInfo className='social__icon' />
                          <div class="social__tooltip social__tooltip-bottom">
                            <img src={Group578} className="staking-info-pic"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-12'>
                    <img src={stakingthb} className="StakeImagessss" />
                  </div>

                  <div className='row d-flex justify-content-center mt-4 '>
                    <div className='col-md-12' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>Wallet</p>
                      <p className='text-end'>{thbBal.toLocaleString()} THB</p>
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center '>
                    <div className='col-md-12' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>BRL Point: </p>
                      <p className='text-end'>{brlPoint.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center '>
                    <div className='col-md-12' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>Staked:</p>
                      <p className='text-end'>{tamount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center '>
                    <div className='col-6' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>Enter THB</p>
                    </div>
                    <div className="col-6">
                      <input
                        // style={{float:'right'}}
                        // name="first_input"
                        ref={stakeAmount}
                        className="stakeinput form-control mx-3"
                        placeholder="0"
                        min={1}
                        type="Number"
                        name="second_input"
                      />
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center second-box '>
                    <div className='col-md-12 col-11  pt-3 pb-3'>
                      <div className="d-grid gap-2">
                        <button onClick={() => stakeVal()} className='btn btnStakePage' size="lg">
                          Approve & Stake
                        </button>
                      </div>
                    </div>
                    <div className='col-md-6 col-11 pb-3'>
                      <div className="d-grid gap-2">
                        <button onClick={() => unstake()} className='btn btnStakePage' size="lg">
                          Unstake
                        </button>
                      </div>
                    </div>
                    <div className='col-md-6 col-11 pb-3'>
                      <div className="d-grid gap-2">
                        <button
                          onClick={() => redeemTHB()}
                          className='btn btnStakePage' size="lg">
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <ul className='game-order-list text-start' >
                  <li className='gamelist' style={{ fontSize: "18px" }}>Stake THB token to earn Energy point.</li>
                  <li className='gamelist' style={{ fontSize: "18px" }}>You can Unstake anytime.</li>

                </ul>
                <ul className='StakeOrder'>
                  <li className='Stakelist'>4,000 Point = 1 random card</li>

                </ul> */}
              </div>
              <div className='col-lg-4 col-11 '>
                <div className='row Stakeboxs1 pt-3 mt-3'>
                <div className='col-10'>
                  <p className='text-white fs-5 fw-bold mt-1'><img src="https://i.ibb.co/pfXvJYN/02-1.png" width="35px" /> THB/BNB</p>
                  </div>
                  <div className='col-2'>
                    <div class="social">
                      <div class="social__container">
                        <div class="social__content">
                          <ImInfo className='social__icon' />
                          <div class="social__tooltip social__tooltip-bottom">
                            <img src={Group579} className="staking-info-pic"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className='col-12 pt-3'>
                    <p className='text-white fs-5 fw-bold mt-1'><img src="https://i.ibb.co/pfXvJYN/02-1.png" width="35px" /> THB/BNB</p>
                  </div> */}
                  <div className='col-md-12'>
                    <img src={takingthbbnb} className="StakeImagessss" />
                  </div>
                  <div className='row d-flex justify-content-center mt-4 '>
                    <div className='col-md-12' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>Wallet</p>
                      <p className='text-end'>{thbLpBal.toLocaleString()} THB-LP</p>
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center '>
                    <div className='col-md-12' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>BRL Point: </p>
                      <p className='text-end'>{brlLPPoint.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center '>
                    <div className='col-md-12' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>Staked:</p>
                      <p className='text-end'>{tamountlp.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center '>
                    <div className='col-6' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>Enter THB LP</p>
                    </div>
                    <div className="col-6">
                      <input
                        ref={stakeAmountLp}
                        // name="first_input"
                        className="stakeinput form-control mx-3"
                        placeholder="0"
                        min={1}
                        type="number"
                        name="second_input"
                      />
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center second-box '>
                    <div className='col-md-12 col-11  pt-3 pb-3'>
                      <div className="d-grid gap-2">
                        <button onClick={() => stakeLpVal()} className='btn btnStakePage' size="lg">
                          Approve & Stake
                        </button>
                      </div>
                    </div>
                    <div className='col-md-6 col-11 pb-3'>
                      <div className="d-grid gap-2">
                        <button disabled={userDepositTime} onClick={() => unstakeLp()} className='btn btnStakePage' size="lg">
                          Unstake
                        </button>
                      </div>
                    </div>
                    <div className='col-md-6 col-11 pb-3'>
                      <div className="d-grid gap-2">
                        <button  onClick={() => RedeemLPTHP()} className='btn btnStakePage' size="lg">
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <ul className='game-order-list text-start' >
                  <li className='gamelist' style={{ fontSize: "18px" }}>Stake THB/BNB token to earn Energy point.</li>
                  <li className='gamelist' style={{ fontSize: "18px" }}>You can not Unstake until end of time.</li>
                  <li className='gamelist' style={{ fontSize: "18px" }}>THB rewards are calculated per block.</li>
                </ul>
                <ul className='StakeOrder'>
                  <li className='Stakelist'>THB/BNP staking = 10,000 point a day * 1BNB value base</li>
                  <li className='Stakelist'>4,000 Point = 1 random card</li>
                </ul> */}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default StakePage