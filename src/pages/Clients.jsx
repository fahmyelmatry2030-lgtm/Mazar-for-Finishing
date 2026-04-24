import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, UserPlus, Mail, Phone, MoreVertical, Star, X } from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const Clients = () => {
  const [selectedClient, setSelectedClient] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const clients = useStore(state => state.clients)
  const addClient = useStore(state => state.addClient)

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    projects: '٠',
    status: 'محتمل',
    rating: 5
  })

  const handleSaveClient = async (e) => {
    e.preventDefault()
    if (!newClient.name || !newClient.phone) return
    await addClient(newClient)
    toast.success('تمت إضافة العميل بنجاح!')
    setShowAddModal(false)
    setNewClient({ name: '', email: '', phone: '', projects: '٠', status: 'محتمل', rating: 5 })
  }
  
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2 text-gray-900">قاعدة <span className="text-gold-gradient">العملاء</span></h1>
          <p className="text-gray-900 font-black">إدارة العلاقات مع العملاء الحاليين والمحتملين.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="px-8 py-3 bg-accent-gold text-white font-black rounded-xl flex items-center gap-2 shadow-lg shadow-accent-gold/20 hover:bg-accent-gold-dark transition-all"
        >
          <UserPlus size={20} className="ml-2" /> إضافة عميل جديد
        </button>
      </header>

      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="relative w-80">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
            <input 
              type="text" 
              placeholder="البحث عن العملاء..." 
              className="w-full bg-white border border-gray-300 rounded-xl py-2.5 pr-12 pl-4 text-sm focus:border-accent-gold outline-none font-black text-gray-900"
            />
          </div>
          <div className="flex gap-4">
            <button className="text-sm font-black text-gray-900 hover:text-accent-gold transition-colors">الكل</button>
            <button className="text-sm font-black text-gray-700 hover:text-accent-gold transition-colors">نشط</button>
            <button className="text-sm font-black text-gray-700 hover:text-accent-gold transition-colors">محتمل</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-gray-900 border-b border-gray-200">
                <th className="p-6 font-black">اسم العميل</th>
                <th className="p-6 font-black">معلومات التواصل</th>
                <th className="p-6 text-center font-black">المشاريع</th>
                <th className="p-6 font-black">الحالة</th>
                <th className="p-6 font-black">التقييم</th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.map((client, i) => (
                <motion.tr 
                  key={client.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedClient(client)}
                  className="hover:bg-gray-50 transition-all group cursor-pointer"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent-gold/20 text-accent-gold flex items-center justify-center font-black">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-black text-gray-900">{client.name}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-900 font-black">
                        <Mail size={14} className="text-accent-gold" /> {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-900 font-black">
                        <Phone size={14} className="text-accent-gold" /> {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="font-black text-accent-gold">{client.projects}</span>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      client.status === 'نشط' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' : 
                      client.status === 'محتمل' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' : 'bg-green-500/10 text-green-600 border-green-500/20'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-1 text-accent-gold">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={14} fill={idx < client.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </td>
                  <td className="p-6 text-left">
                    <button className="text-gray-700 hover:text-accent-gold"><MoreVertical size={18} /></button>
                  </td>
                </motion.tr>
              ))}
              {clients.length === 0 && (
                <tr><td colSpan="6" className="p-10 text-center text-gray-900 font-black">لا يوجد عملاء مسجلين حالياً.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
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
                <h3 className="text-xl font-black text-gray-900">إضافة عميل جديد</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-700 hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSaveClient} className="p-8 space-y-5">
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2">اسم العميل</label>
                  <input 
                    type="text" required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                    value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">رقم الهاتف</label>
                    <input 
                      type="text" required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">البريد الإلكتروني</label>
                    <input 
                      type="email"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2">حالة العميل</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                    value={newClient.status} onChange={e => setNewClient({...newClient, status: e.target.value})}
                  >
                    <option>محتمل</option>
                    <option>نشط</option>
                    <option>مكتمل</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-accent-gold text-white font-black py-4 rounded-xl shadow-xl shadow-accent-gold/20 hover:bg-accent-gold-dark transition-all mt-4">
                  حفظ بيانات العميل
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Client Detail Modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedClient(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-gray-100"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent-gold/20 text-accent-gold flex items-center justify-center font-black text-2xl">
                    {selectedClient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{selectedClient.name}</h2>
                    <p className="text-sm text-accent-gold font-black mt-1">عميل {selectedClient.status}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedClient(null)} className="p-2 text-gray-700 hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 space-y-6 bg-white">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-black text-gray-700 uppercase tracking-widest mb-2 flex items-center gap-2"><Mail size={16} className="text-accent-gold"/> البريد الإلكتروني</p>
                    <p className="font-black text-gray-900" dir="ltr">{selectedClient.email || 'غير محدد'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-700 uppercase tracking-widest mb-2 flex items-center gap-2"><Phone size={16} className="text-accent-gold"/> رقم الهاتف</p>
                    <p className="font-black text-gray-900" dir="ltr">{selectedClient.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-700 uppercase tracking-widest mb-2 flex items-center gap-2"><Star size={16} className="text-accent-gold"/> التقييم</p>
                    <div className="flex gap-1 text-accent-gold">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={16} fill={idx < selectedClient.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-700 uppercase tracking-widest mb-2">إجمالي المشاريع</p>
                    <p className="font-black text-2xl text-accent-gold">{selectedClient.projects}</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-100">
                  <button className="flex-1 bg-accent-gold text-white font-black py-3 rounded-xl hover:bg-accent-gold-dark transition-all">إرسال رسالة</button>
                  <button className="flex-1 border border-gray-200 hover:border-accent-gold hover:text-accent-gold text-gray-900 font-black py-3 rounded-xl transition-all">تعديل الملف</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Clients
