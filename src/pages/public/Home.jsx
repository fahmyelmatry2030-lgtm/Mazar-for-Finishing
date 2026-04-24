import React from 'react'
import Hero from '../../components/Hero'
import Stats from '../../components/Stats'
import Services from '../../components/Services'
import Portfolio from '../../components/Portfolio'
import CostEstimator from '../../components/CostEstimator'
import SEO from '../../components/SEO'

const Home = () => {
  return (
    <>
      <SEO 
        title="الرئيسية" 
        description="مزار للتشطيبات المعمارية - نصيغ تجربة معمارية فاخرة تعكس شخصيتك بأعلى معايير الجودة العالمية." 
      />
      <Hero />
      <Stats />
      {/* For Home page, we show summarized versions or full sections if preferred */}
      <Services />
      <Portfolio />
      <CostEstimator />
    </>
  )
}

export default Home
