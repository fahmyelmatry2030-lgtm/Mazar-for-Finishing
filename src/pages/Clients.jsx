import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, UserPlus, Mail, Phone, MoreVertical, Star, X } from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const Clients = () => {
  const [selectedClient, setSelectedClient] = useState(null)
  const clients = useStore(state => state.clients)
  const addClient = useStore(state => state.addClient)

  const handleAddClient = () => {
    addClient({
      name: 'عميل جديد (تجريبي)',
      email: 'new@client.com',
      phone: '+20 000 000 0000',
      projects: '٠',
      status: 'محتمل',
      rating: 0
    })
    toast.success('تمت إضافة العميل بنجاح!', {
      style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      iconTheme: { primary: '#D4AF37', secondary: '#1A1A1A' }
    })
  }
  
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2">قاعدة <span className="text-gold-gradient">العملاء</span></h1>
          <p className="text-text-secondary font-medium">إدارة العلاقات مع العملاء الحاليين والمحتملين.</p>
        </div>
        <button onClick={handleAddClient} className="btn-premium py-3 px-6 text-sm rounded-lg">
          <UserPlus size={20} className="ml-2" /> إضافة عميل جديد
        </button>
      </header>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="relative w-80">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="البحث عن العملاء..." 
              className="w-full bg-primary border border-white/10 rounded-lg py-2 pr-12 pl-4 text-sm focus:border-accent-gold outline-none font-bold"
            />
          </div>
          <div className="flex gap-4">
            <button className="text-sm font-bold text-text-secondary hover:text-white transition-colors">الكل</button>
            <button className="text-sm font-bold text-text-secondary hover:text-white transition-colors">نشط</button>
            <button className="text-sm font-bold text-text-secondary hover:text-white transition-colors">محتمل</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-text-secondary border-b border-white/5">
                <th className="p-6">اسم العميل</th>
                <th className="p-6">معلومات التواصل</th>
                <th className="p-6 text-center">المشاريع</th>
                <th className="p-6">الحالة</th>
                <th className="p-6">التقييم</th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {clients.map((client, i) => (
                <motion.tr 
                  key={client.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedClient(client)}
                  className="hover:bg-white/5 transition-all group cursor-pointer"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent-gold/20 text-accent-gold flex items-center justify-center font-bold">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Mail size={14} /> {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Phone size={14} /> {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="font-bold text-accent-gold">{client.projects}</span>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      client.status === 'نشط' ? 'bg-blue-500/10 text-blue-500' : 
                      client.status === 'محتمل' ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'
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
                  <td className="p-6 text-right">
                    <button className="text-text-secondary hover:text-white"><MoreVertical size={18} /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedClient && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel w-full max-w-xl rounded-2xl overflow-hidden shadow-premium border-white/10"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-start bg-bg-secondary">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent-gold/20 text-accent-gold flex items-center justify-center font-black text-2xl">
                    {selectedClient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">{selectedClient.name}</h2>
                    <p className="text-sm text-text-secondary font-bold mt-1">عميل {selectedClient.status}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedClient(null)} className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 space-y-6 bg-bg-primary">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-text-secondary font-bold mb-2 flex items-center gap-2"><Mail size={16}/> البريد الإلكتروني</p>
                    <p className="font-bold text-sm" dir="ltr">{selectedClient.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary font-bold mb-2 flex items-center gap-2"><Phone size={16}/> رقم الهاتف</p>
                    <p className="font-bold text-sm" dir="ltr">{selectedClient.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary font-bold mb-2 flex items-center gap-2"><Star size={16}/> التقييم</p>
                    <div className="flex gap-1 text-accent-gold">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={16} fill={idx < selectedClient.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary font-bold mb-2">إجمالي المشاريع</p>
                    <p className="font-black text-2xl text-accent-gold">{selectedClient.projects}</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-white/5">
                  <button className="flex-1 btn-premium py-3 text-sm rounded-lg">إرسال رسالة</button>
                  <button className="flex-1 border border-white/10 hover:border-accent-gold hover:text-accent-gold text-white font-bold py-3 text-sm rounded-lg transition-colors">تعديل الملف</button>
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
