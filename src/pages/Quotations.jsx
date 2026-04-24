import React from 'react'
import { FileText, CheckCircle, XCircle, Clock, Search, Filter, MoreVertical, Check, X } from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const Quotations = () => {
  const quotes = useStore(state => state.quotes)
  const updateQuoteStatus = useStore(state => state.updateQuoteStatus)

  const handleUpdateStatus = (id, status) => {
    updateQuoteStatus(id, status)
    toast.success('تم تحديث حالة العرض', {
      style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      iconTheme: { primary: '#D4AF37', secondary: '#1A1A1A' }
    })
  }

  const StatusBadge = ({ status }) => {
    switch(status) {
      case 'pending': return <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-fit"><Clock size={12}/> قيد المراجعة</span>
      case 'approved': return <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-fit"><CheckCircle size={12}/> تم القبول</span>
      case 'rejected': return <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-fit"><XCircle size={12}/> مرفوض</span>
      default: return null
    }
  }

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2">عروض <span className="text-gold-gradient">الأسعار</span></h1>
          <p className="text-text-secondary font-medium">متابعة طلبات التسعير الواردة واعتمادها.</p>
        </div>
        <button className="btn-premium py-3 px-6 text-sm rounded-lg flex items-center gap-2">
          <FileText size={18} /> إنشاء عرض سعر
        </button>
      </header>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="relative w-80">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="ابحث برقم العرض أو العميل..." 
              className="w-full bg-primary border border-white/10 rounded-lg py-2 pr-12 pl-4 text-sm focus:border-accent-gold outline-none font-bold"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-sm font-bold text-text-secondary hover:text-white transition-all">
            <Filter size={16} /> تصفية
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-text-secondary border-b border-white/5">
                <th className="p-6">رقم العرض</th>
                <th className="p-6">العميل / المشروع</th>
                <th className="p-6">التاريخ</th>
                <th className="p-6">القيمة التقديرية</th>
                <th className="p-6">الحالة</th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {quotes.map((q, i) => (
                <tr key={i} className="hover:bg-white/5 transition-all group cursor-pointer">
                  <td className="p-6 font-black text-accent-gold">{q.id}</td>
                  <td className="p-6">
                    <p className="font-bold">{q.client}</p>
                    <p className="text-sm text-text-secondary">{q.type}</p>
                  </td>
                  <td className="p-6 text-sm font-bold">{q.date}</td>
                  <td className="p-6 font-black">{q.value}</td>
                  <td className="p-6"><StatusBadge status={q.status} /></td>
                  <td className="p-6 text-left">
                    {q.status === 'pending' ? (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleUpdateStatus(q.id, 'approved')} className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded transition-colors" title="قبول">
                          <Check size={16} />
                        </button>
                        <button onClick={() => handleUpdateStatus(q.id, 'rejected')} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors" title="رفض">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <button className="text-text-secondary hover:text-white transition-colors"><MoreVertical size={18} /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Quotations
