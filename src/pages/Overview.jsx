import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const revenueData = [
  { name: 'يناير', revenue: 150000 },
  { name: 'فبراير', revenue: 230000 },
  { name: 'مارس', revenue: 180000 },
  { name: 'أبريل', revenue: 380000 },
  { name: 'مايو', revenue: 420000 },
  { name: 'يونيو', revenue: 530000 },
]

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="glass-panel p-6 rounded-2xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-500`}>
        <Icon size={24} />
      </div>
      <span className={`text-xs font-bold text-green-500 flex items-center gap-1`} dir="ltr">
        <TrendingUp size={12} /> {trend}
      </span>
    </div>
    <p className="text-text-secondary text-sm mb-1 font-bold">{label}</p>
    <h3 className="text-3xl font-black">{value}</h3>
  </div>
)

const Overview = () => {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-black mb-2">أهلاً بك مجدداً، <span className="text-gold-gradient">يا بشمهندس</span></h1>
        <p className="text-text-secondary font-medium">إليك ملخص سريع لأداء مشاريعك اليوم.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Clock} label="المشاريع النشطة" value="١٢" trend="+20%" color="blue" />
        <StatCard icon={CheckCircle2} label="مكتملة" value="٤٨" trend="+12%" color="green" />
        <StatCard icon={AlertCircle} label="عروض سعر معلقة" value="٠٧" trend="-5%" color="orange" />
        <StatCard icon={TrendingUp} label="إجمالي الإيرادات" value="٤٢٠ ألف" trend="+8%" color="yellow" />
      </div>

      {/* Revenue Chart */}
      <div className="glass-panel rounded-2xl p-6 h-[400px]">
        <h3 className="text-xl mb-6 font-bold">تحليل الإيرادات (آخر ٦ أشهر)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
            <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 'bold'}} axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1A1A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontWeight: 'bold' }}
              itemStyle={{ color: '#D4AF37' }}
              formatter={(value) => [`${value.toLocaleString()} ج.م`, 'الإيرادات']}
              labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-bold">آخر المشاريع</h3>
            <button className="text-accent-gold text-sm font-black">عرض الكل</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-text-secondary border-b border-white/5">
                  <th className="p-6">اسم المشروع</th>
                  <th className="p-6">العميل</th>
                  <th className="p-6">الحالة</th>
                  <th className="p-6">الميزانية</th>
                  <th className="p-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: 'فيلا الرحاب', client: 'أحمد إبراهيم', status: 'تحت التنفيذ', budget: '١٢٠,٠٠٠ ج.م', color: 'blue' },
                  { name: 'مكتب أونيكس', client: 'شركة مودرن تك', status: 'مرحلة التصميم', budget: '٤٥,٠٠٠ ج.م', color: 'purple' },
                  { name: 'بنتهاوس زايد', client: 'سارة كمال', status: 'مرحلة التشطيب', budget: '٨٥,٠٠٠ ج.م', color: 'orange' },
                  { name: 'لوفت جاردينيا', client: 'يوسف علي', status: 'مكتمل', budget: '٣٢,٠٠٠ ج.م', color: 'green' }
                ].map((project, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-all group">
                    <td className="p-6 font-bold">{project.name}</td>
                    <td className="p-6 text-text-secondary font-medium">{project.client}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-${project.color}-500/10 text-${project.color}-500`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-6 font-bold">{project.budget}</td>
                    <td className="p-6 text-left">
                      <button className="text-text-secondary hover:text-white transition-colors"><MoreVertical size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-xl mb-6 font-bold">نشاط مباشر</h3>
          <div className="space-y-6">
            {[
              { text: 'تم الانتهاء من معاينة موقع فيلا الرحاب', time: 'منذ ساعتين', icon: CheckCircle2, color: 'green' },
              { text: 'طلب عرض سعر جديد من عميل في التجمع', time: 'منذ ٤ ساعات', icon: Clock, color: 'blue' },
              { text: 'جدولة توريد خامات لمشروع أونيكس', time: 'أمس', icon: TrendingUp, color: 'yellow' },
              { text: 'تم استلام الدفعة النهائية لـ لوفت جاردينيا', time: 'أمس', icon: CheckCircle2, color: 'green' }
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className={`mt-1 p-2 rounded-lg bg-${activity.color}-500/10 text-${activity.color}-500 h-fit`}>
                  <activity.icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium leading-relaxed">{activity.text}</p>
                  <p className="text-[10px] text-text-secondary uppercase tracking-widest mt-1 font-bold">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .lg\\:col-span-2 { grid-column: span 2 / span 2; }
        .divide-y > * + * { border-top-width: 1px; }
        .divide-glass-border > * + * { border-color: var(--glass-border); }
        .bg-blue-500\\/10 { background-color: rgba(59, 130, 246, 0.1); }
        .text-blue-500 { color: #3b82f6; }
        .bg-green-500\\/10 { background-color: rgba(34, 197, 94, 0.1); }
        .text-green-500 { color: #22c55e; }
        .bg-orange-500\\/10 { background-color: rgba(249, 115, 22, 0.1); }
        .text-orange-500 { color: #f97316; }
        .bg-yellow-500\\/10 { background-color: rgba(234, 179, 8, 0.1); }
        .text-yellow-500 { color: #eab308; }
        .bg-purple-500\\/10 { background-color: rgba(168, 85, 247, 0.1); }
        .text-purple-500 { color: #a855f7; }
      `}} />
    </div>
  )
}

export default Overview
