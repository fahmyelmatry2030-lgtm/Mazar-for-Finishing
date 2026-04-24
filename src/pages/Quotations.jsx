import React, { useState, useRef } from 'react'
import { FileText, CheckCircle, XCircle, Clock, Search, Filter, MoreVertical, Check, X, Printer, X as CloseIcon, Plus } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import { InvoiceTemplate } from '../components/InvoiceTemplate'
import { useStore } from '../store/useStore'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const Quotations = () => {
  const quotes = useStore(state => state.quotes)
  const updateQuoteStatus = useStore(state => state.updateQuoteStatus)
  const addQuote = useStore(state => state.addQuote)

  // Invoice Printing State
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const invoiceRef = useRef()

  const [newQuote, setNewQuote] = useState({
    client: '',
    type: 'تشطيب كامل',
    value: '',
    status: 'approved',
    date: new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(new Date())
  })

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `فاتورة_مزار_${selectedQuote?.client || 'عميل'}`,
  })

  const handleUpdateStatus = (id, status) => {
    updateQuoteStatus(id, status)
    toast.success('تم تحديث حالة العرض')
  }

  const handleSaveQuote = async (e) => {
    e.preventDefault()
    if (!newQuote.client || !newQuote.value) return
    await addQuote({
      ...newQuote,
      id: `QT-${Math.floor(1000 + Math.random() * 9000)}`
    })
    toast.success('تم إنشاء عرض السعر بنجاح!')
    setShowAddModal(false)
    setNewQuote({ client: '', type: 'تشطيب كامل', value: '', status: 'approved', date: new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(new Date()) })
  }

  const StatusBadge = ({ status }) => {
    switch(status) {
      case 'pending': return <span className="bg-orange-500/10 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-fit border border-orange-500/20"><Clock size={12}/> قيد المراجعة</span>
      case 'approved': return <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-fit border border-green-500/20"><CheckCircle size={12}/> تم القبول</span>
      case 'rejected': return <span className="bg-red-500/10 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-fit border border-red-500/20"><XCircle size={12}/> مرفوض</span>
      default: return null
    }
  }

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2 text-gray-900">عروض <span className="text-gold-gradient">الأسعار</span></h1>
          <p className="text-gray-900 font-black">متابعة طلبات التسعير الواردة واعتمادها.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="px-8 py-3 bg-accent-gold text-white font-black rounded-xl flex items-center gap-2 shadow-lg shadow-accent-gold/20 hover:bg-accent-gold-dark transition-all"
        >
          <Plus size={18} /> إنشاء عرض سعر
        </button>
      </header>

      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="relative w-80">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
            <input 
              type="text" 
              placeholder="ابحث برقم العرض أو العميل..." 
              className="w-full bg-white border border-gray-300 rounded-xl py-2.5 pr-12 pl-4 text-sm focus:border-accent-gold outline-none font-black text-gray-900"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-black text-gray-900 hover:bg-white transition-all">
            <Filter size={16} /> تصفية
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-gray-900 border-b border-gray-200">
                <th className="p-6 font-black">رقم العرض</th>
                <th className="p-6 font-black">العميل / المشروع</th>
                <th className="p-6 font-black">التاريخ</th>
                <th className="p-6 font-black">القيمة التقديرية</th>
                <th className="p-6 font-black">الحالة</th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotes.map((q, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-all group cursor-pointer">
                  <td className="p-6 font-black text-accent-gold">{q.id}</td>
                  <td className="p-6">
                    <p className="font-black text-gray-900">{q.client}</p>
                    <p className="text-sm text-gray-700 font-black">{q.type}</p>
                  </td>
                  <td className="p-6 text-sm font-black text-gray-900">{q.date}</td>
                  <td className="p-6 font-black text-gray-900">{q.value}</td>
                  <td className="p-6"><StatusBadge status={q.status} /></td>
                  <td className="p-6 text-left">
                    {q.status === 'pending' ? (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleUpdateStatus(q.id, 'approved')} className="p-2 bg-green-500/10 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition-all" title="قبول">
                          <Check size={18} />
                        </button>
                        <button onClick={() => handleUpdateStatus(q.id, 'rejected')} className="p-2 bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all" title="رفض">
                          <X size={18} />
                        </button>
                      </div>
                    ) : q.status === 'approved' ? (
                      <button 
                        onClick={() => setSelectedQuote(q)}
                        className="px-4 py-2 bg-accent-gold/10 text-accent-gold hover:bg-accent-gold hover:text-white rounded-xl font-black text-xs transition-all flex items-center gap-2 mr-auto border border-accent-gold/20"
                      >
                        <Printer size={16} /> الفاتورة
                      </button>
                    ) : (
                      <button className="text-gray-700 hover:text-accent-gold transition-colors"><MoreVertical size={18} /></button>
                    )}
                  </td>
                </tr>
              ))}
              {quotes.length === 0 && (
                <tr><td colSpan="6" className="p-10 text-center text-gray-900 font-black">لا توجد عروض أسعار مسجلة.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Quotation Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[4000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-black text-gray-900">إنشاء عرض سعر جديد</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-700 hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSaveQuote} className="p-8 space-y-5 bg-white">
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2">اسم العميل / المشروع</label>
                  <input 
                    type="text" required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                    value={newQuote.client} onChange={e => setNewQuote({...newQuote, client: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">القيمة التقديرية</label>
                    <input 
                      type="text" required
                      placeholder="٧٥,٠٠٠ ج.م"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={newQuote.value} onChange={e => setNewQuote({...newQuote, value: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">نوع العمل</label>
                    <input 
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={newQuote.type} onChange={e => setNewQuote({...newQuote, type: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-accent-gold text-white font-black py-4 rounded-xl shadow-xl shadow-accent-gold/20 hover:bg-accent-gold-dark transition-all mt-4">
                  إصدار عرض السعر
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invoice Preview Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl flex flex-col overflow-hidden border border-gray-300 shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-black text-gray-900">معاينة الفاتورة</h3>
              <div className="flex gap-3">
                <button 
                  onClick={handlePrint}
                  className="px-6 py-2 bg-accent-gold text-white font-black rounded-xl flex items-center gap-2 hover:bg-accent-gold-dark transition-all shadow-lg shadow-accent-gold/20"
                >
                  <Printer size={18} /> طباعة / تصدير PDF
                </button>
                <button 
                  onClick={() => setSelectedQuote(null)}
                  className="p-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 rounded-xl transition-all"
                >
                  <CloseIcon size={24} />
                </button>
              </div>
            </div>
            
            {/* Modal Body (Scrollable Print Preview) */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-100 flex justify-center print-container">
              {/* The actual component to print */}
              <div className="shadow-2xl overflow-hidden print-area">
                <InvoiceTemplate ref={invoiceRef} quote={selectedQuote} />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Quotations
