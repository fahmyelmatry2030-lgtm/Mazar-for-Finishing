import React from 'react'
import Hero from '../../components/Hero'
import Stats from '../../components/Stats'
import Services from '../../components/Services'
import Process from '../../components/Process'
import Portfolio from '../../components/Portfolio'
import CostEstimator from '../../components/CostEstimator'
import ConsultationBooking from '../../components/ConsultationBooking'
import Contact from '../../components/Contact'
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
      <Services />
      <Process />
      <Portfolio />
      <CostEstimator />
      <ConsultationBooking />
      <Contact />
    </>
  )
}

export default Home
