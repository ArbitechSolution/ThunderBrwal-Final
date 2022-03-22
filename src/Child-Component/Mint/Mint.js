import React, { useState, useEffect } from 'react'
// import Vector10 from "../../Assets/Vector10.png"
// import Rectangle554 from "../../Assets/Rectangle 554.png"
// import tiger1 from "../../Assets/tiger 1.jpg"
import "./Mint.css"
import { IoMdClose } from "react-icons/io";
import Spinner from './Spinner';
import axios from 'axios';
import { getUserBrawlMintPoint } from '../../redux/redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import CloseButton from 'react-bootstrap/CloseButton'
import { toast } from 'react-toastify';
import Modal from "react-bootstrap/Modal";
import { nftContratAddress, nftContractAbi } from "../../Component/Utils/Nft"
// import Group187 from "../../Assets/Group 187.png"
// import Group188 from "../../Assets/Group 188.png"

function Mint() {
    
    let [value, setValue] = useState(1)
    let [imageArray, setImageArray] = useState([]);
    let [modalShow, setModalShow] = useState(false);
    let [isLoading, setIsLoading] = useState(false)
    let dispatch = useDispatch()
    let { brawlMintPoints } = useSelector(state => state.getBrawlPointMint);
    let { acc } = useSelector(state => state.connectWallet)
    // console.log("getBrawlPointMint",acc)

    const increaseValue = () => {
        if (value < 3) {
            setValue(++value)
            console.log("setValue", value)
        }
    }
    const decreaseValue = () => {
        if (value > 1) {
            setValue(--value)
            console.log("setValue", value)
        }

    }
    // Getting pics after Minting
    const allImagesNfts = async () => {
        // console.log("ACC=",acc)
        if (acc == "No Wallet") {
            console.log("wallet");
        }
        else if (acc == "Wrong Network") {
            console.log("wallet");

        } else if (acc == "Connect Wallet") {
            console.log("Connect Wallet");
        }

        else {
            console.log("Inside")
            const web3 = window.web3;
            let nftContractOf = new web3.eth.Contract(nftContractAbi, nftContratAddress);

            // console.log(" my Number", await nftContractOf.methods)
            //             let inputId = await nftContractOf.methods.mintids(0).call();
            //         let apiParameter = parseInt(inputId)
            // console.log(" my Number", apiParameter)


            let simplleArray = [];
            for (let i = 0; i <value; i++) {
                try {

                    let inputId = await nftContractOf.methods.mintids(i).call(); 

                    console.log("walletOfOwner", inputId);
                    // let walletLength = inputId.length
                    console.log("Indexes", i);
                    console.log("Indexes2", inputId);

                    let res = await axios.get(`https://ipfs.io/ipfs/QmRGryuWHLvVoem37Z6d9TbhBgqBk3CarLjWWf7tBBJQwh/${inputId}.json`)
                    let imageUrl = res.data.image;
                    simplleArray = [...simplleArray, imageUrl]
                    setImageArray(simplleArray)

                    console.log("Getting Response", res);
                } catch (e) {
                    console.log("Error while Fetching Api", e)
                }

            }
        }

    }

    // Minting Funtions
    const myMint = async () => {
        try{
            console.log("my ACC=", acc)
            if (acc == "No Wallet") {
                toast.error("No Wallet Connected")
            }
            else if (acc == "Wrong Network") {
                toast.error("Wrong Newtwork please connect to test net")
            } else if (acc == "Connect Wallet") {
                toast.error("Not Connected")
            } else {
                
                console.log("mintFor");
                const web3 = window.web3;
                let nftContractOf = new web3.eth.Contract(nftContractAbi, nftContratAddress);
                let mintingPrice = await nftContractOf.methods.MinitngPrice().call();
                let supply = await nftContractOf.methods.totalSupply().call();
                let maxSupply = await nftContractOf.methods.maxsupply().call();
                let myBrawl = web3.utils.toWei(brawlMintPoints.toString())
                if (parseFloat(myBrawl) >= parseFloat(mintingPrice)) {
                    if (parseFloat(maxSupply) >= parseFloat(supply)) {
                        setIsLoading(true)
                        await nftContractOf.methods.mint(value).send({
                            from: acc
                        }).on("receipt", (receipt) => {
                            console.log("mintValue", receipt);
                        })
                        toast.success("Transaction Confirmed")
                        dispatch(getUserBrawlMintPoint())
                       await allImagesNfts();
                        setModalShow(true);
                        setIsLoading(false)
    
                    } else {
                        setIsLoading(false)
    
                        toast.error("Maximum minting reached")
                    }
    
                }
                else {
                    setIsLoading(false)
                    toast.error("You do not have enought Brawl points")
                }
            }
        }catch(e){
            setIsLoading(false)
            console.log("Error While Mintinng",e);
        }

       
    }

const getEventsForMinting=async()=>{
    try{
        if (acc == "No Wallet") {
            console.error("No Wallet Connected")
        }
        else if (acc == "Wrong Network") {
            console.error("Wrong Newtwork please connect to test net")
        } else if (acc == "Connect Wallet") {
            console.error("Not Connected")
        } else {
            const web3 = window.web3;
            let nftContractOf = new web3.eth.Contract(nftContractAbi, nftContratAddress);
          let ahan =  await nftContractOf.events.allEvents({ fromBlock: 'latest' })
          let event = nftContractOf.events.Transfer();
            console.log("My Events", ahan);
            console.log("Specific Events=",event);
        }


    }catch(e){
        console.log("Error While getting",e);
    }
}





    useEffect(() => {
        dispatch(getUserBrawlMintPoint())
        getEventsForMinting();
    }, [])

    return (
        <div className='StakePageImage-Mint'>
            {
                isLoading && <Spinner/>
            }
 {
                modalShow ?
                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        // {...props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered

                    >
                        <Modal.Header className=' StakePageImage' >
                            <Modal.Title id="contained-modal-title-vcenter">
                                <IoMdClose onClick={() => setModalShow(false)} size={28} style={{ color: "white", cursor: "pointer" }} />
                                {/* <h2 className='collectionsTextLarge m-2'> Confirm</h2> */}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='StakePageImage d-flex justify-content-center align-items-center flex-column'>
                        <div className="row d-flex justify-content-end mt-3">
                                <div className='col-md-12 d-flex justify-end-lg-end'>
                                    <button className='btn btnstake'>{acc === "No Wallet" ? "Insatll metamask" : acc === "Connect Wallet" ? acc : acc === "Connect to Rinkebey" ? acc : acc.substring(0, 5) + "..." + acc.substring(acc.length - 5)}</button>
                                </div>
                            </div>
                            <div className='row d-flex justify-content-center mt-3' >
                                <div className='col-md-12'>
                                    <img alt='greetings' src='https://i.ibb.co/NmqhYRk/Group-504.png' className='Congratimage' />
                                </div>
                            </div>
                            <div>
                                <p className='simpleText'>
                                    You got a Tiger mask card now!
                                </p>
                            </div>
                            <div className="row d-flex flex-row justify-content-center">
                               
                                {
                                    imageArray.map((items, index) => {

                                        return (
                                            <div className='col-lg-3 uperimg col-md-5 p-3 m-2'>
                                                <img alt='greetings' src={imageArray[index]} className="model-i" />

                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className=" row d-flex justify-content-center justify-content-md-around btnmodelhere">
                                <div className="col-md-4 col-10">
                                    <div className="d-grid gap-2">
                                        <button className='undermodelbtn ' size="lg">
                                        BREED
                                        </button>

                                    </div>

                                </div>
                                <div className="col-md-4 col-10">
                                <div className="d-grid gap-2">
                                        <button className='undermodelbtn2 ' size="lg">
                                        BREED
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal> : <></>
            }
            {/* {
                modalShow ? <Modal
                    show={modalShow} 
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className='d-flex StakePageImage'
                    >
                    <Modal.Header className='StakePageImage'>
                        <div className='pb-4 '>
                            <div className=' d-flex justify-content-center'>
                                <div className=' d-flex mt-2'>
                                    <CloseButton onClick={() => setModalShow(false)} variant="white" />
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center mt-3">
                                <div className='col-md-12 d-flex justify-content-lg-end'>
                                    <button className='btn btnstake'>{acc === "No Wallet" ? "Insatll metamask" : acc === "Connect Wallet" ? acc : acc === "Connect to Rinkebey" ? acc : acc.substring(0, 5) + "..." + acc.substring(acc.length - 5)}</button>
                                </div>
                            </div>
                            <div className='row d-flex justify-content-center mt-3' >
                                <div className='col-md-12'>
                                    <img alt='greetings' src='https://i.ibb.co/NmqhYRk/Group-504.png' className='Congratimage' />
                                </div>



                            </div>
                            <div>
                                <p className='simpleText'>
                                    You got a Tiger mask card now!
                                </p>
                            </div>


                            <div className="uperimg row d-flex flex-row justify-content-center">
                                {
                                    imageArray.map((items, index) => {

                                        return (
                                            <div className='col-lg-3 uperimg col-md-5 p-3 m-2'>
                                                <img alt='greetings' src={imageArray[index]} className="model-i" />

                                            </div>
                                        )
                                    })
                                }


                            </div>


                            <div className=" row d-flex justify-content-center justify-content-around btnmodelhere">
                                <div className="col-md-4 col-10">
                                    <div className="d-grid gap-2">
                                        <button className='undermodelbtn ' size="lg">
                                        BREED
                                        </button>

                                    </div>

                                </div>
                                <div className="col-md-4 col-10">
                                    <button className='undermodelbtn2'>ACCEPT</button>
                                </div>
                            </div>
                        </div>
                    </Modal.Header>
                </Modal > : <></>
            } */}
            <div className='container'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-12 col-11 Stakeboxs pt-4 pb-4'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <img alt='greetings' src="https://i.ibb.co/SJLFXL2/Vector10.png" className="stakeimage" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <p className='stakepageP'>Mint</p>
                            </div>
                        </div>

                        <div className='row pt-4 pb-4 d-flex justify-content-center '>
                            <div className='col-md-6 d-flex justify-content-center align-items-center'>
                                <img alt='greetings' src="https://i.ibb.co/yyNVLVb/Rectangle-554.png" className="mintImage1" />
                                <img alt='greetings' src="https://i.ibb.co/BPqHrwB/tiger-1.jpg" className="mintImage2" />
                            </div>
                            <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
                                <div className='text-start'>
                                    <span className='mintspane'>Your Brawl:</span>&nbsp; &nbsp;
                                    <span className='mintspane1'>{brawlMintPoints} Point</span>
                                </div>
                                {/* <div className='text-start pt-lg-3 pt-2'>
                            <span className='mintspane'>BRL Spend:</span>&nbsp; &nbsp;
                            <span className='mintspane1'>100 Point</span>
                            </div> */}
                                <div className='d-flex flex-row pt-lg-5 pt-3'>
                                    <a onClick={decreaseValue} style={{ cursor: "pointer" }}><img src="https://i.ibb.co/FswxxGJ/Group-187.png" width="60px" /></a>
                                    <div className='mintboxsss mt-1 ms-4'>{value}</div>
                                    <a className='ms-4' onClick={increaseValue} style={{ cursor: "pointer" }}><img src="https://i.ibb.co/ZGpn9P7/Group-188.png" width="60px" /></a>
                                </div>
                                <div className='d-flex justify-content-center align-items-center mt-lg-5 mt-3'>
                                    <button onClick={() => myMint()} className='btn mintbtn '>MINT</button>
                                </div>
                                <span className='mintspan23 pt-lg-5 pt-3'>MAXIMUM OF 3 tiger nfts CARD PER tx</span>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12 col-11 mint-Page-border '>
                                <div className='row pt-3 text-start text-sm-center '>
                                    <div className='col-sm-4'>
                                        <span className='Mint-Time text-start'>Time</span>
                                    </div>
                                    <div className='col-sm-2'>
                                        <span className='Mint-Time'>Type</span>
                                    </div>
                                    <div className='col-sm-2'>
                                        <span className='Mint-Time'>Amount</span>
                                    </div>
                                    <div className='col-sm-1'>
                                        <span className='Mint-Time'>Status</span>
                                    </div>
                                    <div className='col-sm-3'>
                                        <span className='Mint-Time'>TX</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mint