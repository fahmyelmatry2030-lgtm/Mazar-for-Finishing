import React from 'react'
import ConsultationBooking from '../../components/ConsultationBooking'
import SEO from '../../components/SEO'

const ConsultationPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-bg-primary">
      <SEO 
        title="حجز استشارة هندسية" 
        description="احجز استشارتك الهندسية مع استشاريي التصميم الداخلي والتنفيذ المعماري في مزار." 
      />
      <ConsultationBooking />
    </div>
  )
}

export default ConsultationPage
