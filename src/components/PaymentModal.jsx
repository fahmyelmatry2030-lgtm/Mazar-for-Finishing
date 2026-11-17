import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Smartphone, Building, ShieldCheck, CheckCircle2, Copy, Check, Upload, Lock, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

const paymentMethods = [
  { id: 'card', name: 'بطاقة بنكية', icon: CreditCard, hint: 'فيزا، ماستركارد، ميزة' },
  { id: 'instapay', name: 'إنستاباي InstaPay', icon: Smartphone, hint: 'تحويل لحظي مباشر' },
  { id: 'wallet', name: 'محافظ إلكترونية', icon: Smartphone, hint: 'فودافون كاش، أورنج، وي' },
  { id: 'bank', name: 'تحويل بنكي', icon: Building, hint: 'حساب CIB الرسمي' },
]

const PaymentModal = ({ isOpen, onClose, amount = 25000, title = 'سداد دفعة مشروع', projectCode = 'MZR-2026-08' }) => {
  if (!isOpen) return null

  const [method, setMethod] = useState('instapay')
  const [copiedText, setCopiedText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaid, setIsPaid] = useState(false)

  // Card form state
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [refNumber, setRefNumber] = useState('')

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    toast.success('تم النسخ إلى الحافظة')
    setTimeout(() => setCopiedText(''), 2500)
  }

  const handlePayment = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      setIsPaid(true)
      toast.success('تم استلام وتأكيد المعاملة بنجاح!', {
        style: { background: '#181818', color: '#fff', border: '1px solid #d4af37' }
      })
    }, 1500)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[3000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-bg-secondary border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex justify-between items-center bg-bg-primary/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-accent-gold/15 border border-accent-gold/40 flex items-center justify-center text-accent-gold">
                <Lock size={16} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  بوابة الدفع الإلكتروني الآمن
                </h3>
                <div className="text-[11px] text-text-muted">
                  معاملة مشفرة بمعايير 256-bit SSL
                </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Amount Badge */}
          <div className="bg-accent-gold/10 border-b border-accent-gold/20 p-4 text-center">
            <span className="text-xs text-text-secondary font-bold block mb-0.5">{title} ({projectCode})</span>
            <div className="text-2xl sm:text-3xl font-black text-accent-gold" dir="ltr">
              {amount.toLocaleString()} <span className="text-base font-bold text-white">EGP</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            
            {isPaid ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-xl font-black text-white mb-2">تمت عملية السداد بنجاح!</h4>
                <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                  تم قيد الدفعة في سجل حسابك بالمشروع وتحديث المستندات المالية تلقائياً. تم إرسال إيصال السداد إلى بريدك الإلكتروني وهاتفك.
                </p>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-accent-gold mb-6 inline-block" dir="ltr">
                  TXN-{Math.floor(10000000 + Math.random() * 90000000)}
                </div>
                <div>
                  <button 
                    onClick={onClose} 
                    className="btn-premium w-full py-3 text-sm font-bold rounded-xl"
                  >
                    إغلاق والعودة لمتابعة المشروع
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Method Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {paymentMethods.map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        method === m.id 
                          ? 'border-accent-gold bg-accent-gold/15 text-accent-gold' 
                          : 'border-white/10 hover:border-white/20 bg-white/5 text-text-secondary'
                      }`}
                    >
                      <m.icon size={18} />
                      <span className="font-bold text-xs">{m.name}</span>
                    </button>
                  ))}
                </div>

                {/* Method 1: Credit / Debit Card Form */}
                {method === 'card' && (
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-text-secondary mb-1">رقم البطاقة (16 رقم)</label>
                      <input 
                        type="text" 
                        required
                        maxLength={19}
                        placeholder="4123 •••• •••• 9876"
                        dir="ltr"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white font-mono font-bold outline-none focus:border-accent-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-secondary mb-1">اسم حامل البطاقة (كما يظهر على الكارت)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="AHMED MOHAMED"
                        dir="ltr"
                        value={cardHolder}
                        onChange={e => setCardHolder(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white font-bold outline-none focus:border-accent-gold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-text-secondary mb-1">تاريخ الانتهاء</label>
                        <input 
                          type="text" 
                          required
                          placeholder="MM / YY"
                          maxLength={5}
                          dir="ltr"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white font-mono font-bold text-center outline-none focus:border-accent-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary mb-1">رمز الأمان CVV</label>
                        <input 
                          type="password" 
                          required
                          maxLength={4}
                          placeholder="•••"
                          dir="ltr"
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white font-mono font-bold text-center outline-none focus:border-accent-gold"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn-premium w-full py-3.5 text-sm font-black flex items-center justify-center gap-2 rounded-xl mt-4"
                    >
                      {isProcessing ? 'جاري معالجة الدفع بأمان...' : `دفع ${amount.toLocaleString()} ج.م الآن`}
                    </button>
                  </form>
                )}

                {/* Method 2: InstaPay */}
                {method === 'instapay' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-center">
                      <span className="text-xs text-purple-300 font-bold block mb-1">عنوان الدفع اللحظي (IPA)</span>
                      <div className="text-lg font-black text-white flex items-center justify-center gap-2" dir="ltr">
                        <span>mazar.finishing@instapay</span>
                        <button 
                          type="button" 
                          onClick={() => handleCopy('mazar.finishing@instapay')}
                          className="p-1 rounded bg-white/10 hover:bg-white/20 text-accent-gold"
                        >
                          {copiedText === 'mazar.finishing@instapay' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-text-secondary leading-relaxed">
                      ١. افتح تطبيق إنستاباي على هاتفك.<br />
                      ٢. اختر تحويل إلى عنوان دفع لحظي (IPA).<br />
                      ٣. قم بتحويل المبلغ: <strong className="text-accent-gold">{amount.toLocaleString()} ج.م</strong> مع كتابة رقم المشروع بالبيان.
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-secondary mb-1.5">رقم المعاملة أو هاتف المحول</label>
                      <input 
                        type="text" 
                        placeholder="أدخل رقم العملية المرجعي من إنستاباي"
                        value={refNumber}
                        onChange={e => setRefNumber(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white font-bold outline-none focus:border-accent-gold"
                      />
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="btn-premium w-full py-3.5 text-sm font-black flex items-center justify-center gap-2 rounded-xl"
                    >
                      {isProcessing ? 'جاري التحقق...' : 'تأكيد إتمام التحويل عبر إنستاباي'}
                    </button>
                  </div>
                )}

                {/* Method 3: Mobile Wallets */}
                {method === 'wallet' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-center">
                      <span className="text-xs text-red-300 font-bold block mb-1">رقم محفظة فودافون كاش الرسمية</span>
                      <div className="text-xl font-black text-white flex items-center justify-center gap-2" dir="ltr">
                        <span>010 1234 5678</span>
                        <button 
                          type="button" 
                          onClick={() => handleCopy('01012345678')}
                          className="p-1 rounded bg-white/10 hover:bg-white/20 text-accent-gold"
                        >
                          {copiedText === '01012345678' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-text-secondary leading-relaxed">
                      قم بتحويل المبلغ عبر محفظتك الإلكترونية، ثم أدخل رقم الهاتف الذي قمت بالتحويل منه لتأكيد السداد.
                    </p>

                    <div>
                      <label className="block text-xs font-bold text-text-secondary mb-1.5">رقم الهاتف المحول منه</label>
                      <input 
                        type="tel" 
                        placeholder="01xxxxxxxxx"
                        dir="ltr"
                        value={refNumber}
                        onChange={e => setRefNumber(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white font-bold outline-none focus:border-accent-gold"
                      />
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="btn-premium w-full py-3.5 text-sm font-black flex items-center justify-center gap-2 rounded-xl"
                    >
                      {isProcessing ? 'جاري التحقق...' : 'تأكيد السداد بالمحفظة'}
                    </button>
                  </div>
                )}

                {/* Method 4: Bank Transfer */}
                {method === 'bank' && (
                  <div className="space-y-4 text-xs">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-text-muted">البنك:</span>
                        <span className="font-bold text-white">البنك التجاري الدولي (CIB مصر)</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-text-muted">اسم الحساب:</span>
                        <span className="font-bold text-white">مؤسسة مزار للتشطيبات والديكور</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-text-muted">رقم الحساب:</span>
                        <span className="font-mono font-bold text-accent-gold" dir="ltr">1000 4589 2310</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-muted">رقم IBAN:</span>
                        <span className="font-mono font-bold text-white" dir="ltr">EG45 0010 0001 0004 5892 3101 23</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-secondary mb-1.5">إرفاق إيصال / سكرين شوت التحويل</label>
                      <div className="p-4 rounded-xl border border-dashed border-white/15 text-center cursor-pointer hover:border-accent-gold/40 transition-colors">
                        <Upload size={20} className="mx-auto text-accent-gold mb-1" />
                        <span className="text-[11px] text-text-muted font-bold block">انقر لرفع صورة إشعار التحويل البنكي</span>
                      </div>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="btn-premium w-full py-3.5 text-sm font-black flex items-center justify-center gap-2 rounded-xl"
                    >
                      {isProcessing ? 'جاري التحقق...' : 'تأكيد وإرسال إشعار التحويل البنكي'}
                    </button>
                  </div>
                )}
              </>
            )}

          </div>

          {/* Footer security notes */}
          <div className="p-3 bg-bg-primary/80 border-t border-white/5 text-center text-[11px] text-text-muted flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-accent-gold" />
            <span>بياناتك المالية محمية ومشفرة بنسبة 100% ولا يتم تخزين أرقام البطاقات</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default PaymentModal
