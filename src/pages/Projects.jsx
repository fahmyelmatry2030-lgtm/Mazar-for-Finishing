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
    className="glass-panel p-5 rounded-xl border border-white/5 hover:border-accent-gold/30 cursor-grab active:cursor-grabbing group select-none transition-all"
    style={{ backdropFilter: 'blur(10px)' }}
  >
    <div className="flex justify-between items-start mb-3">
      <h4 className="font-black text-white group-hover:text-accent-gold transition-colors">{project.name}</h4>
      <GripVertical size={16} className="text-text-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
    </div>
    <p className="text-xs font-bold text-text-secondary mb-4">{project.client} · {project.type}</p>
    
    <div className="w-full h-1.5 bg-white/5 rounded-full mb-4">
      <div className="h-full bg-accent-gold rounded-full transition-all" style={{ width: `${project.progress}%` }} />
    </div>

    <div className="grid grid-cols-2 gap-2 text-[11px] text-text-secondary font-bold">
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
        toast.success(`تم نقل "${project.name}" إلى ${colId}`, {
          style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
          iconTheme: { primary: '#D4AF37', secondary: '#1A1A1A' }
        })
      }
    }
    setDraggedId(null)
    setDragOverCol(null)
  }

  const handleNewProject = () => {
    addProject({
      name: 'مشروع جديد',
      client: 'عميل جديد',
      type: 'سكني',
      status: 'التصميم',
      progress: 0,
      budget: '٠ ج.م',
      deadline: 'غير محدد',
      location: 'غير محدد'
    })
    toast.success('تم إنشاء المشروع بنجاح!', {
      style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
    })
  }

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2">لوحة <span className="text-gold-gradient">المشاريع</span></h1>
          <p className="text-text-secondary font-medium">اسحب وأفلت بطاقات المشروع لتحريكها بين مراحل العمل.</p>
        </div>
        <button onClick={handleNewProject} className="btn-premium py-3 px-6 text-sm rounded-lg flex items-center gap-2">
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
                background: dragOverCol === col.id ? col.bg : 'rgba(255,255,255,0.02)',
                border: `2px dashed ${dragOverCol === col.id ? col.color : 'rgba(255,255,255,0.06)'}`,
                minHeight: '520px'
              }}
            >
              {/* Column Header */}
              <div className="p-4 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: col.color }} />
                  <span className="font-black text-sm uppercase tracking-wider">{col.label}</span>
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
                  <div className="text-center py-12 text-text-secondary">
                    <p className="text-sm font-bold">أفلت هنا</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel w-full max-w-2xl rounded-2xl overflow-hidden shadow-premium"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-start bg-bg-secondary">
                <div>
                  <h2 className="text-2xl font-black mb-1">{selectedProject.name}</h2>
                  <p className="text-sm font-bold text-accent-gold">{selectedProject.status}</p>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 grid grid-cols-2 gap-6 bg-bg-primary">
                {[
                  { label: 'العميل', val: selectedProject.client },
                  { label: 'النوع', val: selectedProject.type },
                  { label: 'الميزانية', val: selectedProject.budget },
                  { label: 'الموعد النهائي', val: selectedProject.deadline },
                  { label: 'الموقع', val: selectedProject.location },
                  { label: 'نسبة الإنجاز', val: `${selectedProject.progress}%` },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <p className="text-xs font-black text-text-secondary uppercase tracking-widest mb-1">{label}</p>
                    <p className="font-bold text-white">{val}</p>
                  </div>
                ))}
              </div>

              <div className="px-8 pb-8 bg-bg-primary">
                <p className="text-xs font-black text-text-secondary uppercase tracking-widest mb-3">نقل إلى مرحلة</p>
                <div className="flex gap-3 flex-wrap">
                  {COLUMNS.map(col => (
                    <button
                      key={col.id}
                      disabled={selectedProject.status === col.id}
                      onClick={() => {
                        updateProjectStatus(selectedProject.id, col.id)
                        toast.success(`تم نقل "${selectedProject.name}" إلى ${col.id}`, {
                          style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
                        })
                        setSelectedProject(null)
                      }}
                      className="px-4 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background: selectedProject.status === col.id ? col.bg : 'rgba(255,255,255,0.05)',
                        color: col.color,
                        border: `1px solid ${col.color}30`
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
