import React, { useState } from 'react'
import Features from './Component/Features/Features'
import GameNFT from './Component/GameNFT/GameNFT'
import Homepage from './Component/Homepage/Homepage'
import MaskGroup from './Component/MaskGroup/MaskGroup'
import Menu from './Component/Menu/Menu'
import NFTImage from './Component/NFTImage/NFTImage'
import PlayToEarn from './Component/PlayToEarn/PlayToEarn'
import Roadmap from './Component/Roadmap/Roadmap'
import TokenDown from './Component/TokenDown/TokenDown'
import WaveImage from './Component/WaveImage/WaveImage'
import { withRouter } from "react-router-dom"
import Navbar from "./Component/Navbar/Navbar"
import Mintpage from './Mintpage'
import StakePages from './StakePages'
import Traitspage from './Traitspage'
import BreedPage from './BreedPage'
import MyCollectionPage from './MyCollectionPage'
import BuyPointPage from "./BuyPointPage"
import FooterDown from './Component/FooterDown/FooterDown';
import Footer from './Component/Footer/Footer';
function Home() {
  const [isChangeRoute, setIsChangeRoute] = useState("main")
  const ChnageMain = () => {
    setIsChangeRoute("main")
  }
  const ChangeStake = () => {
    setIsChangeRoute("StakePages")
  }
  const ChangeMint = () => {
    setIsChangeRoute("Mint")
  }
  const ChangeTraits = () => {
    setIsChangeRoute("Traits")
  }
  const ChangeBreed = () => {
    setIsChangeRoute("breed")
  }
  const ChangeMyCollection = () => {
    setIsChangeRoute("MyCollection")
  }
  const ChangeBuyPoint = () => {
    setIsChangeRoute("BuyPoint")
  }
  const Main = () => {
    return (
      <>
        <Navbar
          ChnageMain={ChnageMain}
          ChangeStake={ChangeStake}
          ChangeMint={ChangeMint}
          ChangeTraits={ChangeTraits}
          ChangeBreed={ChangeBreed}
          ChangeMyCollection={ChangeMyCollection}
          ChangeBuyPoint={ChangeBuyPoint}
        />
        <Menu />
        <Homepage />
        <TokenDown />
        <WaveImage />
        <Features />
        <MaskGroup />
        <PlayToEarn />
        <GameNFT />
        <NFTImage />
        <Roadmap />
        {/* <FooterDown />
        <Footer /> */}
      </>
    )
  }
  const Stake = () => {
    return (
      <>
        <Navbar
          ChnageMain={ChnageMain}
          ChangeStake={ChangeStake}
          ChangeMint={ChangeMint}
          ChangeTraits={ChangeTraits}
          ChangeBreed={ChangeBreed}
          ChangeMyCollection={ChangeMyCollection}
          ChangeBuyPoint={ChangeBuyPoint}
        />
        <StakePages />
        {/* <FooterDown />
        <Footer /> */}
      </>
    )
  }
  const Mint = () => {
    return (
      <>
        <Navbar
          ChnageMain={ChnageMain}
          ChangeStake={ChangeStake}
          ChangeMint={ChangeMint}
          ChangeTraits={ChangeTraits}
          ChangeBreed={ChangeBreed}
          ChangeMyCollection={ChangeMyCollection}
          ChangeBuyPoint={ChangeBuyPoint}
        />
        <Mintpage />
        {/* <FooterDown />
        <Footer /> */}
      </>
    )
  }
  const Traits = () => {
    return (
      <>
        <Navbar
          ChnageMain={ChnageMain}
          ChangeStake={ChangeStake}
          ChangeMint={ChangeMint}
          ChangeTraits={ChangeTraits}
          ChangeBreed={ChangeBreed}
          ChangeMyCollection={ChangeMyCollection}
          ChangeBuyPoint={ChangeBuyPoint}
        />
        <Traitspage />
        {/* <FooterDown />
        <Footer /> */}
      </>
    )
  }
  const Breed = () => {
    return (
      <>
        <Navbar
          ChnageMain={ChnageMain}
          ChangeStake={ChangeStake}
          ChangeMint={ChangeMint}
          ChangeTraits={ChangeTraits}
          ChangeBreed={ChangeBreed}
          ChangeMyCollection={ChangeMyCollection}
          ChangeBuyPoint={ChangeBuyPoint}
        />
        <BreedPage />
        {/* <FooterDown />
        <Footer /> */}
      </>
    )
  }
  const MyCollection = () => {
    return (
      <>
        <Navbar
          ChnageMain={ChnageMain}
          ChangeStake={ChangeStake}
          ChangeMint={ChangeMint}
          ChangeTraits={ChangeTraits}
          ChangeBreed={ChangeBreed}
          ChangeMyCollection={ChangeMyCollection}
          ChangeBuyPoint={ChangeBuyPoint}
        />
        <MyCollectionPage />
        {/* <FooterDown />
        <Footer /> */}
      </>
    )
  }
  const BuyPoint = () => {
    return (
      <>
        <Navbar
          ChnageMain={ChnageMain}
          ChangeStake={ChangeStake}
          ChangeMint={ChangeMint}
          ChangeTraits={ChangeTraits}
          ChangeBreed={ChangeBreed}
          ChangeMyCollection={ChangeMyCollection}
          ChangeBuyPoint={ChangeBuyPoint}
        />
        <BuyPointPage ChangeMint={ChangeMint}/>
        {/* <FooterDown />
        <Footer /> */}
      </>
    )
  }
  if (isChangeRoute == "main") {
    return (
      <div className='App'>
        <Main />
      </div>
    )
  } else if (isChangeRoute == "StakePages") {
    return (
      <div className='App'>
        <Stake />
      </div>
    )
  } else if (isChangeRoute == "Mint") {
    return (
      <div className='App'>
        <Mint />
      </div>
    )
  } else if (isChangeRoute == "Traits") {
    return (
      <div className='App'>
        <Traits />
      </div>
    )
  } else if (isChangeRoute == "breed") {
    return (
      <div className='App'>
        <Breed />
      </div>
    )
  } else if (isChangeRoute == "MyCollection") {
    return (
      <div className='App'>
        <MyCollection />
      </div>
    )
  }
  else if (isChangeRoute == "BuyPoint") {
    return (
      <div className='App'>
        <BuyPoint />
      </div>
    )
  }
}

export default Home