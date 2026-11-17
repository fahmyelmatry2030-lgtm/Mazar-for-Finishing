import React from 'react'
import CostEstimator from '../../components/CostEstimator'
import SEO from '../../components/SEO'

const QuotationRequestPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-bg-primary">
      <SEO 
        title="طلب مقايسة تشطيبات" 
        description="احسب تكلفة تشطيب مساحتك بدقة واطلب مقايسة تفصيلية معتمدة من مهندسي مزار." 
      />
      <CostEstimator />
    </div>
  )
}

export default QuotationRequestPage
