import React from 'react'
import Contact from '../../components/Contact'
import SEO from '../../components/SEO'
import { motion } from 'framer-motion'

const ContactPage = () => {
  return (
    <div className="pt-32 min-h-screen">
      <SEO 
        title="تواصل معنا" 
        description="نحن مستعدون للرد على استفساراتك ومساعدتك في مشروعك القادم." 
      />
      <div className="container mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <span className="subtitle justify-center mb-6">تواصل معنا</span>
          <h1 className="text-4xl md:text-6xl font-black">ابدأ <span className="text-gold-gradient italic">مشروعك</span></h1>
        </motion.div>
      </div>
      <Contact />
    </div>
  )
}

export default ContactPage
