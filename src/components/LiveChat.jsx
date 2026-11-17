import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  X, 
  Send, 
  Paperclip, 
  Phone, 
  CheckCheck, 
  Bot, 
  User, 
  Sparkles,
  MessageCircle,
  Clock
} from 'lucide-react'
import toast from 'react-hot-toast'

const quickSuggestions = [
  'أريد الاستفسار عن مقايسة فيلا',
  'أريد تحديد موعد لمعاينة شقتي',
  'أين يقع مقر الشركة في التجمع؟',
  'كيف يمكنني متابعة مراحل مشروعي؟'
]

const initialMessages = [
  {
    id: 1,
    sender: 'engineer',
    name: 'م. حسام الدين (مكتب المشروعات)',
    text: 'أهلاً بك في مزار للتشطيبات والديكور المعماري 🏛️ كيف يمكننا مساعدتك في مساحتك اليوم؟',
    time: 'الآن'
  }
]

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSend = (textToSend) => {
    const text = textToSend || inputText
    if (!text.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      name: 'أنت',
      text: text.trim(),
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    // Simulate Engineer Reply
    setTimeout(() => {
      let replyText = 'شكراً لتواصلك معنا! مهندس المشروعات المختص تلقى رسالتك وسيتابع معك التفاصيل فوراً. هل تحب استكمال المناقشة عبر مكالمة هاتفية أو واتساب لتسهيل إرسال المخططات؟'
      
      if (text.includes('مقايسة') || text.includes('تكلفة')) {
        replyText = 'يسعدنا خدمتك! يمكنك استخدام حاسبة المقايسات الفورية على موقعنا أو إخبارنا بالمساحة التقديرية ومستوى التشطيب (بريميوم أو لاكجري) لحسابها لك فوراً.'
      } else if (text.includes('معاينة') || text.includes('موعد')) {
        replyText = 'ممتاز، فريقنا الهندسي يقوم بالمعاينات الميدانية في القاهرة الجديدة والشيخ زايد والساحل الشمالي. يرجى تزويدنا برقم الهاتف وموقع العقار لحجز الموعد.'
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'engineer',
        name: 'م. حسام الدين (مكتب المشروعات)',
        text: replyText,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      }])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <>
      {/* Floating Trigger Button on Website */}
      <div className="fixed bottom-20 left-4 lg:bottom-6 lg:left-6 z-[980] flex flex-col items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent-gold text-bg-primary shadow-[0_10px_25px_rgba(212,175,55,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          aria-label="محادثة مباشرة مع المهندس"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <>
              <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
              {/* Active Online Pulse Dot */}
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-bg-primary animate-pulse" />
            </>
          )}
        </button>
        <span className="text-[10px] font-bold text-accent-gold mt-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-md hidden sm:block">
          شات المهندس
        </span>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-36 left-3 right-3 sm:right-auto sm:left-6 sm:w-96 bg-bg-secondary border border-white/10 rounded-3xl shadow-2xl z-[995] overflow-hidden flex flex-col h-[520px] max-h-[80vh]"
          >
            {/* Chat Header */}
            <div className="p-4 bg-bg-primary/90 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/20 border border-accent-gold flex items-center justify-center text-accent-gold font-black">
                    م
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-bg-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>المكتب الفني للمشروعات</span>
                    <Sparkles size={13} className="text-accent-gold" />
                  </h4>
                  <span className="text-[11px] text-emerald-400 font-bold">مهندس الديكور متصل الآن</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <a 
                  href="tel:201234567890" 
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-accent-gold transition-colors"
                  title="اتصال هاتفي"
                >
                  <Phone size={16} />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gradient-to-b from-bg-secondary to-bg-primary/95 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-text-muted mb-1 px-1">
                    {msg.name} · {msg.time}
                  </span>
                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-accent-gold text-bg-primary font-bold rounded-tl-sm'
                        : 'bg-white/10 text-white rounded-tr-sm border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-text-muted text-[11px] p-2 bg-white/5 rounded-xl max-w-[140px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span>المهندس يكتب...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Pills */}
            <div className="p-2.5 bg-bg-primary/50 border-t border-white/5 overflow-x-auto flex gap-1.5 scrollbar-none">
              {quickSuggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-accent-gold/15 hover:text-accent-gold border border-white/10 text-[10px] font-bold text-text-secondary whitespace-nowrap transition-all cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="p-3 bg-bg-secondary border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="اكتب استفسارك هنا..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-black/40 border border-white/10 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white font-bold outline-none focus:border-accent-gold transition-colors"
              />

              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-accent-gold text-bg-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-all flex-shrink-0 cursor-pointer"
              >
                <Send size={16} />
              </button>
            </form>

            {/* Footer with WhatsApp Switch */}
            <div className="py-1.5 px-3 bg-bg-primary text-center border-t border-white/5">
              <a
                href="https://wa.me/201234567890?text=مرحباً،%20أود%20استشارة%20المهندس%20بخصوص%20مشروعي"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <MessageCircle size={13} />
                <span>أو يمكنك المتابعة المباشرة عبر واتساب</span>
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default LiveChat
