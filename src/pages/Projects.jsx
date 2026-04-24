import React, { useState } from 'react'
import { Plus, Filter, MoreHorizontal, Calendar, DollarSign, MapPin, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const ProjectCard = ({ project, onClick }) => (
  <div onClick={onClick} className="glass-panel p-6 rounded-2xl border-white/5 hover:border-accent-gold/50 cursor-pointer transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div>
        <span className="text-[10px] uppercase tracking-widest text-accent-gold font-bold mb-1 block">{project.type}</span>
        <h3 className="text-xl font-black group-hover:text-accent-gold transition-colors">{project.name}</h3>
      </div>
      <button className="text-text-secondary hover:text-white"><MoreHorizontal size={20} /></button>
    </div>

    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-3 text-text-secondary text-sm font-bold">
        <MapPin size={16} className="text-accent-gold" />
        {project.location}
      </div>
      <div className="flex items-center gap-3 text-text-secondary text-sm font-bold">
        <Calendar size={16} className="text-accent-gold" />
        الموعد النهائي: {project.deadline}
      </div>
      <div className="flex items-center gap-3 text-text-secondary text-sm font-bold">
        <DollarSign size={16} className="text-accent-gold" />
        الميزانية: {project.budget}
      </div>
    </div>

    <div className="pt-6 border-t border-white/5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-text-secondary uppercase tracking-widest font-bold">التقدم</span>
        <span className="text-xs font-black text-accent-gold">{project.progress}%</span>
      </div>
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-accent-gold rounded-full transition-all duration-1000" 
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
    </div>
  </div>
)

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const projects = useStore(state => state.projects)
  const addProject = useStore(state => state.addProject)

  const handleNewProject = () => {
    addProject({
      name: 'مشروع جديد (تجريبي)',
      client: 'عميل جديد',
      type: 'سكني',
      status: 'تصميم',
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
    <div className="space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2">المشاريع <span className="text-gold-gradient">النشطة</span></h1>
          <p className="text-text-secondary font-medium">إدارة ومتابعة عمليات التنفيذ والتشطيب الجارية.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 glass-panel rounded-lg text-sm font-bold hover:text-accent-gold transition-all">
            <Filter size={18} /> تصفية
          </button>
          <button onClick={handleNewProject} className="btn-premium py-3 px-6 text-sm rounded-lg">
            <Plus size={20} className="ml-2" /> مشروع جديد
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
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
              className="glass-panel w-full max-w-2xl rounded-2xl overflow-hidden shadow-premium border-white/10"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-start bg-bg-secondary">
                <div>
                  <span className="text-xs uppercase tracking-widest text-accent-gold font-bold mb-2 block">{selectedProject.type}</span>
                  <h2 className="text-3xl font-black">{selectedProject.name}</h2>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-8 bg-bg-primary">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-text-secondary font-bold mb-1">العميل</p>
                    <p className="font-black text-lg">{selectedProject.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary font-bold mb-1">الحالة</p>
                    <p className="font-black text-lg text-blue-500">{selectedProject.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary font-bold mb-1">الميزانية</p>
                    <p className="font-black text-lg">{selectedProject.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary font-bold mb-1">الموعد النهائي</p>
                    <p className="font-black text-lg">{selectedProject.deadline}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold">نسبة الإنجاز الفعلية</span>
                    <span className="text-sm font-black text-accent-gold">{selectedProject.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-gold rounded-full" style={{ width: `${selectedProject.progress}%` }}></div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <button className="flex-1 btn-premium py-3 text-sm rounded-lg">الذهاب إلى لوحة المشروع</button>
                  <button className="flex-1 border border-white/10 hover:border-accent-gold hover:text-accent-gold text-white font-bold py-3 text-sm rounded-lg transition-colors">تعديل البيانات</button>
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
