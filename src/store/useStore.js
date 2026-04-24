import { create } from 'zustand'

export const useStore = create((set) => ({
  // Authentication State
  isAuthenticated: false,
  login: (email, password) => {
    // Mock login logic
    if (email === 'admin@mazar.com' && password === 'admin123') {
      set({ isAuthenticated: true })
      return true
    }
    return false
  },
  logout: () => set({ isAuthenticated: false }),

  // Clients Data
  clients: [
    { id: 1, name: 'أحمد إبراهيم', email: 'ahmed@example.com', phone: '+20 123 456 7890', projects: '٢', status: 'نشط', rating: 5 },
    { id: 2, name: 'شركة مودرن تك', email: 'hr@moderntech.com', phone: '+20 987 654 3210', projects: '١', status: 'محتمل', rating: 4 },
    { id: 3, name: 'سارة كمال', email: 'sarah.k@gmail.com', phone: '+20 111 222 3333', projects: '٣', status: 'نشط', rating: 5 },
    { id: 4, name: 'يوسف علي', email: 'youssef@ali.me', phone: '+20 555 666 7777', projects: '١', status: 'مكتمل', rating: 5 },
    { id: 5, name: 'ليلى حسن', email: 'laila@luxury.com', phone: '+20 444 333 2222', projects: '٠', status: 'محتمل', rating: 3 },
  ],
  addClient: (client) => set((state) => ({ 
    clients: [...state.clients, { ...client, id: state.clients.length + 1 }] 
  })),

  // Projects Data (Kanban)
  projects: [
    { id: 1, name: 'فيلا الرحاب', client: 'أحمد إبراهيم', type: 'سكني', status: 'التنفيذ', progress: 65, budget: '١٢٠,٠٠٠ ج.م', deadline: '٢٤ مايو ٢٠٢٦', location: 'القاهرة الجديدة' },
    { id: 2, name: 'مجمع أونيكس', client: 'شركة مودرن تك', type: 'تجاري', status: 'التصميم', progress: 30, budget: '٤٥,٠٠٠ ج.م', deadline: '١٥ يونيو ٢٠٢٦', location: 'المعادي' },
    { id: 3, name: 'بنتهاوس جولد', client: 'سارة كمال', type: 'مودرن', status: 'التوريد', progress: 85, budget: '٨٥,٠٠٠ ج.م', deadline: '١٠ مايو ٢٠٢٦', location: 'الشيخ زايد' },
    { id: 4, name: 'لوفت بسيط', client: 'يوسف علي', type: 'داخلي', status: 'التسليم', progress: 100, budget: '٣٢,٠٠٠ ج.م', deadline: '٢٠ أبريل ٢٠٢٦', location: 'مصر الجديدة' },
  ],
  addProject: (project) => set((state) => ({ 
    projects: [...state.projects, { ...project, id: state.projects.length + 1 }] 
  })),
  updateProjectStatus: (id, newStatus) => set((state) => ({
    projects: state.projects.map(p => p.id === id ? { ...p, status: newStatus } : p)
  })),

  // Quotations Data
  quotes: [
    { id: 'Q-1042', client: 'محمود سعد', type: 'تشطيب فيلا كامل', date: '٢٤ أبريل ٢٠٢٦', value: '١,٢٠٠,٠٠٠ ج.م', status: 'pending' },
    { id: 'Q-1041', client: 'شركة الإعمار', type: 'مقر إداري', date: '٢٢ أبريل ٢٠٢٦', value: '٤٥٠,٠٠٠ ج.م', status: 'approved' },
    { id: 'Q-1040', client: 'هدى عامر', type: 'لاندسكيب وحمام سباحة', date: '٢٠ أبريل ٢٠٢٦', value: '٣٢٠,٠٠٠ ج.م', status: 'rejected' },
    { id: 'Q-1039', client: 'كريم مجدي', type: 'تعديلات معمارية', date: '١٨ أبريل ٢٠٢٦', value: '٨٥,٠٠٠ ج.م', status: 'approved' },
  ],
  addQuote: (quote) => set((state) => ({ 
    quotes: [{ ...quote, id: `Q-10${state.quotes.length + 43}` }, ...state.quotes] 
  })),
  updateQuoteStatus: (id, status) => set((state) => ({
    quotes: state.quotes.map(q => q.id === id ? { ...q, status } : q)
  })),

  // CMS: Web Content Data
  webContent: {
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
  },
  updateHero: (heroData) => set((state) => ({
    webContent: { ...state.webContent, hero: heroData }
  })),
  addPortfolioItem: (item) => set((state) => ({
    webContent: { 
      ...state.webContent, 
      portfolio: [{ ...item, id: state.webContent.portfolio.length + 1 }, ...state.webContent.portfolio] 
    }
  }))
}))
