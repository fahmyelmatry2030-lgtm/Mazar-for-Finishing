import React from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download,
  CreditCard,
  PieChart as PieChartIcon,
  Wallet,
  Plus,
  Trash2
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts'
import { useStore } from '../store/useStore'
import { useState } from 'react'

const distributionData = [
  { name: 'تشطيبات سكنية', value: 65, color: '#D4AF37' },
  { name: 'مشروعات تجارية', value: 20, color: '#3b82f6' },
  { name: 'استشارات هندسية', value: 10, color: '#a855f7' },
  { name: 'حلول ذكية', value: 5, color: '#22c55e' }
]

const FinanceCard = ({ label, value, trend, isPositive, icon: Icon }) => (
  <div className="bg-white shadow-sm border border-gray-200 p-6 rounded-2xl border-gray-200 hover:border-accent-gold/30 transition-all group">
    <div className="flex justify-between items-center mb-4">
      <div className="p-3 rounded-xl bg-accent-gold/10 text-accent-gold group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-black ${isPositive ? 'text-green-500' : 'text-red-500'}`} dir="ltr">
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {trend}
      </div>
    </div>
    <p className="text-gray-700 text-sm mb-1 font-black">{label}</p>
    <h3 className="text-3xl font-black">{value}</h3>
  </div>
)

const parseCurrency = (str) => {
  if (typeof str === 'number') return str
  if (!str) return 0
  // Convert Arabic numerals to English numerals first
  const englishStr = str.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
  return Number(englishStr.replace(/[^0-9]/g, ''))
}

const formatCurrency = (num) => {
  return new Intl.NumberFormat('ar-EG').format(num) + ' ج.م'
}

const Financials = () => {
  const quotes = useStore(state => state.quotes)
  const expenses = useStore(state => state.expenses)
  const addExpense = useStore(state => state.addExpense)
  const deleteExpense = useStore(state => state.deleteExpense)

  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('أجور')

  const handleAddExpense = async (e) => {
    e.preventDefault()
    if (!desc || !amount) return
    await addExpense({
      description: desc,
      amount: Number(amount),
      category,
      date: new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(new Date())
    })
    setDesc('')
    setAmount('')
  }

  // Calculate Totals
  const totalRevenue = quotes
    .filter(q => q.status === 'approved')
    .reduce((sum, q) => sum + parseCurrency(q.value), 0)
    
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const netProfit = totalRevenue - totalExpenses

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2">التقارير <span className="text-gold-gradient">المالية</span></h1>
          <p className="text-gray-700 font-medium">متابعة الإيرادات والمصروفات وصافي الأرباح الفعلية.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white shadow-sm border border-gray-200 rounded-lg text-sm font-black hover:text-accent-gold transition-all">
          <Download size={18} className="ml-2" /> تصدير التقرير
        </button>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FinanceCard label="إجمالي الإيرادات" value={formatCurrency(totalRevenue)} trend="+14.2%" isPositive={true} icon={Wallet} />
        <FinanceCard label="إجمالي المصروفات" value={formatCurrency(totalExpenses)} trend="+5.4%" isPositive={false} icon={CreditCard} />
        <FinanceCard label="صافي الربح" value={formatCurrency(netProfit)} trend="+18.7%" isPositive={true} icon={PieChartIcon} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Expenses List & Form */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black">سجل المصروفات</h3>
            <span className="text-xs font-black text-red-500 bg-red-500/10 px-3 py-1 rounded-full uppercase tracking-wider">{expenses.length} عملية</span>
          </div>

          <form onSubmit={handleAddExpense} className="flex gap-2 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <input 
              type="text" 
              placeholder="البيان (مثال: أجور عمال)" 
              value={desc} onChange={e => setDesc(e.target.value)}
              className="flex-1 bg-transparent border-none text-sm outline-none font-black placeholder:text-gray-900/30"
              required 
            />
            <input 
              type="number" 
              placeholder="المبلغ" 
              value={amount} onChange={e => setAmount(e.target.value)}
              className="w-24 bg-transparent border-none text-sm outline-none font-black placeholder:text-gray-900/30 text-left"
              required 
              dir="ltr"
            />
            <button type="submit" className="p-2 bg-accent-gold/10 text-accent-gold hover:bg-accent-gold hover:text-bg-primary rounded-lg transition-colors">
              <Plus size={18} />
            </button>
          </form>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex justify-between items-center group p-3 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-200">
                <div className="flex gap-4 items-center">
                  <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                    <DollarSign size={18} />
                  </div>
                  <div>
                    <p className="font-black">{expense.description}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] text-gray-700 uppercase tracking-widest font-black">{expense.date}</span>
                      <span className="text-[10px] text-accent-gold uppercase tracking-widest font-black bg-accent-gold/10 px-2 rounded-full">{expense.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-black text-red-500" dir="ltr">- {formatCurrency(expense.amount)}</p>
                  <button onClick={() => deleteExpense(expense.id)} className="text-gray-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {expenses.length === 0 && (
              <p className="text-center text-gray-700 font-black py-8 text-sm">لا توجد مصروفات مسجلة.</p>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm font-black text-gray-700">إجمالي المصروفات</p>
            <p className="text-xl font-black text-red-500">{formatCurrency(totalExpenses)}</p>
          </div>
        </div>

        {/* Expense Tracking & Distribution */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8 flex flex-col">
          <h3 className="text-xl mb-4 font-black">توزيع الإيرادات</h3>
          
          <div className="h-[300px] w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', borderColor: 'rgba(0,0,0,0.1)', borderRadius: '12px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value) => [`${value}%`, 'النسبة']}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-gray-700 font-black text-sm mr-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 p-6 bg-accent-gold/5 rounded-xl border border-accent-gold/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold">
                <PieChartIcon size={16} />
              </div>
              <p className="text-sm font-black text-accent-gold">تحليل الربحية</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              تمثل المشروعات السكنية ٦٥٪ من إجمالي الدخل. ننصح بتحسين تخصيص العمالة لهذا القطاع لتقليل التكاليف التشغيلية بنسبة ١٠٪ إضافية.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Financials
