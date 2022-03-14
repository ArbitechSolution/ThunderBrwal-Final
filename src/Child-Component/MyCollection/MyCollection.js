import React, { useEffect, useState,useRef } from 'react'
import "./MyCollection.css"
import { useSelector,useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import { nftContratAddress, nftContractAbi } from "../../Component/Utils/Nft"
import axios from 'axios';
import { toast } from 'react-toastify';
import {getWallet} from '../../redux/redux/actions/actions';
function MyCollection() {
    let max = 200;
    let dispatch =useDispatch();
    let [btnTxt, setBtTxt] = useState("Connect");
    let [modalShow, setModalShow] = useState(false)
    let [clickedIndexes, setClickedIndexes] = useState()
    let [imageArray, setImageArray] = useState([]);
    let [test, setTest] = useState([])
    let [initialLimit, setInitiaLimit] = useState(0);
    let [finalLimit, setFinalLimit] = useState(6)
    let [num, setnum] = useState(0);
    let { acc } = useSelector(state => state.connectWallet)
    let toAddress =useRef("")

    const allImagesNfts = async () => {
        if (acc == "No Wallet") {
            console.log("wallet");
            setBtTxt("Connect Wallet")
        }
        else if (acc == "Wrong Network") {
            setBtTxt("Wrong Network")
        } else if (acc == "Connect Wallet") {
            console.log("Connect Wallet");
        }

        else {
            console.log("Inside")
            const web3 = window.web3;
            let nftContractOf = new web3.eth.Contract(nftContractAbi, nftContratAddress);
            let simplleArray = [];
            let walletOfOwner = await nftContractOf.methods.walletOfOwner(acc).call()
            let walletLength = walletOfOwner.length
            console.log("walletOfOwner", walletLength);
            if (parseInt(walletLength) > 0) {
                for (let i = 0; i < parseInt(walletLength); i++) {
                    try {
                        let res = await axios.get(`https://gateway.pinata.cloud/ipfs/QmPQxoBcxfkDc28mDSxXABkC74HTimND6ESNhubqrNnuGz/${walletOfOwner[i]}.json`)
                        let imageUrl = res.data.image;
                        simplleArray =[...simplleArray,imageUrl]
                        setImageArray(simplleArray)
                        console.log("Getting Response", res.data.image);
                    } catch (e) {
                        console.log("Error while Fetching Api", e)
                    }
                }
            }
        }
    }
    const ClickNext = () => {
        if (finalLimit < 12 && initialLimit >= 0) {
            setInitiaLimit(initialLimit + 6)
            setFinalLimit(finalLimit + 6)
        }
    }
    const ClickPrevious = () => {
        if (initialLimit <= max && finalLimit > 6) {
            setInitiaLimit(initialLimit - 6)
            setFinalLimit(finalLimit - 6)

        }
    }

    const clickedImage = (index) => {
        setClickedIndexes(index)
        setModalShow(true)
    }


    const transferNft =async()=>{
        if (acc == "No Wallet") {
            console.log("wallet");
            setBtTxt("Connect Wallet")
        }
        else if (acc == "Wrong Network") {
            setBtTxt("Wrong Network")
        } else if (acc == "Connect Wallet") {
            console.log("Connect Wallet");
        }else{
            let userEnteredAddress =toAddress.current.value;
            const web3=window.web3;
            let stringLength=userEnteredAddress.length;
            if (parseInt(stringLength)==42){
                try{
                    let nftContractOf = new web3.eth.Contract(nftContractAbi, nftContratAddress);
                    let walletOfOwner = await nftContractOf.methods.walletOfOwner(acc).call()
                    let tokenId =walletOfOwner[clickedIndexes];
                    await nftContractOf.methods.safeTransferFrom(acc,userEnteredAddress,tokenId).send({
                        from:acc
                    })
                    toast.success("Transaction confirmed")
                    setModalShow(false)
                }catch(e){
                    toast.error("Transaction Failed")
                    console.log("Error While Transfering Nft",e);

                }

            }else{
                toast.error("Invalid Address")
            }

        }
    }

const getWalletAddress =()=>{
dispatch(getWallet());
// allImagesNfts()

}
    useEffect(() => {
        allImagesNfts();
    }, [acc])


    return (
        <div className='StakePageImagess pb-5'>
            {
                modalShow?
                <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                // {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header className='modalBackground' closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                   <h2 className='collectionsTextLarge m-2'> Confirm</h2>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBackground d-flex justify-content-center align-items-center flex-column'>
                  <h4 className='collectionsTextLarge m-2  '>Selected Image</h4>
                  {/* {imageArray.map((items, index) => { */}
                                {/* return ( */}
                                    <div className='col-lg-3 col-md-5 mycollectionsModal p-2 m-2'>
                                        <img src={imageArray[clickedIndexes]} className='myCollectionsImage ' />
                                        {/* <span className='imageText text-white'  >&nbsp;&nbsp;{items.data.dna}</span> */}
                                        <div>
                                            {/* <span className='imageText text-white'  >&nbsp;&nbsp;1</span> */}
                                            <p className='collectionsTextSmall m-2  '>Common</p>
                                        </div>

                                        <div className="d-grid gap-2">
                                        <p className='collectionsTextSmall mt-2  '>To:</p>
                                            <input ref={toAddress}/>
                                            <button onClick={()=>transferNft()} className='btn btnStakePage' size="lg">
                                                Confirm
                                            </button>
                                     </div>
                                    </div>
                                {/* ) */}
                            {/* })} */}
                </Modal.Body>
              </Modal>:<></>
            }
<div className="StakePageImagess">
            <div className='container pt-3'>
                <div className='row d-flex justify-content-center align-items-center pb-3'>
                    <div className='col-md-12 col-11 pt-4 pb-4'>
                        <div className='row collections'>
                            <div className='col-md-4 offset-md-4 text-center d-flex align-items-center'>
                                <p className='stakepageP'>My NFT Collection</p>
                            </div>
                            <div className='col-md-3 d-flex justify-content-end'>
                                <button onClick={()=>getWalletAddress()} className='btn btnstake'>{acc === "No Wallet" ? "Insatll metamask" : acc === "Connect Wallet" ? acc : acc === "Connect to Rinkebey" ? acc : acc.substring(0, 5) + "..." + acc.substring(acc.length - 5)}</button>
                            </div>
                        </div>

                        <div className='row d-flex justify-content-center mt-3'>
                            {imageArray.slice(initialLimit, finalLimit).map((items, index) => {

                                return (
                                    <div className='col-lg-3 col-md-5 mycollections p-2 m-2'>
                                        <img src={imageArray[index]} className='myCollectionsImage ' />
                                        {/* <span className='imageText text-white'  >&nbsp;&nbsp;{items.data.dna}</span> */}
                                        <div>
                                            <span className='imageText text-white'  >&nbsp;&nbsp;{index}</span>
                                            <p className='collectionsText mt-3'>#20211 Tiger Master</p>
                                            <p className='collectionsTextSmall'>Common</p>
                                        </div>

                                        <div className="d-grid gap-2">
                                            <button onClick={() => clickedImage(index)} className='btn btnStakePage' size="lg">
                                                Transfer
                                            </button>
                                     </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='row d-flex flex-row justify-content-center justify-content-evenly' >

                        <div className='col-1 d-flex align-items-center justify-content-center' onClick={ClickPrevious} style={{ cursor: "pointer" }}>
                            <img src="https://i.ibb.co/FBMT5Lv/Rectangle-551.png" style={{ position: "absolute" }} />
                            <img src="https://i.ibb.co/NjDtXXY/Vector12.png" style={{ position: " relative" }} />
                        </div>
                        <div className='col-lg-3 col-md-5 col d-flex flex-row align-items-center justify-content-evenly'>
                            <span className='MyCollectionspan'>Current</span>
                            <div className='bosCollection'>
                                <span className='mycollectionsP '>1</span>
                            </div>
                            <span className='MyCollectionspan'>/3</span>
                        </div>

                        {/* <button className='btn '> */}
                        <div className='col-1 d-flex align-items-center justify-content-center ms-4' onClick={ClickNext} style={{ cursor: "pointer" }}>
                            <img src="https://i.ibb.co/FBMT5Lv/Rectangle-551.png" style={{ position: "absolute" }} />
                            <img src="https://i.ibb.co/n1ZWTmj/Vector13.png" style={{ position: " relative" }} />
                        </div>
                        {/* </button> */}

                    </div>
                </div>
            </div>
            </div>

        </div>
    )
}

export default MyCollection