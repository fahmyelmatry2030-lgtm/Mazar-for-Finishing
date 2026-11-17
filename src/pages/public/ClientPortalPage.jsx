import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  CreditCard, 
  Phone, 
  MessageCircle, 
  Camera, 
  ShieldCheck, 
  UserCheck, 
  Search, 
  ArrowLeft,
  DollarSign,
  AlertCircle,
  Bell,
  MessageSquare,
  Send,
  Paperclip,
  Sparkles
} from 'lucide-react'
import SEO from '../../components/SEO'
import PaymentModal from '../../components/PaymentModal'
import MeetingReminders from '../../components/MeetingReminders'
import toast from 'react-hot-toast'

// Sample projects in the client portal
const sampleClientProjects = {
  'MZR-2026-08': {
    code: 'MZR-2026-08',
    clientName: 'أحمد إبراهيم',
    projectName: 'فيلا الرحاب الفاخرة',
    location: 'التجمع الخامس - القاهرة الجديدة',
    engineer: 'م. حسام الدين مزار (مدير المشروعات)',
    engineerPhone: '+201234567890',
    startDate: '١٥ يناير ٢٠٢٦',
    expectedDelivery: '٢٤ مايو ٢٠٢٦',
    progress: 68,
    totalBudget: 1200000,
    paidAmount: 800000,
    dueAmount: 400000,
    phases: [
      { id: 1, name: 'التصميم المعماري و 3D', status: 'completed', progress: 100, date: '١ فبراير ٢٠٢٦' },
      { id: 2, name: 'التأسيس (كهرباء + سباكة + سمارت)', status: 'completed', progress: 100, date: '٢٥ فبراير ٢٠٢٦' },
      { id: 3, name: 'المحارة والجبس بورد والديكورات', status: 'completed', progress: 100, date: '٢٠ مارس ٢٠٢٦' },
      { id: 4, name: 'توريد وتركيب الرخام والبورسلين', status: 'in_progress', progress: 70, date: 'جاري العمل حالياً' },
      { id: 5, name: 'الدهانات الحديثة والتشطيب النهائي', status: 'pending', progress: 0, date: 'متوقع ١٠ مايو' },
      { id: 6, name: 'الاختبارات والتسليم الفاخر على المفتاح', status: 'pending', progress: 0, date: 'متوقع ٢٤ مايو' },
    ],
    updates: [
      {
        id: 1,
        date: 'أمس - ١٦ نوفمبر ٢٠٢٦',
        title: 'استكمال تركيب رخام الكرارا في صالة الاستقبال',
        desc: 'تم الانتهاء بنجاح من تركيب ٨٥٪ من رخام الأرضيات مع مراعاة عروق الرخام المتناسقة وتطبيق عازل الرطوبة.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 2,
        date: '١٠ نوفمبر ٢٠٢٦',
        title: 'اختبار ضغط شبكات السباكة والتغذية',
        desc: 'تم اختبار شبكات التغذية والصرف تحت إشراف مهندس مراقبة الجودة وضغطها على ٨ بار بمحضر فحص معتمد.',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'
      }
    ],
    documents: [
      { name: 'عقد التشطيب والمواصفات المعتمدة.pdf', size: '2.4 MB', date: '١٥ يناير ٢٠٢٦' },
      { name: 'المخططات التنفيذية والكهربائية (Shop Drawings).pdf', size: '14.8 MB', date: '١ فبراير ٢٠٢٦' },
      { name: 'محضر استلام بنود التأسيس والسباكة.pdf', size: '1.2 MB', date: '٢٥ فبراير ٢٠٢٦' },
      { name: 'شهادة ضمان عزل الحمامات والأسطح (10 سنوات).pdf', size: '850 KB', date: '١ مارس ٢٠٢٦' }
    ],
    payments: [
      { id: 1, title: 'دفعة التعاقد وبدء الأعمال', amount: 400000, status: 'paid', date: '١٥ يناير ٢٠٢٦' },
      { id: 2, title: 'دفعة استلام مرحلة التأسيس', amount: 400000, status: 'paid', date: '٢٥ فبراير ٢٠٢٦' },
      { id: 3, title: 'دفعة توريد الرخام والتشطيبات', amount: 250000, status: 'due', date: 'مستحقة السداد الآن' },
      { id: 4, title: 'دفعة التسليم النهائي والتصفية', amount: 150000, status: 'upcoming', date: 'عند الاستلام النهائي' }
    ]
  }
}

const ClientPortalPage = () => {
  const [projectCodeInput, setProjectCodeInput] = useState('MZR-2026-08')
  const [activeProject, setActiveProject] = useState(sampleClientProjects['MZR-2026-08'])
  const [activeTab, setActiveTab] = useState('progress') // progress | reminders | updates | documents | financials | chat
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({ amount: 250000, title: 'سداد دفعة توريد الرخام' })

  // Portal live chat state
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'engineer', text: 'أهلاً بك أ. أحمد، يسعدني إبلاغك أن مرحلة الرخام تسير وفق الجدول الزمني المحدد وسنبدأ المعالجة السطحية غداً.', time: '10:30 ص' },
    { id: 2, sender: 'client', text: 'ممتاز يا باشمهندس حسام، هل تم اعتماد عينة دهانات غرف النوم؟', time: '11:15 ص' },
    { id: 3, sender: 'engineer', text: 'نعم بالفعل، تم تجهيز عينة بالكرتونة في الموقع وبإمكاننا مراجعتها سوياً في اجتماع اليوم المسائي.', time: '11:20 ص' }
  ])
  const [newChatText, setNewChatText] = useState('')

  const handleSendChat = (e) => {
    e.preventDefault()
    if (!newChatText.trim()) return

    const clientMsg = {
      id: Date.now(),
      sender: 'client',
      text: newChatText.trim(),
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    }
    setChatMessages(prev => [...prev, clientMsg])
    setNewChatText('')

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'engineer',
        text: 'تم استلام ملاحظتك يا فندم وجاري متابعتها مع مشرف الموقع وتحديث السجل الآن.',
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }])
    }, 1000)
  }

  const handleSearchProject = (e) => {
    e.preventDefault()
    const cleanCode = projectCodeInput.trim().toUpperCase()
    if (sampleClientProjects[cleanCode]) {
      setActiveProject(sampleClientProjects[cleanCode])
      toast.success('تم تحميل بيانات مشروعك بنجاح!')
    } else {
      toast.error('لم يتم العثور على مشروع بهذا الكود. يمكنك تجربة الكود الافتراضي: MZR-2026-08')
    }
  }

  const handleDownloadDoc = (docName) => {
    toast.success(`جاري تحميل المستند: ${docName}`, {
      icon: '📥',
      style: { background: '#181818', color: '#fff', border: '1px solid #d4af37' }
    })
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-bg-primary text-text-primary">
      <SEO 
        title="بوابة العميل ومتابعة المشروعات" 
        description="تابع تطورات مشروعك لحظة بلحظة، واطلع على المستندات الهندسية ومواعيد الدفعات والتقارير المصورة." 
      />

      <div className="container">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-gold/15 border border-accent-gold/30 text-accent-gold text-xs font-bold mb-3">
            <UserCheck size={14} />
            <span>بوابة المتابعة الذكية للعملاء</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            متابعة <span className="text-gold-gradient italic">مشروعك ومستنداتك</span>
          </h1>
          <p className="text-text-secondary text-xs sm:text-sm font-medium">
            شفافية هندسية كاملة: تقارير الموقع الحية، المخططات المعتمدة، تنبيه المواعيد، وسداد الدفعات إلكترونياً.
          </p>
        </div>

        {/* Project Code Search / Switcher Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <form onSubmit={handleSearchProject} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                type="text" 
                value={projectCodeInput}
                onChange={e => setProjectCodeInput(e.target.value)}
                placeholder="أدخل كود مشروعك (مثال: MZR-2026-08)"
                className="w-full bg-bg-secondary border border-white/10 rounded-xl py-3 pr-11 pl-4 text-sm font-bold text-white outline-none focus:border-accent-gold transition-colors"
                dir="ltr"
              />
            </div>
            <button type="submit" className="btn-premium py-3 px-6 text-sm font-bold rounded-xl flex-shrink-0">
              عرض المشروع
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[11px] text-text-muted">
              كود تجريبي للعرض: <code className="text-accent-gold font-bold">MZR-2026-08</code>
            </span>
          </div>
        </div>

        {activeProject ? (
          <div className="space-y-8 max-w-5xl mx-auto">
            
            {/* Project Overview Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold text-accent-gold px-2.5 py-0.5 rounded-full bg-accent-gold/10 border border-accent-gold/30" dir="ltr">
                      {activeProject.code}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      جاري التنفيذ
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                    {activeProject.projectName}
                  </h2>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary mt-1">
                    <MapPin size={14} className="text-accent-gold" />
                    <span>{activeProject.location}</span>
                    <span>·</span>
                    <span>العميل: <strong className="text-white">{activeProject.clientName}</strong></span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <a 
                    href={`tel:${activeProject.engineerPhone}`}
                    className="flex-1 md:flex-none p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone size={14} className="text-accent-gold" />
                    <span>اتصال بالمهندس المشرف</span>
                  </a>
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className="flex-1 md:flex-none p-2.5 rounded-xl bg-accent-gold/15 hover:bg-accent-gold/25 border border-accent-gold/30 text-accent-gold text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare size={14} />
                    <span>شات المهندس المشرف</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar & KPI Grid */}
              <div className="pt-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs sm:text-sm font-bold text-text-secondary">نسبة الإنجاز الهندسي الكلية</span>
                  <span className="text-xl sm:text-2xl font-black text-accent-gold" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                    {activeProject.progress}%
                  </span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5 mb-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${activeProject.progress}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full bg-gold-gradient rounded-full"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[11px] text-text-muted font-bold">تاريخ البدء</div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{activeProject.startDate}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[11px] text-text-muted font-bold">موعد التسليم المتوقع</div>
                    <div className="text-xs sm:text-sm font-bold text-accent-gold mt-0.5">{activeProject.expectedDelivery}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[11px] text-text-muted font-bold">إجمالي الميزانية</div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5" dir="ltr">{activeProject.totalBudget.toLocaleString()} ج.م</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[11px] text-text-muted font-bold">المبلغ المسدد</div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5" dir="ltr">{activeProject.paidAmount.toLocaleString()} ج.م</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
              {[
                { id: 'progress', label: 'مراحل المشروع', icon: Clock },
                { id: 'reminders', label: 'المواعيد والمهام (Todo)', icon: Calendar, badge: 'تنبيه' },
                { id: 'updates', label: 'تحديثات الموقع الحية', icon: Camera },
                { id: 'documents', label: 'المستندات والرسومات', icon: FileText },
                { id: 'financials', label: 'الدفعات المالية والدفع', icon: CreditCard },
                { id: 'chat', label: 'شات المهندس المشرف', icon: MessageSquare },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-4 sm:px-5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-accent-gold text-bg-primary shadow-gold' 
                      : 'text-text-secondary hover:text-white bg-white/5 border border-white/5'
                  }`}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-red-500 text-white font-bold animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab: Reminders & Todo List */}
            {activeTab === 'reminders' && (
              <div className="space-y-6">
                <MeetingReminders />
              </div>
            )}

            {/* Tab: Live Chat with Supervising Engineer */}
            {activeTab === 'chat' && (
              <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden flex flex-col h-[560px]">
                {/* Chat Top Header */}
                <div className="p-4 bg-bg-secondary border-b border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-accent-gold/20 border border-accent-gold flex items-center justify-center text-accent-gold font-black">
                        ح
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-bg-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{activeProject.engineer}</h4>
                      <span className="text-xs text-emerald-400 font-bold">متواجد للمتابعة الفنية المباشرة</span>
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/201234567890?text=${encodeURIComponent(`مرحباً م. حسام، استفسار حول مشروعي: ${activeProject.projectName}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle size={15} />
                    <span className="hidden sm:inline">فتح على واتساب</span>
                  </a>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-bg-primary/50 text-xs sm:text-sm">
                  {chatMessages.map(m => (
                    <div key={m.id} className={`flex flex-col ${m.sender === 'client' ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] text-text-muted mb-1 px-1">
                        {m.sender === 'client' ? 'أنت' : 'المهندس المشرف'} · {m.time}
                      </span>
                      <div className={`p-4 rounded-2xl max-w-[80%] leading-relaxed ${
                        m.sender === 'client' 
                          ? 'bg-accent-gold text-bg-primary font-bold rounded-tl-sm' 
                          : 'bg-bg-secondary text-white rounded-tr-sm border border-white/10'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendChat} className="p-3.5 bg-bg-secondary border-t border-white/10 flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="اكتب استفسارك أو ملاحظتك للمهندس هنا..." 
                    value={newChatText}
                    onChange={e => setNewChatText(e.target.value)}
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-xs sm:text-sm text-white font-bold outline-none focus:border-accent-gold"
                  />
                  <button type="submit" className="btn-premium p-3 rounded-xl flex items-center justify-center">
                    <Send size={18} />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 1: Project Phases Timeline */}
            {activeTab === 'progress' && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-black text-white mb-6">المراحل التنفيذية لجدول المشروع</h3>
                
                <div className="space-y-4">
                  {activeProject.phases.map((phase) => (
                    <div 
                      key={phase.id} 
                      className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        phase.status === 'completed'
                          ? 'bg-emerald-950/15 border-emerald-500/30'
                          : phase.status === 'in_progress'
                          ? 'bg-accent-gold/15 border-accent-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                          : 'bg-white/5 border-white/5 opacity-70'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                          phase.status === 'completed' 
                            ? 'bg-emerald-500 text-bg-primary' 
                            : phase.status === 'in_progress'
                            ? 'bg-accent-gold text-bg-primary animate-pulse'
                            : 'bg-white/10 text-text-muted'
                        }`}>
                          {phase.status === 'completed' ? <CheckCircle2 size={18} /> : phase.id}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-white">{phase.name}</h4>
                          <span className="text-xs text-text-muted">{phase.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pr-12 sm:pr-0">
                        <div className="w-28 sm:w-36">
                          <div className="flex justify-between text-[11px] font-bold mb-1">
                            <span className="text-text-muted">الإنجاز:</span>
                            <span className={phase.status === 'completed' ? 'text-emerald-400' : 'text-accent-gold'}>{phase.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${phase.status === 'completed' ? 'bg-emerald-400' : 'bg-accent-gold'}`} 
                              style={{ width: `${phase.progress}%` }} 
                            />
                          </div>
                        </div>

                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                          phase.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : phase.status === 'in_progress'
                            ? 'bg-accent-gold/20 text-accent-gold'
                            : 'bg-white/10 text-text-muted'
                        }`}>
                          {phase.status === 'completed' && 'مكتملة ومستلمة'}
                          {phase.status === 'in_progress' && 'جاري التنفيذ الآن'}
                          {phase.status === 'pending' && 'مرحلة قادمة'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Live Site Photo Updates */}
            {activeTab === 'updates' && (
              <div className="space-y-6">
                {activeProject.updates.map(update => (
                  <div key={update.id} className="glass-panel p-6 rounded-3xl border border-white/10 overflow-hidden">
                    <div className="flex items-center gap-2 text-xs font-bold text-accent-gold mb-2">
                      <Calendar size={13} />
                      <span>{update.date}</span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">{update.title}</h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">{update.desc}</p>
                    
                    <div className="rounded-2xl overflow-hidden border border-white/10 max-h-96">
                      <img src={update.image} alt={update.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Documents & Drawings */}
            {activeTab === 'documents' && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-black text-white">ملفات ومستندات المشروع</h3>
                    <p className="text-xs text-text-secondary">العقود، كراسة المواصفات، والرسومات التنفيذية المعتمدة.</p>
                  </div>
                  <ShieldCheck className="text-accent-gold" size={24} />
                </div>

                <div className="space-y-3">
                  {activeProject.documents.map((doc, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-gold/30 transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center text-accent-gold flex-shrink-0">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white">{doc.name}</div>
                          <div className="text-[11px] text-text-muted">{doc.size} · تاريخ الإيداع: {doc.date}</div>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleDownloadDoc(doc.name)}
                        className="p-2.5 rounded-xl bg-white/10 hover:bg-accent-gold hover:text-bg-primary text-white transition-all flex items-center gap-1.5 text-xs font-bold flex-shrink-0 cursor-pointer"
                      >
                        <Download size={14} />
                        <span className="hidden sm:inline">تحميل المستند</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Financials & Online Payment */}
            {activeTab === 'financials' && (
              <div className="space-y-6">
                
                {/* Summary Alert */}
                <div className="glass-panel p-6 rounded-3xl border border-accent-gold/30 bg-accent-gold/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-accent-gold text-xs font-bold mb-1">
                      <AlertCircle size={15} />
                      <span>الدفعة المستحقة الحالية:</span>
                    </div>
                    <div className="text-2xl font-black text-white">
                      دفعة توريد الرخام والتشطيبات ({activeProject.dueAmount.toLocaleString()} ج.م)
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setPaymentDetails({ amount: 250000, title: 'دفعة توريد الرخام والتشطيبات' })
                      setShowPaymentModal(true)
                    }}
                    className="btn-premium py-3 px-6 text-sm font-black flex items-center gap-2 rounded-xl flex-shrink-0"
                  >
                    <CreditCard size={16} />
                    <span>سداد الدفعة الآن إلكترونياً</span>
                  </button>
                </div>

                {/* Payments Table / List */}
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                  <h3 className="text-lg font-black text-white mb-4">جدول الدفعات المالية</h3>

                  <div className="space-y-3">
                    {activeProject.payments.map((p) => (
                      <div 
                        key={p.id}
                        className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                          p.status === 'paid' 
                            ? 'bg-emerald-950/15 border-emerald-500/30' 
                            : p.status === 'due'
                            ? 'bg-accent-gold/15 border-accent-gold/40'
                            : 'bg-white/5 border-white/5'
                        }`}
                      >
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-white">{p.title}</h4>
                          <span className="text-xs text-text-muted">{p.date}</span>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <span className="text-base sm:text-lg font-black text-white" dir="ltr">
                            {p.amount.toLocaleString()} EGP
                          </span>

                          {p.status === 'paid' && (
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                              <CheckCircle2 size={12} />
                              <span>مسددة بالكامل</span>
                            </span>
                          )}

                          {p.status === 'due' && (
                            <button
                              onClick={() => {
                                setPaymentDetails({ amount: p.amount, title: p.title })
                                setShowPaymentModal(true)
                              }}
                              className="btn-premium py-1.5 px-4 text-xs font-bold rounded-lg"
                            >
                              سداد الآن
                            </button>
                          )}

                          {p.status === 'upcoming' && (
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-text-muted">
                              مستحقة لاحقاً
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        ) : null}

      </div>

      {/* Online Payment Modal */}
      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={paymentDetails.amount}
        title={paymentDetails.title}
        projectCode={activeProject?.code || 'MZR-2026-08'}
      />
    </div>
  )
}

export default ClientPortalPage
