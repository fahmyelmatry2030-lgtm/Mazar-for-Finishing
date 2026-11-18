import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  Home, 
  Briefcase, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Calculator, 
  FileText, 
  Printer, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Phone, 
  User, 
  MapPin, 
  ChevronRight,
  Plus,
  Minus,
  RefreshCw,
  BadgeCheck,
  Ruler,
  Boxes,
  Paintbrush,
  Hammer,
  DoorClosed,
  AppWindow,
  PackageCheck,
  Percent
} from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

// Unit initial finishing states
const UNIT_STATES = [
  { 
    id: 'red_brick', 
    label: 'طوب أحمر (من الصفر)', 
    badge: 'تأسيس وتشطيب كامل',
    needsPlaster: true,
    needsPlumbingElec: true,
    desc: 'يشمل كافة مراحل التأسيس (سباكة، كهرباء، محارة، أرضيات، دهانات، أسقف وألوميتال).'
  },
  { 
    id: 'semi_finished', 
    label: 'نصف تشطيب (على المحارة)', 
    badge: 'المحارة والحلوق راكبة',
    needsPlaster: false,
    needsPlumbingElec: true,
    desc: 'معفى من بند المحارة والحلوق، والبدء مباشرة من السيراميك، الدهانات، الأسقف والألوميتال.'
  },
  { 
    id: 'renovation', 
    label: 'تجديد شقة قائمة (Renovation)', 
    badge: 'تطوير وديكور',
    needsPlaster: false,
    needsPlumbingElec: false,
    desc: 'تجديد السيراميك، تعديلات وتأسيسات ديكورية، دهانات حديثة، وأسقف جبسوم بورد معلقة.'
  }
]

// Finishing specification tiers
const FINISHING_TIERS = [
  { 
    id: 'economic', 
    title: 'اقتصادي (Economic)', 
    badge: 'عملي وموثق',
    ratePerSqm: 6500,
    desc: 'خامات محلية فرز أول معتمدة، سيراميك أرضيات أنيق، تأسيس سليم وضمان موثق.'
  },
  { 
    id: 'standard', 
    title: 'متوسط (Standard)', 
    badge: 'الأكثر طلباً',
    popular: true,
    ratePerSqm: 9500,
    desc: 'بورسلين مستورد للريسبشن، سيراميك فاخر للغرف، أطقم معلقة، بيوت نور ودهانات كمبيوتر.'
  },
  { 
    id: 'luxury', 
    title: 'فاخر (Luxury)', 
    badge: 'أعلى رفاهية',
    ratePerSqm: 14500,
    desc: 'رخام طبيعي مستورد، سمارت هوم متكامل، أبواب خشبية مدرعة، وبانوهات جدارية إيطالية.'
  }
]

// Common window preset dimensions
const WINDOW_PRESETS = [
  { label: 'شباك قياسي (1.20 × 1.20 م)', width: 1.20, height: 1.20 },
  { label: 'شباك عريض (1.50 × 1.20 م)', width: 1.50, height: 1.20 },
  { label: 'شباك كبير (1.50 × 1.50 م)', width: 1.50, height: 1.50 },
  { label: 'شباك منور (0.80 × 0.60 م)', width: 0.80, height: 0.60 }
]

const ProfessionalQuotationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [reportTab, setReportTab] = useState('surfaces') // 'surfaces' | 'materials' | 'cost'
  const addQuote = useStore(state => state.addQuote)
  const quotePrintRef = useRef(null)

  // Step 1: Unit & Wall Height
  const [unitState, setUnitState] = useState('semi_finished')
  const [wallHeight, setWallHeight] = useState(2.80)
  const [finishingTier, setFinishingTier] = useState('standard')
  const [ceilingCoverage, setCeilingCoverage] = useState(80) // 100% or 80% or 0%

  // Step 2: Space Quantities
  const [roomsCount, setRoomsCount] = useState(3)
  const [receptionCount, setReceptionCount] = useState(2)
  const [bathroomsCount, setBathroomsCount] = useState(2)
  const [kitchensCount, setKitchensCount] = useState(1)
  const [livingCount, setLivingCount] = useState(1)
  const [corridorsCount, setCorridorsCount] = useState(1)
  const [balconiesCount, setBalconiesCount] = useState(1)

  // Step 2: Room Dimensions (Length x Width)
  const [roomDims, setRoomDims] = useState([
    { id: 1, label: 'غرفة نوم 1 (ماستر)', length: 4.5, width: 4.0, winW: 1.5, winH: 1.2 },
    { id: 2, label: 'غرفة نوم 2', length: 4.0, width: 3.5, winW: 1.2, winH: 1.2 },
    { id: 3, label: 'غرفة نوم 3', length: 3.5, width: 3.0, winW: 1.2, winH: 1.2 },
    { id: 4, label: 'غرفة نوم 4', length: 3.5, width: 3.0, winW: 1.2, winH: 1.2 },
    { id: 5, label: 'غرفة نوم 5', length: 3.5, width: 3.0, winW: 1.2, winH: 1.2 },
    { id: 6, label: 'غرفة نوم 6', length: 3.5, width: 3.0, winW: 1.2, winH: 1.2 }
  ])

  const [receptionDims, setReceptionDims] = useState([
    { id: 1, label: 'قطعة ريسبشن 1 (صالون)', length: 6.0, width: 4.0, winW: 1.5, winH: 1.5 },
    { id: 2, label: 'قطعة ريسبشن 2 (سفرة)', length: 5.0, width: 4.0, winW: 1.5, winH: 1.2 },
    { id: 3, label: 'قطعة ريسبشن 3', length: 4.5, width: 3.5, winW: 1.2, winH: 1.2 },
    { id: 4, label: 'قطعة ريسبشن 4', length: 4.0, width: 3.5, winW: 1.2, winH: 1.2 }
  ])

  const [livingDims, setLivingDims] = useState([
    { id: 1, label: 'غرفة المعيشة (ليفينج)', length: 4.0, width: 3.5, winW: 1.2, winH: 1.2 },
    { id: 2, label: 'ليفينج داخلي 2', length: 3.5, width: 3.0, winW: 1.2, winH: 1.2 }
  ])

  const [bathroomDims, setBathroomDims] = useState([
    { id: 1, label: 'حمام رئيسي', length: 2.5, width: 2.0, winW: 0.8, winH: 0.6 },
    { id: 2, label: 'حمام ضيوف / ماستر', length: 2.0, width: 1.6, winW: 0.8, winH: 0.6 },
    { id: 3, label: 'حمام 3', length: 1.8, width: 1.5, winW: 0.8, winH: 0.6 },
    { id: 4, label: 'حمام 4', length: 1.8, width: 1.4, winW: 0.8, winH: 0.6 }
  ])

  const [kitchenDims, setKitchenDims] = useState([
    { id: 1, label: 'المطبخ الرئيسي', length: 3.5, width: 3.0, winW: 1.2, winH: 1.0 },
    { id: 2, label: 'مطبخ أوفيس تحضيري', length: 2.5, width: 2.0, winW: 0.8, winH: 0.6 }
  ])

  const [corridorDims, setCorridorDims] = useState([
    { id: 1, label: 'الطرقة والموزع الرئيسي', length: 5.0, width: 1.4 },
    { id: 2, label: 'طرقة غرف النوم', length: 4.0, width: 1.2 },
    { id: 3, label: 'طرقة مدخل الشقة', length: 3.0, width: 1.2 }
  ])

  const [balconyDims, setBalconyDims] = useState([
    { id: 1, label: 'بلكونة الريسبشن الرئيسية', length: 3.5, width: 1.5 },
    { id: 2, label: 'بلكونة الغرفة', length: 2.5, width: 1.2 },
    { id: 3, label: 'بلكونة المطبخ / منور', length: 2.0, width: 1.2 },
    { id: 4, label: 'تراس خارجي', length: 4.0, width: 2.0 }
  ])

  // Step 3: Client Info
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [city, setCity] = useState('القاهرة الجديدة / التجمع')
  const [floor, setFloor] = useState('الدور الثالث')

  // Result state
  const [quoteCode, setQuoteCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ----------------------------------------------------
  // Architectural Engineering Calculations
  // ----------------------------------------------------
  const activeRooms = roomDims.slice(0, roomsCount)
  const activeReception = receptionDims.slice(0, receptionCount)
  const activeLiving = livingDims.slice(0, livingCount)
  const activeBathrooms = bathroomDims.slice(0, bathroomsCount)
  const activeKitchens = kitchenDims.slice(0, kitchensCount)
  const activeCorridors = corridorDims.slice(0, corridorsCount)
  const activeBalconies = balconyDims.slice(0, balconiesCount)

  // 1. Floor Areas (مساحات الأرضيات)
  const roomsFloorArea = activeRooms.reduce((acc, r) => acc + (r.length * r.width), 0)
  const receptionFloorArea = activeReception.reduce((acc, r) => acc + (r.length * r.width), 0)
  const livingFloorArea = activeLiving.reduce((acc, r) => acc + (r.length * r.width), 0)
  const bathroomsFloorArea = activeBathrooms.reduce((acc, r) => acc + (r.length * r.width), 0)
  const kitchensFloorArea = activeKitchens.reduce((acc, r) => acc + (r.length * r.width), 0)
  const corridorsFloorArea = activeCorridors.reduce((acc, r) => acc + (r.length * r.width), 0)
  const balconiesFloorArea = activeBalconies.reduce((acc, r) => acc + (r.length * r.width), 0)

  // Porcelain / Marble area: Reception + Living + Corridors
  const porcelainArea = receptionFloorArea + livingFloorArea + corridorsFloorArea
  // Bedroom ceramic or HDF
  const bedroomCeramicArea = roomsFloorArea
  // Service ceramic: Bathrooms + Kitchens + Balconies
  const serviceCeramicArea = bathroomsFloorArea + kitchensFloorArea + balconiesFloorArea
  // Total Net Floor Area
  const totalFloorArea = roomsFloorArea + porcelainArea + serviceCeramicArea

  // 2. Perimeters (محيط الحوائط بالمتر الطولي)
  const calcPerimeter = (arr) => arr.reduce((acc, item) => acc + ((item.length + item.width) * 2), 0)
  const roomsPerimeter = calcPerimeter(activeRooms)
  const receptionPerimeter = calcPerimeter(activeReception)
  const livingPerimeter = calcPerimeter(activeLiving)
  const bathroomsPerimeter = calcPerimeter(activeBathrooms)
  const kitchensPerimeter = calcPerimeter(activeKitchens)
  const corridorsPerimeter = calcPerimeter(activeCorridors)
  const totalPerimeter = roomsPerimeter + receptionPerimeter + livingPerimeter + bathroomsPerimeter + kitchensPerimeter + corridorsPerimeter

  // 3. Doors & Openings Count
  const bedroomDoorsCount = roomsCount
  const bathroomDoorsCount = bathroomsCount
  const apartmentEntranceDoor = 1
  const totalDoorsCount = bedroomDoorsCount + bathroomDoorsCount + apartmentEntranceDoor
  const doorsOpeningsDeduction = totalDoorsCount * 2.2 // 2.2 m2 per standard interior/main door

  // 4. Windows Area (الألوميتال والزجاج)
  const calcWindowsArea = (arr) => arr.reduce((acc, item) => acc + ((item.winW || 1.2) * (item.winH || 1.2)), 0)
  const totalWindowsArea = calcWindowsArea(activeRooms) + calcWindowsArea(activeReception) + calcWindowsArea(activeLiving) + calcWindowsArea(activeBathrooms) + calcWindowsArea(activeKitchens)

  // 5. Walls Surface Area (مسطحات الحوائط بعد خصم الفتحات)
  // Bathroom & Kitchen Wall Ceramic (من الأرض للسقف)
  const wetWallsGrossArea = (bathroomsPerimeter + kitchensPerimeter) * wallHeight
  const wetWallsOpenings = (bathroomsCount + kitchensCount) * 2.2 + calcWindowsArea(activeBathrooms) + calcWindowsArea(activeKitchens)
  const wetWallsNetCeramicArea = Math.max(0, wetWallsGrossArea - wetWallsOpenings)

  // Dry Walls: Rooms + Reception + Living + Corridors (للمحارة والدهانات)
  const dryWallsGrossArea = (roomsPerimeter + receptionPerimeter + livingPerimeter + corridorsPerimeter) * wallHeight
  const dryWallsOpenings = (bedroomDoorsCount + apartmentEntranceDoor) * 2.2 + calcWindowsArea(activeRooms) + calcWindowsArea(activeReception) + calcWindowsArea(activeLiving)
  const dryWallsNetPaintArea = Math.max(0, dryWallsGrossArea - dryWallsOpenings)

  // Total Plastering Area (المحارة: حوائط جافة + حوائط رطبة)
  const selectedStateObj = UNIT_STATES.find(s => s.id === unitState) || UNIT_STATES[1]
  const totalPlasterArea = selectedStateObj.needsPlaster ? Math.round(dryWallsNetPaintArea + wetWallsNetCeramicArea) : 0

  // 6. Skirting (الوزر بالمتر الطولي)
  const skirtingLength = Math.max(0, Math.round(totalPerimeter - (totalDoorsCount * 0.9)))

  // 7. Ceilings & Gypsum Board (الأسقف المعلقة)
  const gypsumBoardArea = Math.round(totalFloorArea * (ceilingCoverage / 100))

  // ----------------------------------------------------
  // Materials Takeoff (حصر المَوَن التقديرية كما شرح المهندس)
  // ----------------------------------------------------
  // Cement for Tile fixing: ~1 bag per 6 m2
  const floorTileCementBags = Math.round(totalFloorArea / 6)
  const wallTileCementBags = Math.round(wetWallsNetCeramicArea / 7)
  // Cement for Plaster: ~1 bag per 8 m2
  const plasterCementBags = selectedStateObj.needsPlaster ? Math.round(totalPlasterArea / 8) : 0
  const totalCementBags = floorTileCementBags + wallTileCementBags + plasterCementBags

  // Sand: ~0.10 m3 per m2 of floor (10cm bed) + plaster sand (~0.025 m3 per m2)
  const floorSandM3 = Number((totalFloorArea * 0.10).toFixed(1))
  const plasterSandM3 = selectedStateObj.needsPlaster ? Number((totalPlasterArea * 0.025).toFixed(1)) : 0
  const totalSandM3 = Number((floorSandM3 + plasterSandM3).toFixed(1))

  // Paint & Putty Takeoff:
  // Putty: 1 bucket (15-20kg) covers ~25 m2 for 3 coats
  const puttyBuckets = Math.round(dryWallsNetPaintArea / 25)
  // Sealer: 1 bucket covers ~90 m2
  const sealerBuckets = Math.max(1, Math.round(dryWallsNetPaintArea / 90))
  // Finish washable paint: 1 bucket covers ~60 m2 for 2 coats
  const finishPaintBuckets = Math.max(1, Math.round(dryWallsNetPaintArea / 60))

  // Estimated Cost Calculation
  const selectedTierObj = FINISHING_TIERS.find(t => t.id === finishingTier) || FINISHING_TIERS[1]
  const baseRate = selectedTierObj.ratePerSqm
  const stateFactor = unitState === 'red_brick' ? 1.05 : unitState === 'semi_finished' ? 0.95 : 0.88
  const estimatedTotalCost = Math.round((totalFloorArea * baseRate * stateFactor) / 1000) * 1000

  // Navigation handlers
  const handleNext = () => {
    if (currentStep === 1) {
      if (wallHeight < 2.4 || wallHeight > 4.5) {
        toast.error('يرجى التأكد من ارتفاع الحوائط (بين 2.40م و 4.50م)')
        return
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      if (totalFloorArea < 20) {
        toast.error('يرجى إدخال أبعاد الفراغات بشكل صحيح')
        return
      }
      setCurrentStep(3)
    } else if (currentStep === 3) {
      if (!clientName.trim() || clientName.length < 3) {
        toast.error('يرجى إدخال الاسم الكامل')
        return
      }
      if (!clientPhone.trim() || clientPhone.length < 8) {
        toast.error('يرجى إدخال رقم الهاتف للتواصل')
        return
      }
      generateQuote()
    }
  }

  const generateQuote = () => {
    setIsSubmitting(true)
    const code = `MZR-Q${Math.floor(1000 + Math.random() * 9000)}`
    setQuoteCode(code)

    try {
      addQuote({
        client: clientName,
        phone: clientPhone,
        type: `شقة ${Math.round(totalFloorArea)}م² صافي (${selectedTierObj.title}) - ${selectedStateObj.label}`,
        date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
        value: `${estimatedTotalCost.toLocaleString('ar-EG')} ج.م`,
        status: 'pending'
      })

      toast.success('تم إعداد حصر الكميات والمقايسة الهندسية بنجاح!', {
        style: { background: '#181818', color: '#fff', border: '1px solid rgba(212,175,55,0.4)' },
        iconTheme: { primary: '#D4AF37', secondary: '#181818' }
      })
      setCurrentStep(4)
    } catch {
      setCurrentStep(4)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleSendWhatsApp = () => {
    const message = `🏛️ *طلب مقايسة وحصر كميات هندسي - مزار للتشطيبات المعمارية*
👤 *العميل:* ${clientName}
📱 *الهاتف:* ${clientPhone}
📍 *الموقع:* ${city} (${floor})
🏷️ *كود المقايسة:* ${quoteCode}
⭐ *المواصفات المطلوبة:* ${selectedTierObj.title}
🧱 *حالة الشقة الحالية:* ${selectedStateObj.label}

📐 *حصر المسطحات الهندسية الصافية:*
- مساحة الشقة الإجمالية الصافية: ${Math.round(totalFloorArea)} م²
- ارتفاع الحوائط المعتمد: ${wallHeight.toFixed(2)} م
- أرضيات بورسلين ورخام (ريسبشن وليفينج وطرقات): ${Math.round(porcelainArea)} م²
- أرضيات سيراميك أو HDF غرف النوم: ${Math.round(bedroomCeramicArea)} م²
- سيراميك أرضيات حمامات ومطابخ: ${Math.round(serviceCeramicArea)} م²
- سيراميك حوائط الحمامات والمطابخ: ${Math.round(wetWallsNetCeramicArea)} م²
${totalPlasterArea > 0 ? `- مسطح حوائط المحارة: ${totalPlasterArea} م²\n` : ''}- مسطح حوائط الدهانات والنقاشة: ${Math.round(dryWallsNetPaintArea)} م²
- أمتار الوزر السيراميك: ${skirtingLength} م.ط
- أمتار قطاعات الألوميتال والزجاج للشبابيك: ${totalWindowsArea.toFixed(1)} م²
- مسطح أسقف الجبسوم بورد المعلقة: ${gypsumBoardArea} م²
- حصر الأبواب: ${bedroomDoorsCount} باب غرف + ${bathroomDoorsCount} باب حمام + 1 باب شقة

🧱 *تقدير حصر المَوَن والخامات الإنشائية:*
- الأسمنت الإجمالي: ~${totalCementBags} شكارة (أرضيات${totalPlasterArea > 0 ? ' + محارة' : ''})
- الرمل الإجمالي: ~${totalSandM3} متر مكعب (ردم ومونة)
- معجون الحوائط: ~${puttyBuckets} بستلة
- سيلر وبطانة: ~${sealerBuckets} بستلة
- دهانات تشطيب فينش: ~${finishPaintBuckets} بستلة

💰 *التكلفة التقديرية المبدئية للباقة:* ${estimatedTotalCost.toLocaleString('ar-EG')} ج.م

مرحباً م. محمد العجيزي، أود مناقشة تفاصيل هذا الحصر الهندسي ومراجعة المقايسة لتحديد موعد المعاينة الهندسية للشقة.`

    window.open(`https://wa.me/201225433070?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Stepper Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative max-w-2xl mx-auto px-4">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 right-0 h-0.5 bg-accent-gold -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />

          {[
            { num: 1, label: 'حالة الوحدة والارتفاع' },
            { num: 2, label: 'الفراغات والشبابيك' },
            { num: 3, label: 'بيانات التواصل' },
            { num: 4, label: 'حصر الكميات والمقايسة' }
          ].map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 ${
                currentStep === s.num
                  ? 'bg-accent-gold text-bg-primary shadow-[0_0_20px_rgba(212,175,55,0.6)] scale-110'
                  : currentStep > s.num
                  ? 'bg-accent-gold/20 border-2 border-accent-gold text-accent-gold'
                  : 'bg-bg-tertiary border border-white/10 text-text-muted'
              }`}>
                {currentStep > s.num ? <Check size={16} /> : s.num}
              </div>
              <span className={`text-[11px] sm:text-xs font-bold mt-2 whitespace-nowrap ${
                currentStep >= s.num ? 'text-white' : 'text-text-muted'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Glass Panel */}
      <div className="bg-bg-secondary/95 border border-white/10 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        
        {/* Step 1: Unit State, Height, & Level */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-1.5">١. شقتك واصلة لأي مرحلة في التشطيب؟</h3>
              <p className="text-text-secondary text-xs sm:text-sm">بناءً على اختيارك، يتم تفعيل أو استبعاد بنود التأسيس والمحارة تلقائياً لتفادي أي تكاليف غير لازمة.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-4">
                {UNIT_STATES.map((st) => {
                  const isSelected = unitState === st.id
                  return (
                    <div
                      key={st.id}
                      onClick={() => setUnitState(st.id)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-accent-gold bg-accent-gold/15 shadow-[0_0_20px_rgba(212,175,55,0.25)] ring-1 ring-accent-gold'
                          : 'border-white/10 bg-bg-tertiary/60 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold font-bold">
                            {st.badge}
                          </span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-accent-gold bg-accent-gold text-bg-primary' : 'border-white/30'
                          }`}>
                            {isSelected && <Check size={12} />}
                          </div>
                        </div>
                        <h4 className="font-black text-sm text-white mb-1">{st.label}</h4>
                        <p className="text-text-secondary text-xs leading-relaxed">{st.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Ceiling Height with Quick Adjust */}
            <div className="p-5 rounded-2xl bg-bg-tertiary/70 border border-white/10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                    <Ruler size={17} className="text-accent-gold" />
                    <span>٢. ارتفاع الحوائط الصافي (من الشرب للأرضية)</span>
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">
                    الارتفاع الافتراضي القياسي لمعظم المباني هو <span className="text-accent-gold font-bold">2.80 متر</span>، ويمكنك تعديله بدقة.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setWallHeight(prev => Number(Math.max(2.40, prev - 0.05).toFixed(2)))}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-mono font-black text-base text-accent-gold px-2">
                    {wallHeight.toFixed(2)} م
                  </span>
                  <button
                    type="button"
                    onClick={() => setWallHeight(prev => Number(Math.min(4.50, prev + 0.05).toFixed(2)))}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Quick height presets */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <span className="text-xs text-text-muted font-bold">ارتفاعات شائعة:</span>
                {[2.70, 2.80, 3.00, 3.20].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setWallHeight(h)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                      wallHeight === h 
                        ? 'bg-accent-gold text-bg-primary border-accent-gold' 
                        : 'bg-white/5 border-white/10 text-text-secondary hover:text-white'
                    }`}
                  >
                    {h.toFixed(2)} م {h === 2.80 && '(الافتراضي)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Finishing Tier */}
            <div>
              <h3 className="text-base sm:text-lg font-black text-white mb-2">٣. باقة ومستوى التشطيب المطلوب</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {FINISHING_TIERS.map((tier) => {
                  const isSelected = finishingTier === tier.id
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setFinishingTier(tier.id)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-accent-gold bg-accent-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.2)] ring-1 ring-accent-gold'
                          : 'border-white/10 bg-bg-tertiary/50 hover:border-white/20'
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-accent-gold text-bg-primary text-[10px] font-black">
                          {tier.badge}
                        </span>
                      )}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-black text-sm text-white">{tier.title}</h4>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-accent-gold bg-accent-gold text-bg-primary' : 'border-white/30'
                          }`}>
                            {isSelected && <Check size={12} />}
                          </div>
                        </div>
                        <p className="text-text-secondary text-xs leading-relaxed mb-4">{tier.desc}</p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-text-muted font-bold">جودة المواصفة:</span>
                        <span className="text-accent-gold font-bold">{tier.badge}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Ceiling Gypsum Board Coverage */}
            <div className="p-4 rounded-2xl bg-bg-tertiary/60 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="font-bold text-sm text-white block mb-0.5">أعمال الأسقف المعلقة والجبسوم بورد:</span>
                <span className="text-xs text-text-muted">اختر نسبة تغطية الأسقف ببيوت النور والجبسوم بورد.</span>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { label: '١٠٠٪ كامل الشقة', val: 100 },
                  { label: '٨٠٪ ريسبشن وغرف رئيسية', val: 80 },
                  { label: 'بدون جبسوم بورد', val: 0 }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setCeilingCoverage(item.val)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      ceilingCoverage === item.val
                        ? 'bg-accent-gold text-bg-primary border-accent-gold'
                        : 'bg-white/5 border-white/10 text-text-secondary hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Spaces, Windows & Dimensions */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-1.5">تحديد أعداد ومقاسات الفراغات</h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                حدد أعداد الغرف والمرافق، وقم بمراجعة أو تعديل أبعاد الطول والعرض والشبابيك لحساب المسطحات بدقة هندسية.
              </p>
            </div>

            {/* Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { label: 'غرف النوم', value: roomsCount, setValue: setRoomsCount, max: 6, min: 1 },
                { label: 'قطع الريسبشن', value: receptionCount, setValue: setReceptionCount, max: 4, min: 1 },
                { label: 'غرف المعيشة (ليفينج)', value: livingCount, setValue: setLivingCount, max: 2, min: 0 },
                { label: 'الحمامات', value: bathroomsCount, setValue: setBathroomsCount, max: 4, min: 1 },
                { label: 'المطابخ', value: kitchensCount, setValue: setKitchensCount, max: 2, min: 1 },
                { label: 'الطرقة والممرات', value: corridorsCount, setValue: setCorridorsCount, max: 3, min: 1 },
                { label: 'البلكونات والتراس', value: balconiesCount, setValue: setBalconiesCount, max: 4, min: 0 }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-bg-tertiary/70 border border-white/10 flex flex-col justify-between"
                >
                  <span className="font-bold text-xs text-white mb-2">{item.label}</span>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      disabled={item.value <= item.min}
                      onClick={() => item.setValue(Math.max(item.min, item.value - 1))}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center disabled:opacity-30 cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-mono font-black text-base text-accent-gold">{item.value}</span>
                    <button
                      type="button"
                      disabled={item.value >= item.max}
                      onClick={() => item.setValue(Math.min(item.max, item.value + 1))}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center disabled:opacity-30 cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Room Dimensions & Windows Details */}
            <div className="space-y-6 pt-4 border-t border-white/10">
              
              {/* 1. Bedrooms */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-black text-accent-gold flex items-center gap-1.5">
                    <Home size={16} />
                    <span>مقاسات وشبابيك غرف النوم:</span>
                  </h4>
                  <span className="text-xs text-text-muted font-mono font-bold">إجمالي: {roomsFloorArea.toFixed(1)} م²</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeRooms.map((r, i) => (
                    <div key={r.id} className="p-3.5 rounded-2xl bg-bg-tertiary/60 border border-white/10 space-y-2.5">
                      <div className="flex justify-between items-center text-xs font-bold text-white border-b border-white/5 pb-2">
                        <span>غرفة {i + 1}</span>
                        <span className="text-accent-gold font-mono">{(r.length * r.width).toFixed(1)} م²</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-text-muted block mb-1">الطول (م)</span>
                          <input
                            type="number"
                            step="0.1"
                            value={r.length}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setRoomDims(prev => prev.map((item, idx) => idx === i ? { ...item, length: val } : item))
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-1.5 text-center text-white font-mono text-xs font-bold"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-text-muted block mb-1">العرض (م)</span>
                          <input
                            type="number"
                            step="0.1"
                            value={r.width}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setRoomDims(prev => prev.map((item, idx) => idx === i ? { ...item, width: val } : item))
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-1.5 text-center text-white font-mono text-xs font-bold"
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-text-muted">
                        <span className="flex items-center gap-1">
                          <AppWindow size={13} className="text-accent-gold" />
                          <span>الشباك:</span>
                        </span>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            step="0.1"
                            value={r.winW || 1.2}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setRoomDims(prev => prev.map((item, idx) => idx === i ? { ...item, winW: val } : item))
                            }}
                            className="w-11 bg-black/40 border border-white/10 rounded p-1 text-center text-white font-mono text-[11px]"
                          />
                          <span>×</span>
                          <input
                            type="number"
                            step="0.1"
                            value={r.winH || 1.2}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setRoomDims(prev => prev.map((item, idx) => idx === i ? { ...item, winH: val } : item))
                            }}
                            className="w-11 bg-black/40 border border-white/10 rounded p-1 text-center text-white font-mono text-[11px]"
                          />
                          <span className="font-mono text-accent-gold text-[10px]">({((r.winW || 1.2) * (r.winH || 1.2)).toFixed(1)}م²)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Reception & Living */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-black text-accent-gold flex items-center gap-1.5">
                    <Sparkles size={16} />
                    <span>مقاسات الريسبشن والليفينج (منطقة البورسلين/الرخام):</span>
                  </h4>
                  <span className="text-xs text-text-muted font-mono font-bold">إجمالي: {(receptionFloorArea + livingFloorArea).toFixed(1)} م²</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeReception.map((rec, i) => (
                    <div key={rec.id} className="p-3.5 rounded-2xl bg-bg-tertiary/60 border border-white/10 space-y-2.5">
                      <div className="flex justify-between items-center text-xs font-bold text-white border-b border-white/5 pb-2">
                        <span>قطعة ريسبشن {i + 1}</span>
                        <span className="text-accent-gold font-mono">{(rec.length * rec.width).toFixed(1)} م²</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-text-muted block mb-1">الطول (م)</span>
                          <input
                            type="number"
                            step="0.1"
                            value={rec.length}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setReceptionDims(prev => prev.map((item, idx) => idx === i ? { ...item, length: val } : item))
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-1.5 text-center text-white font-mono text-xs font-bold"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-text-muted block mb-1">العرض (م)</span>
                          <input
                            type="number"
                            step="0.1"
                            value={rec.width}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setReceptionDims(prev => prev.map((item, idx) => idx === i ? { ...item, width: val } : item))
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-1.5 text-center text-white font-mono text-xs font-bold"
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-text-muted">
                        <span className="flex items-center gap-1">
                          <AppWindow size={13} className="text-accent-gold" />
                          <span>الشباك/بلكونة:</span>
                        </span>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            step="0.1"
                            value={rec.winW || 1.5}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setReceptionDims(prev => prev.map((item, idx) => idx === i ? { ...item, winW: val } : item))
                            }}
                            className="w-12 bg-black/40 border border-white/10 rounded p-1 text-center text-white font-mono text-[11px]"
                          />
                          <span>×</span>
                          <input
                            type="number"
                            step="0.1"
                            value={rec.winH || 1.2}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setReceptionDims(prev => prev.map((item, idx) => idx === i ? { ...item, winH: val } : item))
                            }}
                            className="w-12 bg-black/40 border border-white/10 rounded p-1 text-center text-white font-mono text-[11px]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {activeLiving.map((liv, i) => (
                    <div key={liv.id} className="p-3.5 rounded-2xl bg-bg-tertiary/60 border border-white/10 space-y-2.5">
                      <div className="flex justify-between items-center text-xs font-bold text-white border-b border-white/5 pb-2">
                        <span>ليفينج {i + 1}</span>
                        <span className="text-accent-gold font-mono">{(liv.length * liv.width).toFixed(1)} م²</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-text-muted block mb-1">الطول (م)</span>
                          <input
                            type="number"
                            step="0.1"
                            value={liv.length}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setLivingDims(prev => prev.map((item, idx) => idx === i ? { ...item, length: val } : item))
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-1.5 text-center text-white font-mono text-xs font-bold"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-text-muted block mb-1">العرض (م)</span>
                          <input
                            type="number"
                            step="0.1"
                            value={liv.width}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setLivingDims(prev => prev.map((item, idx) => idx === i ? { ...item, width: val } : item))
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-1.5 text-center text-white font-mono text-xs font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Bathrooms & Kitchens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-accent-gold">الحمامات (سيراميك كامل):</span>
                    <span className="text-xs text-text-muted font-mono">{bathroomsFloorArea.toFixed(1)} م² أرضيات</span>
                  </div>
                  <div className="space-y-2.5">
                    {activeBathrooms.map((b, i) => (
                      <div key={b.id} className="p-3 rounded-xl bg-bg-tertiary/60 border border-white/10 flex items-center justify-between gap-2 text-xs">
                        <span className="font-bold text-white flex-shrink-0">حمام {i + 1}</span>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            step="0.1"
                            value={b.length}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setBathroomDims(prev => prev.map((item, idx) => idx === i ? { ...item, length: val } : item))
                            }}
                            className="w-14 bg-black/40 border border-white/10 rounded-lg p-1 text-center text-white font-mono"
                          />
                          <span className="text-text-muted">×</span>
                          <input
                            type="number"
                            step="0.1"
                            value={b.width}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setBathroomDims(prev => prev.map((item, idx) => idx === i ? { ...item, width: val } : item))
                            }}
                            className="w-14 bg-black/40 border border-white/10 rounded-lg p-1 text-center text-white font-mono"
                          />
                          <span className="text-accent-gold font-mono font-bold text-xs mr-1.5">={(b.length * b.width).toFixed(1)}م²</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-accent-gold">المطابخ:</span>
                    <span className="text-xs text-text-muted font-mono">{kitchensFloorArea.toFixed(1)} م² أرضيات</span>
                  </div>
                  <div className="space-y-2.5">
                    {activeKitchens.map((k, i) => (
                      <div key={k.id} className="p-3 rounded-xl bg-bg-tertiary/60 border border-white/10 flex items-center justify-between gap-2 text-xs">
                        <span className="font-bold text-white flex-shrink-0">مطبخ {i + 1}</span>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            step="0.1"
                            value={k.length}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setKitchenDims(prev => prev.map((item, idx) => idx === i ? { ...item, length: val } : item))
                            }}
                            className="w-14 bg-black/40 border border-white/10 rounded-lg p-1 text-center text-white font-mono"
                          />
                          <span className="text-text-muted">×</span>
                          <input
                            type="number"
                            step="0.1"
                            value={k.width}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0
                              setKitchenDims(prev => prev.map((item, idx) => idx === i ? { ...item, width: val } : item))
                            }}
                            className="w-14 bg-black/40 border border-white/10 rounded-lg p-1 text-center text-white font-mono"
                          />
                          <span className="text-accent-gold font-mono font-bold text-xs mr-1.5">={(k.length * k.width).toFixed(1)}م²</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total Summary Strip */}
              <div className="p-4 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Calculator size={18} className="text-accent-gold" />
                  <span className="font-bold text-white">إجمالي مساحة الشقة الصافية المحسوبة:</span>
                  <span className="font-mono font-black text-sm text-accent-gold">{Math.round(totalFloorArea)} م²</span>
                </div>
                <div className="text-text-muted">
                  محيط الحوائط الإجمالي: <span className="font-mono text-white font-bold">{Math.round(totalPerimeter)} م.ط</span> | عدد الأبواب: <span className="font-mono text-white font-bold">{totalDoorsCount}</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Step 3: Contact & Site Details */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-1.5">بيانات العميل ومعاينة المشروع</h3>
              <p className="text-text-secondary text-xs sm:text-sm">سجل بياناتك لإصدار كشف حصر المقايسة الرسمي باسمك وجدولة موعد المعاينة.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-secondary mb-2">الاسم الكامل *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="مثال: أحمد عبد الله"
                    className="w-full bg-bg-tertiary border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-bold outline-none focus:border-accent-gold transition-colors pl-10"
                  />
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary mb-2">رقم الهاتف / واتساب *</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    dir="ltr"
                    className="w-full bg-bg-tertiary border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-bold outline-none focus:border-accent-gold transition-colors pl-10 text-right"
                  />
                  <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary mb-2">المدينة / المحافظة</label>
                <div className="relative">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="مثال: القاهرة الجديدة / التجمع"
                    className="w-full bg-bg-tertiary border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-bold outline-none focus:border-accent-gold transition-colors pl-10"
                  />
                  <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary mb-2">الدور / الطابق</label>
                <select
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-full bg-bg-tertiary border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-bold outline-none focus:border-accent-gold transition-colors cursor-pointer"
                >
                  <option value="أرضي / جاردن">أرضي / جاردن</option>
                  <option value="الدور الأول">الدور الأول</option>
                  <option value="الدور الثاني">الدور الثاني</option>
                  <option value="الدور الثالث">الدور الثالث</option>
                  <option value="الدور الرابع">الدور الرابع</option>
                  <option value="الدور الخامس فما فوق">الدور الخامس فما فوق</option>
                  <option value="رووف / دوبلكس">رووف / دوبلكس</option>
                </select>
              </div>
            </div>

            {/* Engineer Supervision Guarantee */}
            <div className="p-4 rounded-2xl bg-bg-primary/80 border border-white/10 flex items-start gap-3.5">
              <ShieldCheck size={22} className="text-accent-gold flex-shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-text-secondary">
                <span className="font-bold text-white block mb-0.5">ضمان الدقة الهندسية والإشراف المعتمد:</span>
                تخضع المقايسة وحصر الكميات للمراجعة المباشرة من قِبل <span className="text-accent-gold font-bold">م. محمد العجيزي</span> وفريق المكتب الفني لضمان مطابقة المواصفات الهندسية وأفضل استغلال للمساحات.
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: The Final Comprehensive BOQ & Materials Report */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
            ref={quotePrintRef}
          >
            {/* Report Header */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-accent-gold/20 via-bg-tertiary to-bg-tertiary border border-accent-gold/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BadgeCheck size={18} className="text-accent-gold" />
                  <span className="text-xs text-accent-gold font-bold uppercase tracking-wider">كشف حصر كميات ومقايسة معتمدة</span>
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-white font-mono text-xs">{quoteCode}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  مقايسة العميل: {clientName}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  {city} · مساحة صافية {Math.round(totalFloorArea)} م² · ارتفاع {wallHeight.toFixed(2)} م · {selectedStateObj.badge}
                </p>
              </div>

              <div className="text-left sm:text-right w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <span className="text-xs text-text-muted font-bold block">التقدير المالي المبدئي للباقة</span>
                <span className="text-2xl sm:text-3xl font-black text-gold-gradient">
                  {estimatedTotalCost.toLocaleString('ar-EG')} <span className="text-sm text-white">ج.م</span>
                </span>
              </div>
            </div>

            {/* Report View Tabs */}
            <div className="flex items-center justify-center gap-2 border-b border-white/10 pb-4">
              {[
                { id: 'surfaces', label: 'حصر المسطحات الهندسية (BOQ)', icon: Layers },
                { id: 'materials', label: 'تقدير المَوَن والخامات الإنشائية', icon: Boxes },
                { id: 'dimensions', label: 'جدول أبعاد الفراغات والشبابيك', icon: Ruler }
              ].map((tab) => {
                const Icon = tab.icon
                const isSelected = reportTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setReportTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-accent-gold text-bg-primary shadow-lg shadow-accent-gold/20'
                        : 'bg-bg-tertiary text-text-secondary hover:text-white'
                    }`}
                  >
                    <Icon size={15} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab 1: Surface Areas (BOQ) */}
            {reportTab === 'surfaces' && (
              <div className="space-y-4">
                <div className="divide-y divide-white/5 border border-white/10 rounded-2xl overflow-hidden bg-bg-tertiary/40">
                  {[
                    { label: 'أرضيات بورسلين / رخام (ريسبشن + ليفينج + طرقات)', area: `${Math.round(porcelainArea)} م²`, note: 'خامات فرز أول معتمدة' },
                    { label: 'أرضيات سيراميك أو HDF باركيه (غرف النوم)', area: `${Math.round(bedroomCeramicArea)} م²`, note: 'عزل أرضيات وتركيب هندسي' },
                    { label: 'أرضيات سيراميك حمامات ومطابخ وبلكونات', area: `${Math.round(serviceCeramicArea)} م²`, note: 'مقاوم للانزلاق مع عزل كيميائي' },
                    { label: 'سيراميك حوائط الحمامات والمطابخ (من الأرض للسقف)', area: `${Math.round(wetWallsNetCeramicArea)} م²`, note: `ارتفاع ${wallHeight.toFixed(2)}م بعد خصم الفتحات` },
                    ...(totalPlasterArea > 0 ? [{ label: 'مسطح حوائط وأسقف المحارة', area: `${totalPlasterArea} م²`, note: 'بؤج وأوتار وأسمنت مقاوم' }] : []),
                    { label: 'مسطح حوائط الدهانات والنقاشة الفينش', area: `${Math.round(dryWallsNetPaintArea)} م²`, note: 'سيلر + 3 سكينات معجون + دهان قابل للغسيل' },
                    { label: 'أسقف معلقة وبيوت نور جبسوم بورد', area: `${gypsumBoardArea} م²`, note: `نسبة تغطية ${ceilingCoverage}٪ من مساحة الشقة` },
                    { label: 'قطاعات الألوميتال والزجاج (الشبابيك)', area: `${totalWindowsArea.toFixed(1)} م²`, note: 'قطاعات عازلة للصوت والأتربة' },
                    { label: 'أمتار الوزر السيراميك بالمتر الطولي', area: `${skirtingLength} م.ط`, note: 'محيط الحوائط بعد خصم فتحات الأبواب' },
                    { label: 'حصر الأبواب الداخلية والخارجية', area: `${totalDoorsCount} باب`, note: `${bedroomDoorsCount} باب غرف + ${bathroomDoorsCount} باب حمام + 1 باب شقة` }
                  ].map((row, i) => (
                    <div key={i} className="p-3.5 sm:p-4 flex items-center justify-between text-xs sm:text-sm hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-accent-gold/15 text-accent-gold font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                        <div>
                          <div className="font-bold text-white">{row.label}</div>
                          <div className="text-[11px] text-text-muted">{row.note}</div>
                        </div>
                      </div>
                      <div className="font-mono font-black text-sm text-accent-gold flex-shrink-0">
                        {row.area}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Materials Takeoff (المَوَن والخامات) */}
            {reportTab === 'materials' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 text-xs text-text-secondary leading-relaxed">
                  <span className="font-bold text-white block mb-1">تقدير المَوَن الإنشائية وفقاً لمعادلات الكود الهندسي:</span>
                  يتم حساب شكائر الأسمنت وأمتار الرمل وبستلات الدهان تلقائياً بناءً على مسطحات الفراغات والارتفاع (${wallHeight.toFixed(2)}م) لمساعدة العميل في معرفة التشوينات المطلوبة مسبقاً.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-bg-tertiary/70 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-accent-gold font-black text-sm">
                      <Boxes size={18} />
                      <span>الأسمنت (بورتلاندي معتمد)</span>
                    </div>
                    <div className="text-2xl font-black text-white font-mono">
                      ~{totalCementBags} <span className="text-xs text-text-muted">شكارة</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      يشمل مَوَن تركيب سيراميك الأرضيات والحوائط{totalPlasterArea > 0 ? ' ومَوَن أعمال المحارة' : ''}.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-bg-tertiary/70 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-accent-gold font-black text-sm">
                      <Layers size={18} />
                      <span>الرمل (ردم ومونة)</span>
                    </div>
                    <div className="text-2xl font-black text-white font-mono">
                      ~{totalSandM3} <span className="text-xs text-text-muted">متر مكعب (م³)</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      يشمل رمل ردم وفرش الأرضيات (بمتوسط 10سم){totalPlasterArea > 0 ? ' + رمل المحارة النظيف' : ''}.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-bg-tertiary/70 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-accent-gold font-black text-sm">
                      <Paintbrush size={18} />
                      <span>معجون الحوائط (3 أوجه)</span>
                    </div>
                    <div className="text-2xl font-black text-white font-mono">
                      ~{puttyBuckets} <span className="text-xs text-text-muted">بستلة معجون</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      لتجهيز وسحب مسطح الحوائط الجافة ({Math.round(dryWallsNetPaintArea)} م²).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-bg-tertiary/70 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-accent-gold font-black text-sm">
                      <Sparkles size={18} />
                      <span>سيلر مائي وبطانة</span>
                    </div>
                    <div className="text-2xl font-black text-white font-mono">
                      ~{sealerBuckets} <span className="text-xs text-text-muted">بستلة سيلر</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      لعزل مسطح المحارة وتأسيس قاعدة الدهانات.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-bg-tertiary/70 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-accent-gold font-black text-sm">
                      <Paintbrush size={18} />
                      <span>دهانات الفينش والتشطيب</span>
                    </div>
                    <div className="text-2xl font-black text-white font-mono">
                      ~{finishPaintBuckets} <span className="text-xs text-text-muted">بستلة دهان</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      دهان بلاستيك نصف لامع قابل للغسيل (وجهين تشطيب).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-bg-tertiary/70 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-accent-gold font-black text-sm">
                      <DoorClosed size={18} />
                      <span>الأبواب والفتحات</span>
                    </div>
                    <div className="text-2xl font-black text-white font-mono">
                      {totalDoorsCount} <span className="text-xs text-text-muted">باب</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      {bedroomDoorsCount} باب غرف + {bathroomDoorsCount} باب حمام + 1 باب شقة.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Dimensions Schedule */}
            {reportTab === 'dimensions' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs">
                  {activeRooms.map((r, i) => (
                    <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <div className="font-bold text-white">غرفة نوم {i + 1}</div>
                      <div className="text-accent-gold font-mono">{r.length}×{r.width}م ({(r.length * r.width).toFixed(1)}م²)</div>
                      <div className="text-[10px] text-text-muted">شباك: {r.winW || 1.2}×{r.winH || 1.2}م</div>
                    </div>
                  ))}
                  {activeReception.map((r, i) => (
                    <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <div className="font-bold text-white">ريسبشن {i + 1}</div>
                      <div className="text-accent-gold font-mono">{r.length}×{r.width}م ({(r.length * r.width).toFixed(1)}م²)</div>
                      <div className="text-[10px] text-text-muted">شباك: {r.winW || 1.5}×{r.winH || 1.2}م</div>
                    </div>
                  ))}
                  {activeBathrooms.map((b, i) => (
                    <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <div className="font-bold text-white">حمام {i + 1}</div>
                      <div className="text-accent-gold font-mono">{b.length}×{b.width}م ({(b.length * b.width).toFixed(1)}م²)</div>
                    </div>
                  ))}
                  {activeKitchens.map((k, i) => (
                    <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <div className="font-bold text-white">مطبخ {i + 1}</div>
                      <div className="text-accent-gold font-mono">{k.length}×{k.width}م ({(k.length * k.width).toFixed(1)}م²)</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
              >
                <MessageCircle size={18} />
                <span>إرسال الحصر والمقايسة للمهندس محمد العجيزي عبر واتساب</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-bg-tertiary border border-white/10 hover:border-accent-gold text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Printer size={16} />
                <span>طباعة / حفظ PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-white/5 text-text-muted hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>حساب مقايسة جديدة</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons (Steps 1 to 3) */}
        {currentStep < 4 && (
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <ArrowRight size={16} />
                <span>السابق</span>
              </button>
            ) : <div />}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleNext}
              className="btn-premium inline-flex items-center gap-2 px-7 py-3 text-sm cursor-pointer"
            >
              <span>{currentStep === 3 ? 'إصدار تقرير حصر المقايسة النهائي' : 'الخطوة التالية'}</span>
              <ArrowLeft size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProfessionalQuotationWizard
