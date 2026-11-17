import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  AlertTriangle,
  ExternalLink,
  Share2,
  CalendarPlus
} from 'lucide-react'
import toast from 'react-hot-toast'

const initialMeetings = [
  {
    id: 1,
    title: 'جلسة اعتماد التصميم ثلاثي الأبعاد 3D النهائي',
    type: 'online',
    platform: 'Zoom Video Call',
    date: 'اليوم',
    time: '07:30 مساءً',
    duration: '45 دقيقة',
    countdown: 'متبقي ساعتان و 15 دقيقة',
    isUrgent: true,
    link: 'https://zoom.us/j/1234567890',
    engineer: 'م. حسام الدين (استشاري التصميم)'
  },
  {
    id: 2,
    title: 'المعاينة الميدانية لموقع الفيلا واختبار الرخام',
    type: 'site',
    platform: 'موقع الفيلا - التجمع الخامس',
    date: 'بعد غد - الخميس',
    time: '11:00 صباحاً',
    duration: 'ساعة ونصف',
    countdown: 'متبقي يومان',
    isUrgent: false,
    link: 'https://maps.google.com',
    engineer: 'م. أحمد الشريف (مهندس الموقع)'
  }
]

const initialTodos = [
  { id: 1, text: 'مراجعة الملاحظات على تصميم غرفة النوم الرئيسية قبل الاجتماع', completed: true, time: 'قبل الجلسة' },
  { id: 2, text: 'تجهيز المخطط الورقي لأبعاد الأجهزة الكهربائية بالمطبخ', completed: true, time: 'قبل الجلسة' },
  { id: 3, text: 'اختيار درجة دهان الصالون المقترحة من باليتة جوتن', completed: false, time: 'خلال الاجتماع' },
  { id: 4, text: 'تأكيد موعد دخول عمال البورسلين للموقع يوم السبت', completed: false, time: 'غداً' },
]

const MeetingReminders = ({ isCompact = false }) => {
  const [meetings, setMeetings] = useState(initialMeetings)
  const [todos, setTodos] = useState(initialTodos)
  const [newTodoText, setNewTodoText] = useState('')
  const [reminderAlertSet, setReminderAlertSet] = useState(true)

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => {
      if (t.id === id) {
        const nextState = !t.completed
        toast(nextState ? 'تم إنجاز المهمة بنجاح! ✅' : 'تمت إعادة فتح المهمة ⏳', {
          style: { background: '#181818', color: '#fff', border: '1px solid #d4af37' }
        })
        return { ...t, completed: nextState }
      }
      return t
    }))
  }

  const addTodo = (e) => {
    e.preventDefault()
    if (!newTodoText.trim()) return

    const newTodo = {
      id: Date.now(),
      text: newTodoText.trim(),
      completed: false,
      time: 'مهمة مخصصة'
    }
    setTodos(prev => [newTodo, ...prev])
    setNewTodoText('')
    toast.success('تمت إضافة المهمة إلى جدول أعمالك')
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
    toast.success('تم حذف المهمة')
  }

  const completedCount = todos.filter(t => t.completed).length
  const progressPercent = Math.round((completedCount / (todos.length || 1)) * 100)

  // Quick Google Calendar URL generation
  const createGoogleCalendarLink = (meeting) => {
    const title = encodeURIComponent(meeting.title)
    const details = encodeURIComponent(`اجتماع استشاري مع مؤسسة مزار للتشطيبات (${meeting.engineer})`)
    const location = encodeURIComponent(meeting.platform)
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`
  }

  return (
    <div className="space-y-6">
      
      {/* 1. Smart Upcoming Meeting Reminder Banner */}
      {meetings.filter(m => m.isUrgent).map(urgentMeeting => (
        <motion.div
          key={urgentMeeting.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-accent-gold/20 via-accent-gold/10 to-bg-secondary border-2 border-accent-gold shadow-[0_0_25px_rgba(212,175,55,0.2)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-accent-gold text-bg-primary flex items-center justify-center font-black flex-shrink-0 animate-bounce">
              <Bell size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-accent-gold text-bg-primary">
                  تنبيه موعد عاجل 🔔
                </span>
                <span className="text-xs font-bold text-accent-gold" dir="ltr">
                  ({urgentMeeting.countdown})
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                {urgentMeeting.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary mt-1">
                <span className="flex items-center gap-1 text-white font-bold">
                  <Clock size={13} className="text-accent-gold" /> {urgentMeeting.date} · {urgentMeeting.time}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-text-muted">
                  <Video size={13} className="text-accent-gold" /> {urgentMeeting.platform}
                </span>
                <span>·</span>
                <span className="text-text-muted">{urgentMeeting.engineer}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <a
              href={urgentMeeting.link}
              target="_blank"
              rel="noreferrer"
              className="btn-premium flex-1 md:flex-none py-3 px-5 text-xs sm:text-sm font-black flex items-center justify-center gap-2 rounded-xl"
            >
              <Video size={16} />
              <span>انضمام لاجتماع Zoom الآن</span>
            </a>
            
            <a
              href={createGoogleCalendarLink(urgentMeeting)}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-premium flex-1 md:flex-none py-3 px-4 text-xs font-bold flex items-center justify-center gap-1.5 rounded-xl"
              title="إضافة لتقويم جوجل"
            >
              <CalendarPlus size={15} />
              <span className="hidden sm:inline">إضافة للتقويم</span>
            </a>
          </div>
        </motion.div>
      ))}

      {/* 2. Grid: Meetings Schedule + Todo List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Meetings List (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-black text-base text-white flex items-center gap-2">
                <Calendar size={18} className="text-accent-gold" />
                <span>المواعيد والاجتماعات المجدولة</span>
              </h4>
              <span className="text-xs font-bold text-accent-gold">{meetings.length} مواعيد</span>
            </div>

            <div className="space-y-3.5">
              {meetings.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    m.isUrgent 
                      ? 'bg-accent-gold/10 border-accent-gold/30' 
                      : 'bg-white/5 border-white/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-black text-accent-gold flex items-center gap-1">
                      <Clock size={13} />
                      <span>{m.date} - {m.time}</span>
                    </span>
                    <span className="text-[10px] text-text-muted font-bold px-2 py-0.5 rounded-md bg-white/5">
                      {m.duration}
                    </span>
                  </div>

                  <h5 className="font-bold text-sm text-white mb-2 leading-snug">{m.title}</h5>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <span className="text-text-secondary text-[11px]">{m.platform}</span>
                    <a
                      href={m.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent-gold hover:underline font-bold flex items-center gap-1"
                    >
                      <span>الرابط</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <Bell size={14} className="text-accent-gold" />
              <span>التنبيه عبر الواتساب مفعل قبل الموعد بساعتين</span>
            </span>
          </div>
        </div>

        {/* Interactive Todo List (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-5 sm:p-6 rounded-3xl border border-white/10">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="font-black text-base text-white flex items-center gap-2">
                <CheckCircle2 size={18} className="text-accent-gold" />
                <span>قائمة مهام ما قبل الاجتماع (Todo List)</span>
              </h4>
              <p className="text-xs text-text-secondary mt-0.5">مهام تحضيرية لضمان الاستفادة القصوى من الجلسة الهندسية.</p>
            </div>
            
            <div className="text-left">
              <span className="text-base font-black text-accent-gold" dir="ltr">
                {progressPercent}%
              </span>
              <span className="text-[10px] text-text-muted block font-bold">
                ({completedCount} من {todos.length})
              </span>
            </div>
          </div>

          {/* Progress Bar for Todo list */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-gold-gradient transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Todo Items */}
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            <AnimatePresence>
              {todos.map(todo => (
                <motion.div
                  key={todo.id}
                  layout
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    todo.completed 
                      ? 'bg-emerald-950/15 border-emerald-500/20 opacity-70' 
                      : 'bg-white/5 border-white/5 hover:border-accent-gold/30'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleTodo(todo.id)}
                    className="flex items-center gap-3 text-right flex-1 cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      {todo.completed ? (
                        <CheckCircle2 size={20} className="text-emerald-400" />
                      ) : (
                        <Circle size={20} className="text-text-muted hover:text-accent-gold" />
                      )}
                    </div>
                    <div>
                      <span className={`text-xs sm:text-sm font-bold block ${
                        todo.completed ? 'line-through text-text-muted' : 'text-white'
                      }`}>
                        {todo.text}
                      </span>
                      <span className="text-[10px] text-accent-gold/80 font-bold">{todo.time}</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1 text-text-muted hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add New Todo Form */}
          <form onSubmit={addTodo} className="mt-5 pt-4 border-t border-white/10 flex gap-2">
            <input
              type="text"
              placeholder="أضف مهمة جديدة أو تذكير خاص بالاجتماع..."
              value={newTodoText}
              onChange={e => setNewTodoText(e.target.value)}
              className="flex-1 bg-black/40 border border-white/10 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white font-bold outline-none focus:border-accent-gold transition-colors"
            />
            <button
              type="submit"
              className="btn-premium py-2.5 px-4 text-xs font-bold rounded-xl flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
            >
              <Plus size={16} />
              <span>إضافة</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  )
}

export default MeetingReminders
