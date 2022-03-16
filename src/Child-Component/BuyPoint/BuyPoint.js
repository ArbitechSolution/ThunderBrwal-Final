import React, { useEffect, useRef } from 'react'
import "./BuyPoint.css"
import { useSelector, useDispatch } from 'react-redux';
import { getMaxBpTokens, getCurrentBpTokens } from '../../redux/redux/actions/actions'
import { toast } from 'react-toastify';
import { stakingContractAddress, stakingContractAbi } from '../../Component/Utils/Staking';
import Vector33 from "../../Child-Component/Breed/Vector33.png"

function BuyPoint() {
    let dispatch = useDispatch();
    let { currentBp } = useSelector(state => state.setCurrentBpTokens)
    let { maxBpTokens } = useSelector(state => state.setMaxBpTokens)
    let { acc } = useSelector(state => state.connectWallet)
    console.log("Current Bp = ", currentBp)
    console.log("maxBpTokens Bp = ", maxBpTokens)
    let userEnterd = useRef()

    const buyWithBnb = async () => {
        console.log("Inside");
        // console.log("ACC=",acc)
        if (acc == "No Wallet") {
            toast.error("No allet");
        }
        else if (acc == "Wrong Network") {
            toast.error(" Wrong wallet");

        } else if (acc == "Connect Wallet") {
            toast.error("Connect Wallet");
        } else {

            try {
                const web3 = window.web3;
                let userEnterdValue = userEnterd.current.value;
                let userBNBBalance = await web3.eth.getBalance(acc);
                userEnterdValue = web3.utils.toWei(userEnterdValue.toString())
                console.log("userEnterdValue", userBNBBalance);
                let stakingCOntractOf = new web3.eth.Contract(stakingContractAbi, stakingContractAddress);
                if (parseFloat(userEnterdValue) > 0) {
                    if (parseFloat(userBNBBalance) >= parseFloat(userEnterdValue)) {
                        if (parseFloat(currentBp) <= parseFloat(maxBpTokens)) {
                            userEnterdValue = userEnterdValue.toString()
                            await stakingCOntractOf.methods.BuywithBNb().send({
                                from: acc,
                                value: userEnterdValue

                            })
                            toast.success("Transaction confirmed")
                        } else {
                            toast.error("Current Bp Tokents are Greater than MaxBpTokens")
                        }
                    } else {
                        toast.error("The entered amount is Greater than your balance ")
                    }

                } else {
                    toast.error("Entered value must be greater than 0")
                }
            } catch (e) {
                toast.error("Transaction Failed")
                console.log("Error While buying with bnb", e);
            }
        }
    }

    useEffect(() => {
        dispatch(getMaxBpTokens());
        dispatch(getCurrentBpTokens());
    }, [])
    return (
        <div className='StakePageImage-Mint'>
            <div className='container pt-3'>
                <div className='row d-flex justify-content-center align-items-center pb-3'>
                    <div className='col-md-12 col-11 Stakeboxs pt-4 pb-4'>
                        <div className='row '>
                            <div className='col-md-8 offset-md-2 d-flex align-items-center'>
                                <img src="https://i.ibb.co/SJLFXL2/Vector10.png" className="stakeimage" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <p className='stakepageP mt-2'>BRWL POINT Converter Calculator</p>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mt-3'>
                            <div className='col-md-4'>
                                <input
                                    ref={userEnterd}
                                    className="pointinput form-control"
                                    placeholder="0"
                                    type="Number"

                                    name="second_input"

                                />
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mt-5'>
                            <div className='col-md-3 buypount'>
                                <span>BNB</span>
                            </div>
                            <div className='col-md-2 d-flex justify-content-center align-items-center mt-md-1 mt-3 mb-md-1 mb-3'>
                                <img src="https://i.ibb.co/FDJhDX2/Rectangle-485.png" className='PointImage' />
                                <img src={Vector33} className='PointImage1' />
                            </div>
                            <div className='col-md-3 buypount'>
                                <span>Brawl Point</span>
                            </div>
                            {/* <div className='col-md-3'>
                                <select class="form-select" aria-label=".form-select-lg ">
                                    <option selected>BNB</option>

                                </select>
                            </div> */}
                        </div>
                        <div className='row d-flex justify-content-center mt-5'>
                            <div className='col-md-12 '>
                                <span className='buyPointText'>1 BNB =</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span className='buyPointText1'>36,36.36 point</span>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mt-5'>
                        <div className='col-md-2 '>
                                <div className="d-grid gap-2">
                                    <button className="btn btnBuy" size="lg">
                                        Back
                                    </button>
                                </div>
                            </div>
                            <div className='col-md-2 '>
                                <div className="d-grid gap-2">
                                    <button onClick={() => buyWithBnb()} className="btn btnBuy" size="lg">
                                        CONVERT
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default BuyPoint