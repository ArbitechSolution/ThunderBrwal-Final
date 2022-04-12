import React, { useEffect, useRef, useState } from "react";
import "./BuyPoint.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getMaxBpTokens,
  getCurrentBpTokens,
} from "../../redux/redux/actions/actions";
import { toast } from "react-toastify";
import {
  stakingContractAddress,
  stakingContractAbi,
} from "../../Component/Utils/Staking";
import Vector33 from "../../Child-Component/Breed/Vector33.png";
import { InputGroup, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import User from "../../Assets/User.png";
import { getWallet } from "../../redux/redux/actions/actions";

import { IoMdClose } from "react-icons/io";

function BuyPoint({ ChangeMint, ChnageMain }) {
  let dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  let [userBnbBalance, setUserBnbBalance] = useState();
  let [userSpent, setBnbSpent] = useState(0);
  let [usersConvertedpoints, setUsersConvertedPoints] = useState(0);
  let [youWillRecieve, setYouWillrecive] = useState(0);

  const getRecievingAmount = async () => {
    if (acc == "No Wallet") {
      console.error("No allet");
    } else if (acc == "Wrong Network") {
      console.error(" Wrong wallet");
    } else if (acc == "Connect Wallet") {
      console.error("Connect Wallet");
    } else {
      const web3 = window.web3;
      let userEnterdValue = userEnterd.current.value;

      if (parseFloat(userEnterdValue) > 0) {
        userEnterdValue = web3.utils.toWei(userEnterdValue.toString());
        let stakingCOntractOf = new web3.eth.Contract(
          stakingContractAbi,
          stakingContractAddress
        );
        let converted = await stakingCOntractOf.methods
          .BNBToBP(userEnterdValue)
          .call();
        converted = parseFloat(converted);
        let bpPercent = await stakingCOntractOf.methods.Bppercent().call();
        bpPercent = web3.utils.fromWei(bpPercent);
        bpPercent = parseFloat(bpPercent);
        let multipliedValue = converted * bpPercent;
        setYouWillrecive(multipliedValue);
      } else {
        setYouWillrecive(0);
      }
    }
  };

  const getUserBalance = async () => {
    if (acc == "No Wallet") {
      console.error("No allet");
    } else if (acc == "Wrong Network") {
      console.error(" Wrong wallet");
    } else if (acc == "Connect Wallet") {
      console.error("Connect Wallet");
    } else {
      try {
        const web3 = window.web3;
        let userBNBBalance = await web3.eth.getBalance(acc);
        userBNBBalance = web3.utils.fromWei(userBNBBalance);
        userBNBBalance = parseFloat(userBNBBalance).toFixed(4);
        setUserBnbBalance(userBNBBalance);
        // console.log("UserBnb balance",userBNBBalance);
      } catch (e) {
        console.error("Error whgile getting users Bnb Balance");
      }
    }
  };

  let { currentBp } = useSelector((state) => state.setCurrentBpTokens);
  let { maxBpTokens } = useSelector((state) => state.setMaxBpTokens);
  let { acc } = useSelector((state) => state.connectWallet);
  // console.log("Current Bp = ", currentBp)
  // console.log("maxBpTokens Bp = ", maxBpTokens)
  let userEnterd = useRef();

  const closeModal = () => {
    setModalShow(false);
    // ChnageMain();
  };

  const getMaxUserBal = async () => {
    // console.log("Inside");
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      toast.error("No Wallet");
    } else if (acc == "Wrong Network") {
      toast.error(" Wrong wallet");
    } else if (acc == "Connect Wallet") {
      toast.error("Connect Wallet");
    } else {
      try {
        const web3 = window.web3;
        let stakingCOntractOf = new web3.eth.Contract(
          stakingContractAbi,
          stakingContractAddress
        );
        let bpPercent = await stakingCOntractOf.methods.Bppercent().call();
        let userBNBBalance = await web3.eth.getBalance(acc);
        let converted = await stakingCOntractOf.methods
          .BNBToBP(userBNBBalance.toString())
          .call();
        userBNBBalance = web3.utils.fromWei(userBNBBalance);
        userBNBBalance = parseFloat(userBnbBalance).toFixed(4);
        userEnterd.current.value = userBNBBalance;
        userBNBBalance = parseInt(userBNBBalance);

        converted = parseFloat(converted);
        bpPercent = web3.utils.fromWei(bpPercent);
        bpPercent = parseFloat(bpPercent);
        let multipliedValue = converted * bpPercent;
        console.log("multipliedValue", multipliedValue);
        setYouWillrecive(multipliedValue);
      } catch (e) {
        console.log("Error While geting Max Balance", e);
      }
    }
  };
  const buyWithBnb = async () => {
    // console.log("Inside");
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      toast.error("No Wallet");
    } else if (acc == "Wrong Network") {
      toast.error(" Wrong wallet");
    } else if (acc == "Connect Wallet") {
      toast.error("Connect Wallet");
    } else {
      try {
        const web3 = window.web3;
        let userEnterdValue = userEnterd.current.value;
        setBnbSpent(userEnterdValue);
        let userBNBBalance = await web3.eth.getBalance(acc);
        userEnterdValue = web3.utils.toWei(userEnterdValue.toString());
        // console.log("userEnterdValue", userBNBBalance);
        let stakingCOntractOf = new web3.eth.Contract(
          stakingContractAbi,
          stakingContractAddress
        );
        let converted = await stakingCOntractOf.methods
          .BNBToBP(userEnterdValue)
          .call();
        setUsersConvertedPoints(converted);
        if (parseFloat(userEnterdValue) > 0) {
          if (parseFloat(userBNBBalance) > parseFloat(userEnterdValue)) {
            if (parseFloat(currentBp) <= parseFloat(maxBpTokens)) {
              userEnterdValue = userEnterdValue.toString();
              await stakingCOntractOf.methods.BuywithBNb().send({
                from: acc,
                value: userEnterdValue,
              });
              setModalShow(true);
              toast.success("Transaction confirmed");
            } else {
              toast.error("Current Bp Tokents are Greater than MaxBpTokens");
            }
          } else {
            toast.error("The entered amount is Greater than your balance ");
          }
        } else {
          toast.error("Entered value must be greater than 0");
        }
      } catch (e) {
        toast.error("Transaction Failed");
        console.log("Error While buying with bnb", e);
      }
    }
  };
  const getWalletAddress = () => {
    dispatch(getWallet());
    // allImagesNfts()
  };
  useEffect(() => {
    dispatch(getMaxBpTokens());
    dispatch(getCurrentBpTokens());
    getUserBalance();
  }, [acc]);
  return (
    <div className="StakePageImage-Mint">
      <div className="container pt-3">
        <div className="row d-flex justify-content-center align-items-center pb-3">
          <div className="col-md-12 col-11 Stakeboxs pt-4 pb-4">
            <div className="row ">
              <div className="col-md-8 offset-md-2 d-flex align-items-center">
                <img
                  src="https://i.ibb.co/SJLFXL2/Vector10.png"
                  className="stakeimage ms-2"
                />
              </div>
            </div>
            <div className="row">
              {/* <div className='col-3'>
                                
                            </div> */}
              <div className="col-md-6 col-12 offset-md-3">
                <p className="stakepageP mt-1">
                  BRWL POINT Converter Calculator
                </p>
              </div>
              <div className="col-md-3 col-8 d-flex justify-content-end">
                <button
                  onClick={() => getWalletAddress()}
                  className="btn btnstake "
                >
                  {acc === "No Wallet"
                    ? "Connect "
                    : acc === "Connect Wallet"
                    ? "Connect"
                    : acc === "Connect to Rinkebey"
                    ? "Connect"
                    : acc.substring(0, 5) +
                      "..." +
                      acc.substring(acc.length - 5)}
                </button>
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-3">
              {modalShow ? (
                <Modal
                  // {...props}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header
                    className="StakePageImage"
                    style={{ color: "white" }}
                  >
                    <Modal.Title id="contained-modal-title-vcenter">
                      <IoMdClose
                        onClick={() => setModalShow(false)}
                        size={28}
                        style={{ color: "white", cursor: "pointer" }}
                      />
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="StakePageImage">
                    <div className="row d-flex justify-content-center">
                      <div className="col-12">
                        <div className="row d-flex justify-content-center">
                          <div className="col-md-12">
                            <img
                              alt="greetings"
                              src="https://i.ibb.co/SJLFXL2/Vector10.png"
                              className="stakeimage"
                            />
                          </div>
                          <div className="col-md-6 model-but-box mt-4 pt-5 text-center">
                            <img src={User} />
                            <p className="model-but-p mt-3">Successful</p>
                            <div className="mt-4">
                              <p className="modelbuy-pp2">You Have spent</p>
                              <p className="model-but-p">{userSpent} BNB</p>
                            </div>
                            <div className="d-flex justify-content-between mt-5">
                              <span className="model-p99">Converted:</span>
                              <span className="model-p98">
                                {youWillRecieve} POINT
                              </span>
                            </div>
                            <div className="d-flex justify-content-between mt-3">
                              <span className="model-p99">Price:</span>
                              <span className="model-p98">
                                1 BNB= 3,636.36 POINT
                              </span>
                            </div>
                            <div className="row d-flex justify-content-center mt-5 mb-4">
                              {/* <div className='col-md-5 mt-2'>
                                                            <div className="d-grid gap-2">
                                                                <a href="#" onClick={() => closeModal()} className="btn btnBuy18" size="lg" >
                                                                    Back
                                                                </a>
                                                            </div>
                                                        </div> */}
                              <div className="col-md-7 mt-2">
                                <div className="d-grid gap-2">
                                  <a
                                    className="btn btnBuy"
                                    size="lg "
                                    href="#Mint"
                                    onClick={() => {
                                      ChangeMint();
                                      window.scrollTo(0, 0);
                                    }}
                                  >
                                    View Status
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              ) : (
                <></>
              )}
              <div className="col-md-7 text-end">
                <span className="point-buy-txt">
                  Available:{userBnbBalance} BNB
                </span>
                <InputGroup>
                  <FormControl
                    ref={userEnterd}
                    onChange={() => getRecievingAmount()}
                    className="pointinput form-control"
                    type="number"
                    placeholder="0"
                    min={1}
                    aria-label="Recipient's username with two button addons"
                  />
                  <button
                    onClick={() => getMaxUserBal()}
                    className="btn btn-text pointinput"
                  >
                    MAX
                  </button>
                  <button className="btn pointinput">BNB</button>
                </InputGroup>
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-5">
              <div className="col-md-3 text-start">
                <span className="buypoint-span">From</span>
                <div className="buypount">
                  <span>BNB</span>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center align-items-center mt-md-4 mt-3 mb-md-1 mb-3">
                <img
                  src="https://i.ibb.co/FDJhDX2/Rectangle-485.png"
                  className="PointImage"
                />
                <img src={Vector33} className="PointImage1" />
              </div>

              <div className="col-md-3 text-start">
                <span className="buypoint-span">TO</span>
                <div className="buypount">
                  <span>Brawl Point</span>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-5">
              <div className="col-md-6 col-11 buypintox ">
                <div className="row d-flex justify-content-center mt-4 mb-4">
                  <div className="col-12 d-flex justify-content-evenly">
                    <span className="buyPointText">Price:</span>
                    <span className="buyPointText1">1 BNB= 3,636.36 POINT</span>
                  </div>
                  <div className="col-12 d-flex justify-content-evenly mt-4">
                    <span className="buyPointText">You’ll receive:</span>
                    <span className="buyPointText1">
                      {youWillRecieve} POINT
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-5">
              <div className="col-md-3 mt-2">
                <div className="d-grid gap-2">
                  <button
                    onClick={() => {
                      buyWithBnb();
                      // setModalShow(true)
                    }}
                    className="btn btnBuy"
                    size="lg"
                  >
                    CONVERT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BuyPoint;
