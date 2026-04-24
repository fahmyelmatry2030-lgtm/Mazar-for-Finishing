import { 
  collection, getDocs, addDoc, updateDoc, deleteDoc, 
  doc, setDoc, getDoc, serverTimestamp, query, orderBy 
} from 'firebase/firestore'
import { db } from '../firebase'

// ── Default seed data ──────────────────────────────────────────────────────────
const DEFAULT_PROJECTS = [
  { name: 'فيلا الرحاب', client: 'أحمد إبراهيم', type: 'سكني', status: 'التنفيذ', progress: 65, budget: '١٢٠,٠٠٠ ج.م', deadline: '٢٤ مايو ٢٠٢٦', location: 'القاهرة الجديدة' },
  { name: 'مجمع أونيكس', client: 'شركة مودرن تك', type: 'تجاري', status: 'التصميم', progress: 30, budget: '٤٥,٠٠٠ ج.م', deadline: '١٥ يونيو ٢٠٢٦', location: 'المعادي' },
  { name: 'بنتهاوس جولد', client: 'سارة كمال', type: 'مودرن', status: 'التوريد', progress: 85, budget: '٨٥,٠٠٠ ج.م', deadline: '١٠ مايو ٢٠٢٦', location: 'الشيخ زايد' },
  { name: 'لوفت بسيط', client: 'يوسف علي', type: 'داخلي', status: 'التسليم', progress: 100, budget: '٣٢,٠٠٠ ج.م', deadline: '٢٠ أبريل ٢٠٢٦', location: 'مصر الجديدة' },
]
const DEFAULT_CLIENTS = [
  { name: 'أحمد إبراهيم', email: 'ahmed@example.com', phone: '+20 123 456 7890', projects: '٢', status: 'نشط', rating: 5 },
  { name: 'شركة مودرن تك', email: 'hr@moderntech.com', phone: '+20 987 654 3210', projects: '١', status: 'محتمل', rating: 4 },
  { name: 'سارة كمال', email: 'sarah.k@gmail.com', phone: '+20 111 222 3333', projects: '٣', status: 'نشط', rating: 5 },
  { name: 'يوسف علي', email: 'youssef@ali.me', phone: '+20 555 666 7777', projects: '١', status: 'مكتمل', rating: 5 },
  { name: 'ليلى حسن', email: 'laila@luxury.com', phone: '+20 444 333 2222', projects: '٠', status: 'محتمل', rating: 3 },
]
const DEFAULT_QUOTES = [
  { client: 'محمود سعد', type: 'تشطيب فيلا كامل', date: '٢٤ أبريل ٢٠٢٦', value: '١,٢٠٠,٠٠٠ ج.م', status: 'pending' },
  { client: 'شركة الإعمار', type: 'مقر إداري', date: '٢٢ أبريل ٢٠٢٦', value: '٤٥٠,٠٠٠ ج.م', status: 'approved' },
  { client: 'هدى عامر', type: 'لاندسكيب وحمام سباحة', date: '٢٠ أبريل ٢٠٢٦', value: '٣٢٠,٠٠٠ ج.م', status: 'rejected' },
  { client: 'كريم مجدي', type: 'تعديلات معمارية', date: '١٨ أبريل ٢٠٢٦', value: '٨٥,٠٠٠ ج.م', status: 'approved' },
]
const DEFAULT_EXPENSES = [
  { description: 'شراء خامات بورسلين', category: 'مواد بناء', amount: 45000, date: '٢٠ أبريل ٢٠٢٦' },
  { description: 'أجور عمال التشطيب', category: 'أجور', amount: 12000, date: '٢٢ أبريل ٢٠٢٦' },
  { description: 'حملة إعلانات فيسبوك', category: 'تسويق', amount: 3000, date: '٢٤ أبريل ٢٠٢٦' },
]
const DEFAULT_WEBCONTENT = {
  hero: {
    subtitle: 'مزار للتشطيبات المعمارية',
    titleHighlight: 'رؤيتك',
    titleNormal: 'تتجسد في مساحات استثنائية',
    description: 'نحن لا نقوم بالتشطيب فقط، بل نصيغ تجربة معمارية فاخرة تعكس شخصيتك. دقة في التفاصيل، جودة في الخامات، ورؤية تتخطى التوقعات.'
  },
  services: [
    { id: '01', title: 'التصميم المعماري والداخلي', desc: 'نحول المساحات إلى تحف فنية تلائم أسلوب حياتك.', icon: 'PenTool' },
    { id: '02', title: 'التشطيبات المتكاملة', desc: 'تنفيذ دقيق بأعلى معايير الجودة العالمية.', icon: 'Hammer' },
    { id: '03', title: 'الحلول الذكية', desc: 'دمج التكنولوجيا لتجربة سكنية عصرية ومريحة.', icon: 'Cpu' },
  ],
  portfolio: [
    { id: 1, title: 'فيلا أونيكس', category: 'تشطيب كامل', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80', description: 'تصميم وتشطيب فيلا فاخرة بالتجمع الخامس.' },
    { id: 2, title: 'بنتهاوس زايد', category: 'تصميم داخلي', image: 'https://images.unsplash.com/photo-1600607687931-cece5ce21711?auto=format&fit=crop&q=80', description: 'استغلال أمثل للمساحات مع طابع عصري حديث.' },
    { id: 3, title: 'مقر العاصمة', category: 'تجاري', image: 'https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?auto=format&fit=crop&q=80', description: 'مقر إداري بتصميم يعزز الإنتاجية والرفاهية.' },
    { id: 4, title: 'شقة جاردينيا', category: 'تشطيب جزئي', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80', description: 'تجديد كامل للريسبشن وغرف النوم بخامات مستوردة.' }
  ]
}

// ── Helper: fetch & auto-seed collection ───────────────────────────────────────
const fetchOrSeed = async (collectionName, defaults) => {
  const q = query(collection(db, collectionName), orderBy('createdAt', 'asc'))
  const snap = await getDocs(q).catch(() => null)
  
  if (!snap || snap.empty) {
    // Seed with defaults
    for (const item of defaults) {
      await addDoc(collection(db, collectionName), { ...item, createdAt: serverTimestamp() })
    }
    return defaults.map((item, i) => ({ ...item, id: `seed_${i}` }))
  }
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── Projects ──────────────────────────────────────────────────────────────────
export const fetchProjects = () => fetchOrSeed('projects', DEFAULT_PROJECTS)
export const addProjectFS = async (project) => {
  const docRef = await addDoc(collection(db, 'projects'), { ...project, createdAt: serverTimestamp() })
  return docRef.id
}
export const updateProjectFS = async (id, data) => {
  await updateDoc(doc(db, 'projects', id), data)
}

// ── Clients ───────────────────────────────────────────────────────────────────
export const fetchClients = () => fetchOrSeed('clients', DEFAULT_CLIENTS)
export const addClientFS = async (client) => {
  const docRef = await addDoc(collection(db, 'clients'), { ...client, createdAt: serverTimestamp() })
  return docRef.id
}

// ── Quotations ────────────────────────────────────────────────────────────────
export const fetchQuotes = async () => {
  const q = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q).catch(() => null)
  if (!snap || snap.empty) {
    for (const item of DEFAULT_QUOTES) {
      await addDoc(collection(db, 'quotes'), { ...item, createdAt: serverTimestamp() })
    }
    return DEFAULT_QUOTES.map((item, i) => ({ ...item, id: `seed_${i}` }))
  }
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
export const addQuoteFS = async (quote) => {
  const docRef = await addDoc(collection(db, 'quotes'), { ...quote, createdAt: serverTimestamp() })
  return docRef.id
}
export const updateQuoteFS = async (id, data) => {
  await updateDoc(doc(db, 'quotes', id), data)
}

// ── Expenses ──────────────────────────────────────────────────────────────────
export const fetchExpenses = () => fetchOrSeed('expenses', DEFAULT_EXPENSES)
export const addExpenseFS = async (expense) => {
  const docRef = await addDoc(collection(db, 'expenses'), { ...expense, createdAt: serverTimestamp() })
  return docRef.id
}
export const deleteExpenseFS = async (id) => {
  await deleteDoc(doc(db, 'expenses', id))
}

// ── Web Content (CMS) ─────────────────────────────────────────────────────────
const WEB_CONTENT_DOC = 'main'
export const fetchWebContent = async () => {
  const docRef = doc(db, 'webContent', WEB_CONTENT_DOC)
  const snap = await getDoc(docRef)
  if (!snap.exists()) {
    await setDoc(docRef, DEFAULT_WEBCONTENT)
    return DEFAULT_WEBCONTENT
  }
  return snap.data()
}
export const saveWebContentFS = async (data) => {
  const docRef = doc(db, 'webContent', WEB_CONTENT_DOC)
  await setDoc(docRef, data, { merge: true })
}
