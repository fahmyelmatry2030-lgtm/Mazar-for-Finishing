import React, { useState } from 'react'
import { Plus, MapPin, Calendar, DollarSign, X, GripVertical, Trash2, Edit3 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const COLUMNS = [
  { id: 'التصميم', label: 'التصميم', color: '#a855f7', bg: 'rgba(168,85,247,0.08)' },
  { id: 'التوريد', label: 'التوريد', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
  { id: 'التنفيذ', label: 'التنفيذ', color: '#D4AF37', bg: 'rgba(212,175,55,0.08)' },
  { id: 'التسليم', label: 'التسليم', color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
]

const ProjectCard = ({ project, onDragStart, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    draggable
    onDragStart={(e) => onDragStart(e, project.id)}
    onClick={onClick}
    className="bg-white shadow-sm border border-gray-200 p-5 rounded-xl hover:border-accent-gold/30 cursor-grab active:cursor-grabbing group select-none transition-all"
  >
    <div className="flex justify-between items-start mb-3">
      <h4 className="font-black text-gray-900 group-hover:text-accent-gold transition-colors">{project.name}</h4>
      <GripVertical size={16} className="text-gray-700 opacity-50 group-hover:opacity-100 transition-opacity" />
    </div>
    <p className="text-xs font-black text-gray-700 mb-4">{project.client} · {project.type}</p>
    
    <div className="w-full h-1.5 bg-gray-50 rounded-full mb-4">
      <div className="h-full bg-accent-gold rounded-full transition-all" style={{ width: `${project.progress || 0}%` }} />
    </div>

    <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-900 font-black">
      <div className="flex items-center gap-1.5"><DollarSign size={12} className="text-accent-gold" />{project.budget}</div>
      <div className="flex items-center gap-1.5"><Calendar size={12} className="text-accent-gold" />{project.deadline}</div>
      <div className="flex items-center gap-1.5 col-span-2"><MapPin size={12} className="text-accent-gold" />{project.location}</div>
    </div>
  </motion.div>
)

const Projects = () => {
  const projects = useStore(state => state.projects)
  const addProject = useStore(state => state.addProject)
  const updateProject = useStore(state => state.updateProject)
  const removeProject = useStore(state => state.removeProject)
  const updateProjectStatus = useStore(state => state.updateProjectStatus)
  
  const [draggedId, setDraggedId] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [dragOverCol, setDragOverCol] = useState(null)
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    type: 'سكني',
    budget: '',
    deadline: '',
    location: '',
    status: 'التصميم',
    progress: 0
  })

  const handleDragStart = (e, id) => {
    setDraggedId(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, colId) => {
    e.preventDefault()
    setDragOverCol(colId)
  }

  const handleDrop = (e, colId) => {
    e.preventDefault()
    if (draggedId !== null) {
      const project = projects.find(p => p.id === draggedId)
      if (project && project.status !== colId) {
        updateProjectStatus(draggedId, colId)
        toast.success(`تم نقل "${project.name}" إلى ${colId}`)
      }
    }
    setDraggedId(null)
    setDragOverCol(null)
  }

  const resetForm = () => {
    setFormData({ name: '', client: '', type: 'سكني', budget: '', deadline: '', location: '', status: 'التصميم', progress: 0 })
    setIsEditing(false)
    setShowAddModal(false)
  }

  const handleOpenEdit = (project) => {
    setFormData(project)
    setIsEditing(true)
    setShowAddModal(true)
    setSelectedProject(null) // close detail modal if open
  }

  const handleSaveProject = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.client) return
    
    if (isEditing) {
      await updateProject(formData.id, formData)
      toast.success('تم تحديث بيانات المشروع!')
    } else {
      await addProject(formData)
      toast.success('تم إنشاء المشروع بنجاح!')
    }
    resetForm()
  }

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء.')) {
      await removeProject(id)
      toast.success('تم حذف المشروع')
      setSelectedProject(null)
    }
  }

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2 text-gray-900">لوحة <span className="text-gold-gradient">المشاريع</span></h1>
          <p className="text-gray-900 font-black">إدارة وتتبع سير العمل في مشاريعك الحالية.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowAddModal(true); }} 
          className="px-8 py-3 bg-accent-gold text-white font-black rounded-xl flex items-center gap-2 shadow-lg shadow-accent-gold/20 hover:bg-accent-gold-dark transition-all"
        >
          <Plus size={20} /> مشروع جديد
        </button>
      </header>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COLUMNS.map(col => {
          const colProjects = projects.filter(p => p.status === col.id)
          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={(e) => handleDrop(e, col.id)}
              className="rounded-2xl transition-all duration-200"
              style={{
                background: dragOverCol === col.id ? col.bg : 'rgba(0,0,0,0.02)',
                border: `2px dashed ${dragOverCol === col.id ? col.color : 'rgba(0,0,0,0.05)'}`,
                minHeight: '520px'
              }}
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white/50 rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: col.color }} />
                  <span className="font-black text-sm uppercase tracking-wider text-gray-900">{col.label}</span>
                </div>
                <span className="text-xs font-black px-2 py-1 rounded-full" style={{ background: col.bg, color: col.color }}>
                  {colProjects.length}
                </span>
              </div>

              <div className="p-3 space-y-3">
                <AnimatePresence>
                  {colProjects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onDragStart={handleDragStart}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))}
                </AnimatePresence>
                {colProjects.length === 0 && (
                  <div className="text-center py-12 text-gray-700">
                    <p className="text-sm font-black">أفلت هنا</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add/Edit Project Modal */}
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
              className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-black text-gray-900">{isEditing ? 'تعديل بيانات المشروع' : 'إضافة مشروع جديد'}</h3>
                <button onClick={resetForm} className="text-gray-700 hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSaveProject} className="p-8 space-y-5 bg-white">
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <label className="block text-sm font-black text-gray-700 mb-2">اسم المشروع</label>
                    <input 
                      type="text" required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">العميل</label>
                    <input 
                      type="text" required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">النوع</label>
                    <select 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
                    >
                      <option>سكني</option>
                      <option>تجاري</option>
                      <option>إداري</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">الميزانية</label>
                    <input 
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">الموعد النهائي</label>
                    <input 
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-black text-gray-700 mb-2">الموقع</label>
                    <input 
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-accent-gold text-white font-black py-4 rounded-xl shadow-xl shadow-accent-gold/20 hover:bg-accent-gold-dark transition-all mt-4">
                  {isEditing ? 'حفظ التعديلات' : 'إنشاء المشروع الآن'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-gray-100"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-1">{selectedProject.name}</h2>
                  <p className="text-sm font-black text-accent-gold">{selectedProject.status}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenEdit(selectedProject)} className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all" title="تعديل">
                    <Edit3 size={20} />
                  </button>
                  <button onClick={() => handleDelete(selectedProject.id)} className="p-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all" title="حذف">
                    <Trash2 size={20} />
                  </button>
                  <button onClick={() => setSelectedProject(null)} className="p-2.5 text-gray-700 hover:text-gray-900 transition-colors">
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-8 grid grid-cols-2 gap-8 bg-white text-gray-900">
                {[
                  { label: 'العميل', val: selectedProject.client },
                  { label: 'النوع', val: selectedProject.type },
                  { label: 'الميزانية', val: selectedProject.budget },
                  { label: 'الموعد النهائي', val: selectedProject.deadline },
                  { label: 'الموقع', val: selectedProject.location },
                  { label: 'نسبة الإنجاز', val: `${selectedProject.progress || 0}%` },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <p className="text-xs font-black text-gray-700 uppercase tracking-widest mb-1">{label}</p>
                    <p className="font-black text-gray-900 text-lg">{val}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects
