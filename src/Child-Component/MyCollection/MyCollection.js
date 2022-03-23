import React, { useEffect, useState, useRef } from 'react'
import "./MyCollection.css"
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import { nftContratAddress, nftContractAbi } from "../../Component/Utils/Nft"
import axios from 'axios';
import { toast } from 'react-toastify';
import { getWallet } from '../../redux/redux/actions/actions';
import { IoMdClose } from "react-icons/io";
import { InputGroup, FormControl } from 'react-bootstrap'
import tick2 from "../../Assets/tick (2) 2.png"
import Frame27 from "../../Assets/Frame 27.png"
function MyCollection() {
    
    let dispatch = useDispatch();
    let [btnTxt, setBtTxt] = useState("Connect");
    let [modalShow, setModalShow] = useState(false)
    let [modalShowone, setModalShowone] = useState(false);
    let [clickedIndexes, setClickedIndexes] = useState()
    let [imageArray, setImageArray] = useState([]);
    let [test, setTest] = useState([]);
    let [initialLimit, setInitialLimit]=useState(0);
    let [finalLimit, setFinalLimit]=useState(12)
    let [mywalletLength, setMyWalletLength]=useState();
    let [dispalyimage,setDispalyImage] = useState([])
    // let [num, setnum] = useState(0);
    let { acc } = useSelector(state => state.connectWallet);

    let toAddress = useRef("")

    const loadMore=()=>{
        
        let a=finalLimit+12
        if(a>=mywalletLength){
            setInitialLimit(initialLimit+12)
            console.log("Loading More Up");
            setFinalLimit(mywalletLength)
        }else{
            console.log("Loading More");
            setInitialLimit(initialLimit+12);
            setFinalLimit(finalLimit+12)
        }
    }
    
        const loadLess=()=>{
            let b = finalLimit-12
            if (b<=12){
                setFinalLimit(12);
                setInitialLimit(0);
            }else{
                setInitialLimit(initialLimit-12);
                setFinalLimit(finalLimit-12)      

            }
        }

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
            // console.log("Inside")
            const web3 = window.web3;
            let nftContractOf = new web3.eth.Contract(nftContractAbi, nftContratAddress);
            let simplleArray = [];
            let walletOfOwner = await nftContractOf.methods.walletOfOwner(acc).call()
            let walletLength = walletOfOwner.length
            setMyWalletLength(walletLength)
            console.log("walletOfOwner", walletOfOwner);
            // console.log("finalLimit", finalLimit);
            // console.log("initialLimit", initialLimit);

            
            if (parseInt(walletLength) > 0) {
                // if(initialLimit<parseInt(walletLength))
                {
                    let myImgArry= []
                    for (let i = 0; i <walletLength; i++) {
                        try {
                            // console.log("Getting Response");
                            let res = await axios.get(`https://ipfs.io/ipfs/QmRGryuWHLvVoem37Z6d9TbhBgqBk3CarLjWWf7tBBJQwh/${walletOfOwner[i]}.json`)
                            let imageUrl = res.data.image;
                            let dna = res.data.dna
                            let names = res.data.name
                            
                            myImgArry =[...myImgArry, imageUrl]
                            setDispalyImage(myImgArry)
                            simplleArray = [...simplleArray, {imageUrl:imageUrl, num:dna,names:names}]
                            console.log("simplleArray", myImgArry);
                            setImageArray(simplleArray);
                            console.log("Getting Response", res.data.image);
                        } catch (e) {
                            console.log("Error while Fetching Api", e)
                        }
                    }
                }    
            }
        }
    }
 

    const clickedImage = (index) => {
        console.log("You Clicked",index);
        setClickedIndexes(index)
        setModalShow(true)
    }


    const transferNft = async () => {
        if (acc == "No Wallet") {
            console.log("wallet");
            setBtTxt("Connect Wallet")
        }
        else if (acc == "Wrong Network") {
            setBtTxt("Wrong Network")
        } else if (acc == "Connect Wallet") {
            console.log("Connect Wallet");
        } else {
            let userEnteredAddress = toAddress.current.value;
            console.log("userEnteredAddress", userEnteredAddress);
            const web3 = window.web3;
            let stringLength = userEnteredAddress.length;
            if (parseInt(stringLength) >0) {
                try {
                    let nftContractOf = new web3.eth.Contract(nftContractAbi, nftContratAddress);
                    let walletOfOwner = await nftContractOf.methods.walletOfOwner(acc).call()
                    let tokenId = walletOfOwner[clickedIndexes];
                    await nftContractOf.methods.safeTransferFrom(acc, userEnteredAddress, tokenId).send({
                        from: acc
                    })
                    toast.success("Transaction confirmed")
                    setModalShowone(true)
                    setModalShow(false)
                } catch (e) {
                    toast.error("Transaction Failed")
                    console.log("Error While Transfering Nft", e);

                }

            } else {
                toast.error("Invalid Address")
            }

        }
    }

    const getWalletAddress = () => {
        dispatch(getWallet());
        // allImagesNfts()

    }
    useEffect(() => {
        allImagesNfts();
    }, [acc])
    // useEffect(() => {
    //     allImagesNfts();
    // }, [finalLimit])



    return (
        <div className='StakePageImagess pb-5'>
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
                            <h4 className='collectionsTextLarge m-2  '>NFT card transfer</h4>
                            <div className='col-lg-4 col-md-5 mycollections p-2 m-2'>
                                <img src={dispalyimage[clickedIndexes]} className='myCollectionsImage ' />

                                <div>
                                    <p className='collectionsText mt-3'>#20211 Tiger Master</p>
                                    <p className='collectionsTextSmall'>Common</p>
                                </div>
                            </div>
                            
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <span className="buypoint-span">To</span>
                                    <InputGroup >
                                        <input
                                            ref={toAddress}
                                            className="pointinput form-control"
                                            // type="number"
                                            placeholder="0"
                                            aria-label="Recipient's username with two button addons"
                                        />

                                    </InputGroup>
                                </div>
                            </div>
                            <div className="d-grid gap-2 mt-3">

                                <button onClick={() => {
                                    transferNft()
                                    // setModalShowone(true)
                                }} className='btn btnStakePage' size="lg">
                                    Confirm
                                </button>
                            </div>
                        </Modal.Body>
                    </Modal> : <></>
            }
            {
                modalShowone ?
                    <Modal
                        show={modalShow}
                        onHide={() => setModalShowone(false)}
                        // {...props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered

                    >
                        <Modal.Header className=' StakePageImage' >
                            <Modal.Title id="contained-modal-title-vcenter">
                                <IoMdClose onClick={() => setModalShowone(false)} size={28} style={{ color: "white", cursor: "pointer" }} />
                                {/* <h2 className='collectionsTextLarge m-2'> Confirm</h2> */}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='StakePageImage d-flex justify-content-center align-items-center flex-column'>
                            <h4 className='collectionsTextLarge m-2  '>NFT card transfer</h4>
                            <div className='col-lg-4 col-md-5 mycollections p-2 m-2'>
                                <img src={dispalyimage[clickedIndexes]} className='myCollectionsImage ' />

                                <div>
                                    <p className='collectionsText mt-3'>#20211 Tiger Master</p>
                                    <p className='collectionsTextSmall'>Common</p>
                                </div>
                            </div>
                            <div className='row d-flex justify-content-center mt-2'>
                                <div className='col-md-10 col-11 buypintox '>
                                    <div className='row d-flex justify-content-center mt-4 mb-4'>
                                       
                                        <div className='col-12 d-flex justify-content-evenly mt-4'>
                                            <span className='buyPointText'>To</span>
                                            <span className='buyPointText1'></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-12 successfully-tag'>
                                    <img src={tick2} width="50px"/> Card successfully transfered!
                                </div>
                            </div>
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
                                    <button onClick={() => getWalletAddress()} className='btn btnstake'>{acc === "No Wallet" ? "Insatll metamask" : acc === "Connect Wallet" ? acc : acc === "Connect to Rinkebey" ? acc : acc.substring(0, 5) + "..." + acc.substring(acc.length - 5)}</button>
                                </div>
                            </div>

                            <div className='row d-flex justify-content-center mt-3'>
                                {imageArray.slice(initialLimit,finalLimit).map((items, index) => {

                                    return (
                                        <div className='col-lg-2 col-md-5 mycollections p-2 m-1'>
                                            <img src={items.imageUrl} className='myCollectionsImage ' />
                                            {/* <span className='imageText text-white'  >&nbsp;&nbsp;{items.d}</span> */}
                                            <div>
                                                {/* <span className='imageText text-white'  >&nbsp;&nbsp;ID : {items.num}</span> */}
                                                <p className='collectionsText mt-3'>ID : {items.num}</p>
                                                <div className='d-flex flex-row justify-content-between align-items-center mb-3'>
                                                <span className='collectionsTextSmall'>{items.names}</span>
                                                <div className='small-boxxx d-flex justify-content-around align-items-center'>
                                                  <img src={Frame27} width="20px"/> 
                                                   <sapn style={{color: "white"}}>1</sapn>
                                                </div>
                                                </div>
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
                        <div 
                         className='row d-flex flex-row justify-content-center justify-content-evenly' >
                            <div  onClick={()=>loadLess()} className='col-1 d-flex align-items-center justify-content-center' style={{ cursor: "pointer" }}>
                                <img src="https://i.ibb.co/FBMT5Lv/Rectangle-551.png" style={{ position: "absolute" }} />
                                <img src="https://i.ibb.co/NjDtXXY/Vector12.png" style={{ position: " relative" }} />
                            </div>
                            <div className='col-lg-3 col-md-5 col d-flex flex-row align-items-center justify-content-evenly'>
                                {/* <span className='MyCollectionspan'>{mywalletLength}</span> */}
                                <div className='bosCollection'>
                                    <span className='mycollectionsP '>{acc=="No Wallet" || acc == "Wrong Network" || acc == "Connect Wallet" ? "" : finalLimit }/{mywalletLength}</span>
                                </div>
                                {/* <span className='MyCollectionspan'>/{mywalletLength}</span> */}
                            </div>
                            {/* <button className='btn '> */}
                            <div onClick={()=>loadMore()} className='col-1 d-flex align-items-center justify-content-center ms-4' style={{ cursor: "pointer" }}>
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