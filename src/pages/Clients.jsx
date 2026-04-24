import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, UserPlus, Mail, Phone, MoreVertical, Star, X, Trash2, Edit3 } from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const Clients = () => {
  const [selectedClient, setSelectedClient] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  
  const clients = useStore(state => state.clients)
  const addClient = useStore(state => state.addClient)
  const updateClient = useStore(state => state.updateClient)
  const removeClient = useStore(state => state.removeClient)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projects: '٠',
    status: 'محتمل',
    rating: 5
  })

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', projects: '٠', status: 'محتمل', rating: 5 })
    setIsEditing(false)
    setShowAddModal(false)
  }

  const handleOpenEdit = (client, e) => {
    if (e) e.stopPropagation()
    setFormData(client)
    setIsEditing(true)
    setShowAddModal(true)
    setSelectedClient(null)
  }

  const handleSaveClient = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return
    
    if (isEditing) {
      await updateClient(formData.id, formData)
      toast.success('تم تحديث بيانات العميل!')
    } else {
      await addClient(formData)
      toast.success('تمت إضافة العميل بنجاح!')
    }
    resetForm()
  }

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation()
    if (window.confirm('هل أنت متأكد من حذف هذا العميل؟ لا يمكن التراجع.')) {
      await removeClient(id)
      toast.success('تم حذف العميل')
      setSelectedClient(null)
    }
  }
  
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2 text-gray-900">قاعدة <span className="text-gold-gradient">العملاء</span></h1>
          <p className="text-gray-900 font-black">إدارة العلاقات مع العملاء الحاليين والمحتملين.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowAddModal(true); }} 
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-gray-900 border-b border-gray-200">
                <th className="p-6 font-black">اسم العميل</th>
                <th className="p-6 font-black">معلومات التواصل</th>
                <th className="p-6 text-center font-black">المشاريع</th>
                <th className="p-6 font-black">الحالة</th>
                <th className="p-6 font-black text-left">التحكم</th>
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
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${
                      client.status === 'نشط' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' : 
                      client.status === 'محتمل' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' : 'bg-green-500/10 text-green-600 border-green-500/20'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-6 text-left">
                    <div className="flex justify-end gap-2">
                      <button onClick={(e) => handleOpenEdit(client, e)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={18} /></button>
                      <button onClick={(e) => handleDelete(client.id, e)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {clients.length === 0 && (
                <tr><td colSpan="5" className="p-10 text-center text-gray-900 font-black">لا يوجد عملاء مسجلين.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Client Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[4000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={resetForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-black text-gray-900">{isEditing ? 'تعديل بيانات العميل' : 'إضافة عميل جديد'}</h3>
                <button onClick={resetForm} className="text-gray-700 hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSaveClient} className="p-8 space-y-5">
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2">اسم العميل</label>
                  <input 
                    type="text" required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">رقم الهاتف</label>
                    <input 
                      type="text" required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">البريد الإلكتروني</label>
                    <input 
                      type="email"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2">حالة العميل</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                    value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
                  >
                    <option>محتمل</option>
                    <option>نشط</option>
                    <option>مكتمل</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-accent-gold text-white font-black py-4 rounded-xl shadow-xl shadow-accent-gold/20 hover:bg-accent-gold-dark transition-all mt-4">
                  {isEditing ? 'حفظ التعديلات' : 'حفظ بيانات العميل'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Clients
