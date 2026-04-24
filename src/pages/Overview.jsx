import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Plus,
  Trash2
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useStore } from '../store/useStore'

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="bg-white shadow-sm border border-gray-200 p-6 rounded-2xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-500`}>
        <Icon size={24} />
      </div>
      <span className={`text-xs font-black text-green-500 flex items-center gap-1`} dir="ltr">
        <TrendingUp size={12} /> {trend}
      </span>
    </div>
    <p className="text-gray-700 text-sm mb-1 font-black">{label}</p>
    <h3 className="text-3xl font-black">{value}</h3>
  </div>
)

const Overview = () => {
  const projects = useStore(state => state.projects)
  const quotes = useStore(state => state.quotes)
  const clients = useStore(state => state.clients)
  const expenses = useStore(state => state.expenses)

  // Calculate Monthly Data Dynamically
  const getMonthlyData = () => {
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    const data = months.map(m => ({ name: m, revenue: 0, expenses: 0 }))
    
    quotes.filter(q => q.status === 'approved' || q.status === 'مقبول').forEach(q => {
      const monthMatch = months.find(m => q.date?.includes(m))
      if (monthMatch) {
        const idx = months.indexOf(monthMatch)
        const val = typeof q.value === 'string' ? Number(q.value.replace(/[^0-9]/g, '')) : q.value
        data[idx].revenue += (val || 0)
      }
    })

    expenses.forEach(e => {
      const monthMatch = months.find(m => e.date?.includes(m))
      if (monthMatch) {
        const idx = months.indexOf(monthMatch)
        data[idx].expenses += Number(e.amount || 0)
      }
    })

    const currentMonthIdx = new Date().getMonth()
    return data.slice(Math.max(0, currentMonthIdx - 5), currentMonthIdx + 1)
  }

  const chartData = getMonthlyData()
  const activeProjects = projects.filter(p => p.status !== 'التسليم').length
  const pendingQuotes = quotes.filter(q => q.status === 'pending' || q.status === 'معلق').length
  const totalClients = clients.length
  const totalRevenue = quotes.filter(q => q.status === 'approved' || q.status === 'مقبول').reduce((s, q) => s + (typeof q.value === 'string' ? Number(q.value.replace(/[^0-9]/g, '')) : (q.value || 0)), 0)

  const [todos, setTodos] = useState([
    { id: 1, text: 'مراجعة عروض الأسعار المعلقة', done: false },
    { id: 2, text: 'متابعة توريد خامات بنتهاوس جولد', done: false },
    { id: 3, text: 'جدولة زيارة ميدانية لفيلا الرحاب', done: true },
  ])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (!newTodo.trim()) return
    setTodos(prev => [...prev, { id: Date.now(), text: newTodo.trim(), done: false }])
    setNewTodo('')
  }

  const toggleTodo = (id) => setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const deleteTodo = (id) => setTodos(prev => prev.filter(t => t.id !== id))

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-black mb-2">أهلاً بك مجدداً، <span className="text-gold-gradient">يا بشمهندس</span></h1>
        <p className="text-gray-900 font-black text-lg">إليك ملخص سريع لأداء مشاريعك اليوم.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Clock} label="المشاريع النشطة" value={activeProjects.toString()} trend="+20%" color="blue" />
        <StatCard icon={CheckCircle2} label="إجمالي العملاء" value={totalClients.toString()} trend="+12%" color="green" />
        <StatCard icon={AlertCircle} label="عروض سعر معلقة" value={pendingQuotes.toString()} trend="-5%" color="orange" />
        <StatCard icon={TrendingUp} label="إجمالي الإيرادات" value={new Intl.NumberFormat('ar-EG').format(totalRevenue) + ' ج.م'} trend="+8%" color="yellow" />
      </div>

      {/* Dynamic Financial Chart */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8 h-[450px]">
        <h3 className="text-xl mb-8 font-black text-gray-900">تحليل التدفق المالي (الأشهر الأخيرة)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(0,0,0,0.5)" tick={{fill: 'rgba(0,0,0,1)', fontSize: 13, fontWeight: '900'}} axisLine={false} tickLine={false} />
            <YAxis stroke="rgba(0,0,0,0.5)" tick={{fill: 'rgba(0,0,0,1)', fontSize: 13, fontWeight: '900'}} axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1A1A', borderColor: 'rgba(0,0,0,0.1)', borderRadius: '12px', fontWeight: 'black' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value) => [`${value.toLocaleString()} ج.م`]}
              labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}
            />
            <Area type="monotone" dataKey="revenue" name="الإيرادات" stroke="#D4AF37" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="expenses" name="المصروفات" stroke="#ef4444" strokeWidth={4} fillOpacity={1} fill="url(#colorExpenses)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects Table */}
        <div className="lg:col-span-2 bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-xl font-black text-gray-900">أحدث المشاريع القائمة</h3>
            <button className="text-accent-gold text-sm font-black hover:underline">عرض الكل</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-gray-900 border-b border-gray-200">
                  <th className="p-6 font-black">اسم المشروع</th>
                  <th className="p-6 font-black">العميل</th>
                  <th className="p-6 font-black">الحالة</th>
                  <th className="p-6 font-black">الميزانية</th>
                  <th className="p-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.slice(-4).reverse().map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-all group">
                    <td className="p-6 font-black text-gray-900">{project.name}</td>
                    <td className="p-6 text-gray-900 font-black">{project.client}</td>
                    <td className="p-6">
                      <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-accent-gold/10 text-accent-gold border border-accent-gold/20">
                        {project.status}
                      </span>
                    </td>
                    <td className="p-6 font-black text-gray-900">{project.budget}</td>
                    <td className="p-6 text-left">
                      <button className="text-gray-700 hover:text-accent-gold transition-colors"><MoreVertical size={18} /></button>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr><td colSpan="5" className="p-10 text-center text-gray-900 font-black">لا توجد مشاريع مسجلة حالياً.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Activity Feed */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8">
          <h3 className="text-xl mb-8 font-black text-gray-900">النشاط الأخير</h3>
          <div className="space-y-8">
            {[
              ...projects.slice(-2).map(p => ({ text: `تحديث في: ${p.name}`, time: 'مؤخراً', icon: Clock, color: 'blue' })),
              ...quotes.slice(-2).map(q => ({ text: `تسعير جديد: ${q.client}`, time: 'مؤخراً', icon: TrendingUp, color: 'yellow' })),
              ...clients.slice(-1).map(c => ({ text: `عميل جديد: ${c.name}`, time: 'جديد', icon: CheckCircle2, color: 'green' }))
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className={`p-2.5 rounded-xl bg-${activity.color}-500/10 text-${activity.color}-600 h-fit group-hover:scale-110 transition-transform border border-${activity.color}-500/20`}>
                  <activity.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900 leading-relaxed">{activity.text}</p>
                  <p className="text-[11px] text-gray-900 uppercase tracking-widest mt-1.5 font-black opacity-70">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Tasks */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black text-gray-900">المهام اليومية</h3>
          <span className="text-xs font-black text-accent-gold bg-accent-gold/10 px-5 py-2 rounded-full border border-accent-gold/20">
            {todos.filter(t => !t.done).length} مهام نشطة
          </span>
        </div>

        <div className="flex gap-4 mb-8">
          <input
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            placeholder="أدخل مهمة جديدة..."
            className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl py-4 px-6 text-sm font-black focus:border-accent-gold outline-none transition-colors placeholder:text-gray-400"
          />
          <button onClick={addTodo} className="px-8 bg-accent-gold text-white hover:bg-accent-gold-dark rounded-2xl transition-all shadow-xl shadow-accent-gold/30">
            <Plus size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {todos.map(todo => (
            <motion.div
              key={todo.id}
              layout
              className={`flex items-center gap-5 p-5 rounded-2xl border-2 transition-all ${
                todo.done 
                  ? 'bg-green-50 border-green-200 opacity-60' 
                  : 'bg-white border-gray-100 hover:border-gray-300 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                  todo.done ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/30' : 'border-gray-300 hover:border-accent-gold'
                }`}
              >
                {todo.done && <CheckCircle2 size={16} className="text-white" />}
              </button>
              <span className={`flex-1 text-base font-black ${todo.done ? 'line-through text-gray-600' : 'text-gray-900'}`}>
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)} className="p-2.5 text-gray-900 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl">
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Overview
