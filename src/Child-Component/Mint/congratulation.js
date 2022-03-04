import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import CloseButton from 'react-bootstrap/CloseButton'
import "./congratulation.css"
import axios from 'axios';
import { nftContratAddress, nftContractAbi } from "../../Component/Utils/Nft"
import {useSelector, useDispatch} from 'react-redux';
function MyVerticallyCenteredModal(props) {
    console.log("Prpos",props);

    let [imageArray,setImageArray] = useState([]);
    
    let {acc} = useSelector(state =>state.connectWallet)


    
    const allImagesNfts=async()=>{
        // console.log("ACC=",acc)
        if (acc == "No Wallet") {
            console.log("wallet");
        }
        else if (acc == "Wrong Network") {
            console.log("wallet");

        }else if (acc=="Connect Wallet"){
            console.log("Connect Wallet");
        } 
        
        else {
            console.log("Inside")
                        // const web3 = window.web3;
                        // let nftContractOf = new web3.eth.Contract(nftContractAbi, nftContratAddress);
                        let simplleArray =[];
                    for( let i=1; i<=2; i++){
                        try{
                          let res = await axios.get(`https://gateway.pinata.cloud/ipfs/QmPQxoBcxfkDc28mDSxXABkC74HTimND6ESNhubqrNnuGz/${i}.json`)
                          console.log("Indexes", i);
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

    // const get = async () => {
    //     console.log("Bilal")
    //     // let newarr = [11,23,32,12,22,1,2];
    //     let simplearray = []
    //     for (let i = 0; i <= 12; i++) {
    //         console.log("Enterimg Loop", i)
    //         const web3 = window.web3;
    //         let nftContractOf = new web3.eth.Contract(nftContractAbi, nftContratAddress);
    //         let inputId = await nftContractOf.methods.mintids(i).call();
    //         // // newarr.push(Inputid)
    //         try {
    //             let finalapiData = await axios.get(`https://gateway.pinata.cloud/ipfs/QmPQxoBcxfkDc28mDSxXABkC74HTimND6ESNhubqrNnuGz/${inputId}.json`)
    //             console.log("finalapiData ", finalapiData)
    //         } catch (e) {
    //             console.log("Error while Fetching api", e)
    //         }


    //         // finalapiData = finalapiData.data;
    //         // let imageUrl = finalapiData.image;
    //         // console.log("api data,", finalapiData);
    //         // console.log("imageUrl", imageUrl);
    //         // console.log("newarr", Inputid);
    //         // simplearray.push(imageUrl);
    //         // setImage(simplearray);
    //         // newarr.push(Inputid)
    //     }
    // }
    useEffect(() => {
        setInterval(()=>{
            allImagesNfts()
        },10000)
        
    })
    return (


        <div>

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='d-flex StakePageImage'>
                <Modal.Header className='StakePageImage'>
                    <div className='container Stakeboxs pb-4 '>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-md-12 d-flex justify-content-end mt-2'>
                                <CloseButton onClick={props.onHide} variant="white" />
                            </div>
                        </div>
                        <div className='row' >
                            <div className='col-md-8'>
                                <img src='https://i.ibb.co/SJLFXL2/Vector10.png' className='Congratimage' />
                            </div>
                            <div className='col-md-8'>
                                <img src='https://i.ibb.co/NmqhYRk/Group-504.png' className='Congratimage' />
                            </div>

                            <div className='col-md-2 offset-md-2 d-flex justify-content-end'>
                                <button className='btn btnstake'>{acc ==="No Wallet" ? "Insatll metamask" :acc ==="Connect Wallet" ? acc  : acc ==="Connect to Rinkebey"? acc :acc.substring(0,5) + "..." + acc.substring(acc.length - 5)  }</button>
                            </div>
                        </div>
                        <div>
                            <p className='simpleText'>
                                {props.number}
                            </p>
                        </div>
                        <div className='cardImg'  >
                            {/* <img alt='NftImage' src='https://i.ibb.co/Sdz30VC/Group-505.png' className='underimg' width="50%" /> */}

                            <div className="uperimg row d-flex justify-content-center">
                                {
                                    imageArray.map((items, index) => {

                                        return (
                                            <div className='col-lg-3 col-md-5 p-2 m-2'>
                                                <img src={imageArray[index]} className="mintImage45" />

                                            </div>
                                        )
                                    })
                                }

                                {/* <img src="https://i.ibb.co/BPqHrwB/tiger-1.jpg" className="mintImage45" /> */}
                            </div>
                        </div>

                        <div className="btnmodelhere">
                            <button className='undermodelbtn me-2'>BREED</button>
                            <button className='undermodelbtn2'>ACCEPT</button>
                        </div>
                    </div>
                </Modal.Header>
            </Modal >
        </div>
    );
}

function congratulation({ show, setShow, number, setNumber }) {
    console.log("My Show Console",show)
    return (
        <div className='container'>

            <MyVerticallyCenteredModal
                number={number}
                setNumber={setNumber}
                show={show}
                onHide={() => setShow(false)}
            />
        </div>
    )
}

export default congratulation