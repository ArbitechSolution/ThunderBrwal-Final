import React from 'react'
import './Spinner.css'
import Spinner from 'react-bootstrap/Spinner'
export default function Spinners() {
    return (
  <div className='body2'>
        <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="light" role="status" size="lg" style={{width:"8rem", height:"8rem"}}>
  <span className="visually-hidden">Loading...</span>
</Spinner>
  {/* <div className="spinner-border"  style={{width:"8rem", height:"8rem"}} role="status">
    <span className="visually-hidden" variant="light">Loading...</span>
  </div> */}
</div>
             {/* <div className="container2 rotate" style={{"--size":"12rem"}} >
                 <div className="circle primary rotate-reverse"></div>
                 <div className="circle tertiary rotate-reverse"></div>
             </div> */}
           
        </div>
    )
}