import React, { useEffect, useState } from 'react'
import "./MyCollection.css"
import { loadWeb3 } from '../../Component/Api/api';
import Web3 from 'web3';
import {getWallet} from '../../redux/redux/actions/actions';
import {useSelector, useDispatch} from 'react-redux';

import { nftContratAddress, nftContractAbi } from "../../Component/Utils/Nft"
import axios from 'axios';
function MyCollection() {
    let max = 200;
    let [btnTxt, setBtTxt] = useState("Connect")
    let [imageArray,setImageArray] = useState([]);
    // let [collection, setCollection] = useState([])
    let [test, setTest] = useState([])
    let [initialLimit, setInitiaLimit] = useState(0);
    let [finalLimit, setFinalLimit]=useState(6)
    let [num, setnum] = useState(0);
    let {acc} = useSelector(state =>state.connectWallet)

    const allImagesNfts=async()=>{
            // console.log("ACC=",acc)
            if (acc == "No Wallet") {
                console.log("wallet");
                setBtTxt("Connect Wallet")
            }
            else if (acc == "Wrong Network") {
                setBtTxt("Wrong Network")
            }else if (acc=="Connect Wallet"){
                console.log("Connect Wallet");
            } 
            
            else {
                console.log("Inside")
                            // const web3 = window.web3;
                            // let nftContractOf = new web3.eth.Contract(nftContractAbi, nftContratAddress);
                            let simplleArray =[];
                        for( let i=0; i<=10; i++){
                            try{
                              let res = await axios.get(`https://gateway.pinata.cloud/ipfs/QmPQxoBcxfkDc28mDSxXABkC74HTimND6ESNhubqrNnuGz/${i}.json`)
                            //   console.log("Indexes", i);
                            let imageUrl = res.data.image;
                            simplleArray.push(imageUrl);
                            setImageArray(simplleArray)

                              console.log("Getting Response", res.data.image);
                            }catch(e){
                                console.log("Error while Fetching Api",e)
                            }
                              
                        }
                        // let walletOfOwner = await nftContractOf.methods.walletOfOwner(acc).call()
                        // let walletLength = walletOfOwner.length
                        // console.log("walletOfOwner", walletLength);

            }

    }

    // const mycollection = async () => {
    //     let acc = await loadWeb3();
    //     // console.log("ACC=",acc)
    //     if (acc == "No Wallet") {
    //         console.log("wallet");
    //         setBtTxt("Connect Wallet")
    //     }
    //     else if (acc == "Wrong Network") {
    //         setBtTxt("Wrong Network")
    //     } else {
    //         let myAcc = acc?.substring(0, 4) + "..." + acc?.substring(acc?.length - 4);
    //         setBtTxt(myAcc);


    //         const web3 = window.web3;
    //         let nftContractOf = new web3.eth.Contract(nftContractAbi, nftContratAddress);
    //         let walletOfOwner = await nftContractOf.methods.walletOfOwner(acc).call()
    //         let walletLength = walletOfOwner.length
    //         console.log("walletOfOwner", walletLength);
    //         let resArray = []
    //         let dummyAray = [...test];
    //         dummyAray.map((item) => {
    //             resArray.push(item)
    //         })


    //         for (let i = 1; i < walletLength; i++) {

    //             let passVariable = walletOfOwner[i];


    //             await axios.get(`https://gateway.pinata.cloud/ipfs/QmP3CU9tcQGYbBYzzhWk8tc4fcQePHXKwJqYBMY3LZNBw7/${passVariable}.json`).then((res) => {
    //                 resArray.push(res);
    //                 console.log("res", res.data);
    //             })

    //         }
    //         setTest(resArray);
    //     }
    // }

    const ClickNext = () => {
        if (finalLimit < 12 && initialLimit >= 0) {
            setInitiaLimit(initialLimit+6)
            setFinalLimit(finalLimit+6)
        }
    }
    const ClickPrevious = () => {
        if (initialLimit <= max && finalLimit > 6) {
            setInitiaLimit(initialLimit-6)
            setFinalLimit(finalLimit-6)

        }
    }
    useEffect(() => {
            allImagesNfts()
       
    }, [])
    return (
        <div className='StakePageImagess pb-5'>
            <div className='container pt-3'>
                <div className='row d-flex justify-content-center align-items-center pb-3'>
                    <div className='col-md-12 col-11 pt-4 pb-4'>
                        <div className='row collections'>
                            <div className='col-md-4 offset-md-4 text-center d-flex align-items-center'>
                                <p className='stakepageP'>My NFT Collection</p>
                            </div>
                            <div className='col-md-3 d-flex justify-content-end'>
                                <button className='btn btnstake'>{acc ==="No Wallet" ? "Insatll metamask" :acc ==="Connect Wallet" ? acc  : acc ==="Connect to Rinkebey"? acc :acc.substring(0,5) + "..." + acc.substring(acc.length - 5)  }</button>
                            </div>
                        </div>

                        <div className='row d-flex justify-content-center mt-3'>
                            {imageArray.slice(initialLimit, finalLimit).map((items,index) => {
                                return (
                                    <div className='col-lg-3 col-md-5 mycollections p-2 m-2'>
                                        <img src={imageArray[index]} className='myCollectionsImage ' />
                                        {/* <span className='imageText text-white'  >&nbsp;&nbsp;{items.data.dna}</span> */}
                                        <div>
                                            <p className='collectionsText mt-3'>#20211 Tiger Master</p>
                                            <p className='collectionsTextSmall'>Common</p>
                                        </div>

                                        <div className="d-grid gap-2">
                                            <button className='btn btnStakePage' size="lg">
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
    )
}

export default MyCollection