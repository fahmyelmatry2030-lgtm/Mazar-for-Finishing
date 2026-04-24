import React from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download,
  CreditCard,
  PieChart,
  Wallet
} from 'lucide-react'

const FinanceCard = ({ label, value, trend, isPositive, icon: Icon }) => (
  <div className="glass-panel p-6 rounded-2xl border-white/5 hover:border-accent-gold/30 transition-all group">
    <div className="flex justify-between items-center mb-4">
      <div className="p-3 rounded-xl bg-accent-gold/10 text-accent-gold group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-black ${isPositive ? 'text-green-500' : 'text-red-500'}`} dir="ltr">
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {trend}
      </div>
    </div>
    <p className="text-text-secondary text-sm mb-1 font-bold">{label}</p>
    <h3 className="text-3xl font-black">{value}</h3>
  </div>
)

const Financials = () => {
  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2">التقارير <span className="text-gold-gradient">المالية</span></h1>
          <p className="text-text-secondary font-medium">متابعة الإيرادات والمصروفات وصافي أرباح المشاريع.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 glass-panel rounded-lg text-sm font-bold hover:text-accent-gold transition-all">
          <Download size={18} className="ml-2" /> تصدير التقرير
        </button>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FinanceCard label="إجمالي الإيرادات" value="٨٤٢,٥٠٠ ج.م" trend="+14.2%" isPositive={true} icon={Wallet} />
        <FinanceCard label="إجمالي المصروفات" value="٣١٢,٤٠٠ ج.م" trend="+5.4%" isPositive={false} icon={CreditCard} />
        <FinanceCard label="صافي الربح" value="٥٣٠,١٠٠ ج.م" trend="+18.7%" isPositive={true} icon={PieChart} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Transactions */}
        <div className="glass-panel rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">البيان الشهري (أبريل)</h3>
            <span className="text-xs font-black text-accent-gold bg-accent-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">محدث لحظياً</span>
          </div>
          <div className="space-y-6">
            {[
              { type: 'Income', label: 'فيلا الرحاب - المرحلة ٢', date: '٢٤ أبريل ٢٠٢٦', amount: '+٤٥,٠٠٠ ج.م', color: 'green' },
              { type: 'Expense', label: 'مورد الرخام (إيطاليا)', date: '٢٢ أبريل ٢٠٢٦', amount: '-١٢,٥٠٠ ج.م', color: 'red' },
              { type: 'Income', label: 'بنتهاوس زايد - دفعة نهائية', date: '٢٠ أبريل ٢٠٢٦', amount: '+٣٢,٠٠٠ ج.م', color: 'green' },
              { type: 'Expense', label: 'أجور العمالة - أسبوع ١٦', date: '١٨ أبريل ٢٠٢٦', amount: '-٨,٤٠٠ ج.م', color: 'red' },
              { type: 'Income', label: 'دفعة تعاقد مكتب أونيكس', date: '١٥ أبريل ٢٠٢٦', amount: '+١٥,٠٠٠ ج.م', color: 'green' }
            ].map((t, i) => (
              <div key={i} className="flex justify-between items-center group">
                <div className="flex gap-4 items-center">
                  <div className={`p-2 rounded-lg bg-${t.color === 'green' ? 'green' : 'red'}-500/10 text-${t.color === 'green' ? 'green' : 'red'}-500`}>
                    <DollarSign size={18} />
                  </div>
                  <div>
                    <p className="font-bold group-hover:text-accent-gold transition-colors">{t.label}</p>
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest font-black mt-0.5">{t.date}</p>
                  </div>
                </div>
                <p className={`font-black ${t.color === 'green' ? 'text-green-500' : 'text-red-500'}`}>{t.amount}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center">
            <p className="text-sm font-bold text-text-secondary">إجمالي دخل الشهر</p>
            <p className="text-xl font-black text-green-500">+٩٢,٠٠٠ ج.م</p>
          </div>
        </div>

        {/* Expense Tracking & Distribution */}
        <div className="glass-panel rounded-2xl p-8">
          <h3 className="text-xl mb-8 font-bold">توزيع الإيرادات والمصروفات</h3>
          <div className="space-y-8">
            {[
              { label: 'تشطيبات سكنية', percent: 65, color: 'accent-gold' },
              { label: 'مشروعات تجارية', percent: 20, color: 'blue-500' },
              { label: 'استشارات هندسية', percent: 10, color: 'purple-500' },
              { label: 'حلول المنازل الذكية', percent: 5, color: 'green-500' }
            ].map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary font-bold">{cat.label}</span>
                  <span className="font-black">{cat.percent}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cat.percent}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full bg-${cat.color === 'accent-gold' ? 'accent-gold' : cat.color} rounded-full`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-accent-gold/5 rounded-xl border border-accent-gold/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold">
                <PieChart size={16} />
              </div>
              <p className="text-sm font-black text-accent-gold">تحليل الربحية</p>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-medium">
              تمثل المشروعات السكنية ٦٥٪ من إجمالي الدخل. ننصح بتحسين تخصيص العمالة لهذا القطاع لتقليل التكاليف التشغيلية بنسبة ١٠٪ إضافية.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Financials
