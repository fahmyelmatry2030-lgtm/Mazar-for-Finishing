import React, { useState } from 'react'
import { Plus, MapPin, Calendar, DollarSign, X, GripVertical } from 'lucide-react'
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
  const updateProjectStatus = useStore(state => state.updateProjectStatus)
  
  const [draggedId, setDraggedId] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [dragOverCol, setDragOverCol] = useState(null)
  
  // Form State
  const [showAddModal, setShowAddModal] = useState(false)
  const [newProject, setNewProject] = useState({
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
    e.dataTransfer.dropEffect = 'move'
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

  const handleSaveProject = async (e) => {
    e.preventDefault()
    if (!newProject.name || !newProject.client) return
    await addProject(newProject)
    toast.success('تم إنشاء المشروع بنجاح!')
    setShowAddModal(false)
    setNewProject({
      name: '',
      client: '',
      type: 'سكني',
      budget: '',
      deadline: '',
      location: '',
      status: 'التصميم',
      progress: 0
    })
  }

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2 text-gray-900">لوحة <span className="text-gold-gradient">المشاريع</span></h1>
          <p className="text-gray-900 font-black">اسحب وأفلت بطاقات المشروع لتحريكها بين مراحل العمل.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)} 
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
              {/* Column Header */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white/50 rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: col.color }} />
                  <span className="font-black text-sm uppercase tracking-wider text-gray-900">{col.label}</span>
                </div>
                <span className="text-xs font-black px-2 py-1 rounded-full" style={{ background: col.bg, color: col.color }}>
                  {colProjects.length}
                </span>
              </div>

              {/* Cards */}
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

      {/* Add Project Modal */}
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
              className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-black text-gray-900">إضافة مشروع جديد</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-700 hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSaveProject} className="p-8 space-y-5 bg-white">
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <label className="block text-sm font-black text-gray-700 mb-2">اسم المشروع</label>
                    <input 
                      type="text" required
                      placeholder="مثال: فيلا التجمع الخامس"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">العميل</label>
                    <input 
                      type="text" required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={newProject.client} onChange={e => setNewProject({...newProject, client: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">النوع</label>
                    <select 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={newProject.type} onChange={e => setNewProject({...newProject, type: e.target.value})}
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
                      placeholder="١٥٠,٠٠٠ ج.م"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={newProject.budget} onChange={e => setNewProject({...newProject, budget: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">الموعد النهائي</label>
                    <input 
                      type="text"
                      placeholder="٢٠ مايو ٢٠٢٦"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={newProject.deadline} onChange={e => setNewProject({...newProject, deadline: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-black text-gray-700 mb-2">الموقع</label>
                    <input 
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-black outline-none focus:border-accent-gold transition-all text-gray-900"
                      value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-accent-gold text-white font-black py-4 rounded-xl shadow-xl shadow-accent-gold/20 hover:bg-accent-gold-dark transition-all mt-4">
                  إنشاء المشروع الآن
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
                <button onClick={() => setSelectedProject(null)} className="text-gray-700 hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
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

              <div className="px-8 pb-8 bg-white">
                <p className="text-xs font-black text-gray-700 uppercase tracking-widest mb-4">نقل إلى مرحلة أخرى</p>
                <div className="flex gap-3 flex-wrap">
                  {COLUMNS.map(col => (
                    <button
                      key={col.id}
                      disabled={selectedProject.status === col.id}
                      onClick={() => {
                        updateProjectStatus(selectedProject.id, col.id)
                        toast.success(`تم نقل المشروع إلى ${col.id}`)
                        setSelectedProject(null)
                      }}
                      className="px-5 py-2.5 rounded-xl text-sm font-black transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-gray-100"
                      style={{
                        background: selectedProject.status === col.id ? col.bg : 'rgba(0,0,0,0.02)',
                        color: col.color,
                        borderColor: selectedProject.status === col.id ? col.color + '40' : ''
                      }}
                    >
                      {col.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects
