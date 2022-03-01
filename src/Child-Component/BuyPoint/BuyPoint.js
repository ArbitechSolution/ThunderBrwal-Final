import React from 'react'
import "./BuyPoint.css"
function BuyPoint() {
    return (
        <div className='StakePageImage'>
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

                                    className="pointinput form-control"
                                    placeholder="0"
                                    type="Number"

                                    name="second_input"

                                />
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mt-5'>
                            <div className='col-md-3'>
                                <select class="form-select" aria-label=".form-select-lg ">
                                    <option selected>Brawl Point</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className='col-md-2 d-flex justify-content-center align-items-center mt-md-1 mt-3 mb-md-1 mb-3'>
                                <img src="https://i.ibb.co/FDJhDX2/Rectangle-485.png" className='PointImage' />
                                <img src="https://i.ibb.co/tPmdyRY/Group-221.png" className='PointImage1' />
                            </div>
                            <div className='col-md-3'>
                                <select class="form-select" aria-label=".form-select-lg ">
                                    <option selected>BNB</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mt-5'>
                            <div className='col-md-12 '>
                                <span className='buyPointText'>100 BRWL POINT =</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span className='buyPointText1'>0.2 BNB</span>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mt-5'>
                            <div className='col-md-3 '>
                                <div className="d-grid gap-2">
                                    <button className="btn btnBuy" size="lg">
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