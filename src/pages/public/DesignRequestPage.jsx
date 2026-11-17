import React from 'react'
import DesignRequest from '../../components/DesignRequest'
import SEO from '../../components/SEO'

const DesignRequestPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-bg-primary">
      <SEO 
        title="طلب عمل تصميم هندسي" 
        description="أرسل مخطط مساحتك ومتطلباتك للحصول على تصميم داخلي أو معماري 3D ومخططات تنفيذية متكاملة." 
      />
      <DesignRequest />
    </div>
  )
}

export default DesignRequestPage
