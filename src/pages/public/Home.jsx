import React from 'react'
import Hero from '../../components/Hero'
import Stats from '../../components/Stats'
import Services from '../../components/Services'
import Portfolio from '../../components/Portfolio'

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      {/* For Home page, we show summarized versions or full sections if preferred */}
      <Services />
      <Portfolio />
    </>
  )
}

export default Home
