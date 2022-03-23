import React from 'react'
import BuyPoint from './Child-Component/BuyPoint/BuyPoint'

function BuyPointPage({ChangeMint}) {
  return (
    <div>
        <BuyPoint ChangeMint={ChangeMint}/>
    </div>
  )
}

export default BuyPointPage