import React,{useState} from 'react'
import Mint from './Child-Component/Mint/Mint'
import Congratulation from './Child-Component/Mint/congratulation'
function Mintpage() {
  let [show,setShow] = useState(false)
  return (
    <div>
        <Mint setShow={setShow}/>
        <Congratulation show={show} setShow={setShow} />
    </div>
  )
}

export default Mintpage