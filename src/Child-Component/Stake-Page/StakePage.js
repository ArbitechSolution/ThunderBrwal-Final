import React, { useState, useEffect } from 'react'
import "./StakePage.css"
import { loadWeb3 } from '../../Component/Api/api'
// import Vector10 from "../../Assets/Vector10.png"
// import B from "../../Assets/--02 1.png"
// import vector99 from "../../Assets/vector 99.png"
// import vector100 from "../../Assets/100 2.png"
function StakePage() {

  let [btnTxt, setBtTxt] = useState("Connect")

  const getAccount = async () => {
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      setBtTxt("Connect Wallet")
    }
    else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network")
    } else {
      let myAcc = acc?.substring(0, 4) + "..." + acc?.substring(acc?.length - 4);
      setBtTxt(myAcc);

    }
  }
  useEffect(() => {
    setInterval(() => {
      getAccount();
    }, 1000);
  }, []);



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
                <button className='btn btnstake'>{btnTxt}</button>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <p className='stakepageP'>Stake $ THB Tokens to Earn BRL Points</p>
              </div>
            </div>
            <div className='row d-flex justify-content-center justify-content-evenly pt-4'>
              <div className='col-lg-4 col-11 '>
                <div className='row Stakeboxs1'>
                  <div className='col-12 pt-3'>
                    <p className='text-white fs-5 fw-bold mt-1'><img src="https://i.ibb.co/pfXvJYN/02-1.png" width="35px" /> THB</p>
                  </div>
                  <div className='col-md-12'>
                    <img src="https://i.ibb.co/Z17SP2h/vector-99.png" className="StakeImagessss" />
                  </div>

                  <div className='row d-flex justify-content-center mt-4 '>
                    <div className='col-md-12' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>Wallet</p>
                      <p className='text-end'>0 THB</p>
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center '>
                    <div className='col-md-12' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>BRL Point: </p>
                      <p className='text-end'>0</p>
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center '>
                    <div className='col-md-12' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>Staked:</p>
                      <p className='text-end'>0</p>
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center '>
                    <div className='col-6' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>Enter THB</p>
                    </div>
                    <div className="col-6">
                      <input
                        // name="first_input"
                        className="stakeinput form-control mx-3"
                        placeholder="0"
                        type="Number"

                        name="second_input"

                      />
                    </div>
                  </div>

                  <div className='row d-flex justify-content-center second-box '>
                    <div className='col-md-12 col-11  pt-3 pb-3'>
                      <div className="d-grid gap-2">
                        <button className='btn btnStakePage' size="lg">
                          Approve & Stake
                        </button>
                      </div>
                    </div>
                    <div className='col-md-6 col-11 pb-3'>
                      <div className="d-grid gap-2">
                        <button className='btn btnStakePage' size="lg">
                          Unstake
                        </button>
                      </div>
                    </div>
                    <div className='col-md-6 col-11 pb-3'>
                      <div className="d-grid gap-2">
                        <button className='btn btnStakePage' size="lg">
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className='game-order-list text-start' >
                  <li className='gamelist' style={{ fontSize: "18px" }}>Stake THB token to earn Energy point.</li>
                  <li className='gamelist' style={{ fontSize: "18px" }}>You can Unstake anytime.</li>
                  <li className='gamelist' style={{ fontSize: "18px" }}>THB rewards are calculated per block</li>
                </ul>
                <ul className='StakeOrder'>
                  <li className='Stakelist'>20,000 Point = 1 random card</li>
                  <li className='Stakelist'>*Min staking 500 THB</li>
                  <li className='Stakelist'>*Max staking 30,000 THB</li>
                </ul>
              </div>

              <div className='col-lg-4 col-11 '>
                <div className='row Stakeboxs1'>
                  <div className='col-12 pt-3'>
                    <p className='text-white fs-5 fw-bold mt-1'><img src="https://i.ibb.co/pfXvJYN/02-1.png" width="35px" /> THB/BNB</p>
                  </div>
                  <div className='col-md-12'>
                    <img src="https://i.ibb.co/X32t6X6/100-2.png" className="StakeImagessss" />
                  </div>

                  <div className='row d-flex justify-content-center mt-4 '>
                    <div className='col-md-12' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>Wallet</p>
                      <p className='text-end'>0 THB</p>
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center '>
                    <div className='col-md-12' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>BRL Point: </p>
                      <p className='text-end'>0</p>
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center '>
                    <div className='col-md-12' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>Staked:</p>
                      <p className='text-end'>0</p>
                    </div>
                  </div>
                  <div className='row d-flex justify-content-center '>
                    <div className='col-6' id="Balanceview">
                      <p className='fw-bold text-start' style={{ color: "#F8B815" }}>Enter THB LP</p>
                    </div>
                    <div className="col-6">
                      <input
                        // name="first_input"
                        className="stakeinput form-control mx-3"
                        placeholder="0"
                        type="Number"

                        name="second_input"

                      />
                    </div>
                  </div>

                  <div className='row d-flex justify-content-center second-box '>
                    <div className='col-md-12 col-11  pt-3 pb-3'>
                      <div className="d-grid gap-2">
                        <button className='btn btnStakePage' size="lg">
                          Approve & Stake
                        </button>
                      </div>
                    </div>
                    <div className='col-md-6 col-11 pb-3'>
                      <div className="d-grid gap-2">
                        <button className='btn btnStakePage' size="lg">
                          Unstake
                        </button>
                      </div>
                    </div>
                    <div className='col-md-6 col-11 pb-3'>
                      <div className="d-grid gap-2">
                        <button className='btn btnStakePage' size="lg">
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className='game-order-list text-start' >
                  <li className='gamelist' style={{ fontSize: "18px" }}>Stake THB/BNB token to earn Energy point.</li>
                  <li className='gamelist' style={{ fontSize: "18px" }}>You can not Unstake until end of time.</li>
                  <li className='gamelist' style={{ fontSize: "18px" }}>THB rewards are calculated per block.</li>
                </ul>
                <ul className='StakeOrder'>
                  <li className='Stakelist'>THB/BNP staking = 10,000 point a day * 1BNB value base</li>
                  <li className='Stakelist'>20,000 Point = 1 random card</li>
                  <li className='Stakelist'>* Min staking 0.1 BNB</li>
                  <li className='Stakelist'>* Max staking 6 BNB</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default StakePage