import React,{useState} from 'react'
import Mint from './Child-Component/Mint/Mint'
import Congratulation from './Child-Component/Mint/congratulation'
function Mintpage() {
  let [show,setShow] = useState(false)
  let[number,setNumber]= useState();
  return (
    <div>
        <Mint setShow={setShow} setNumber={setNumber}/>
        <Congratulation  show={show} setShow={setShow} number={number} setNumber={setNumber} />
    </div>
  )
}

export default Mintpage