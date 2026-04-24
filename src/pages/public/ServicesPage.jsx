import React from 'react'
import Services from '../../components/Services'
import Process from '../../components/Process'
import { motion } from 'framer-motion'

const ServicesPage = () => {
  return (
    <div className="pt-32 min-h-screen">
      <div className="container mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <span className="subtitle justify-center mb-6">ماذا نقدم</span>
          <h1 className="text-4xl md:text-6xl font-black">خدماتنا <span className="text-gold-gradient italic">المتكاملة</span></h1>
        </motion.div>
      </div>
      <Services />
      <Process />
    </div>
  )
}

export default ServicesPage
