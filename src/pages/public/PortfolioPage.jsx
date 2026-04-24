import React from 'react'
import Portfolio from '../../components/Portfolio'
import SEO from '../../components/SEO'
import { motion } from 'framer-motion'

const PortfolioPage = () => {
  return (
    <div className="pt-32 min-h-screen">
      <SEO 
        title="سابقة الأعمال" 
        description="استعرض أحدث مشاريع مزار للتشطيبات وتعرف على جودة التنفيذ في كل التفاصيل." 
      />
      <div className="container mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <span className="subtitle justify-center mb-6">سابقة أعمالنا</span>
          <h1 className="text-4xl md:text-6xl font-black">مشاريع <span className="text-gold-gradient italic">مميزة</span></h1>
        </motion.div>
      </div>
      <Portfolio />
    </div>
  )
}

export default PortfolioPage
