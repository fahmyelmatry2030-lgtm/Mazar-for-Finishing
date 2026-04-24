import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search,
  FileText
} from 'lucide-react'

const SidebarItem = ({ icon: Icon, label, to, active }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-4 px-6 py-4 transition-all ${active ? 'bg-accent-gold/10 text-accent-gold border-l-2 border-accent-gold' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
  >
    <Icon size={20} />
    <span className="font-bold tracking-wide text-sm">{label}</span>
  </Link>
)

const DashboardLayout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const logout = useStore(state => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-primary overflow-hidden" dir="rtl">
      {/* Sidebar */}
      <aside className="w-72 border-l border-glass-border flex flex-col bg-bg-secondary">
        <div className="p-8 mb-4">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-8 h-8 bg-accent-gold flex items-center justify-center rounded-sm">
              <span className="text-bg-primary font-black text-sm">M</span>
            </div>
            <div className="text-xl font-black text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              مزار <span className="text-accent-gold text-xs font-normal">النظام الإداري</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1">
          <SidebarItem icon={LayoutDashboard} label="نظرة عامة" to="/dashboard" active={location.pathname === '/dashboard'} />
          <SidebarItem icon={Briefcase} label="المشاريع القائمة" to="/dashboard/projects" active={location.pathname === '/dashboard/projects'} />
          <SidebarItem icon={Users} label="قاعدة العملاء" to="/dashboard/clients" active={location.pathname === '/dashboard/clients'} />
          <SidebarItem icon={FileText} label="عروض الأسعار" to="/dashboard/quotations" active={location.pathname === '/dashboard/quotations'} />
          <SidebarItem icon={BarChart3} label="التقارير المالية" to="/dashboard/finance" active={location.pathname === '/dashboard/finance'} />
        </nav>

        <div className="p-6 border-t border-glass-border">
          <SidebarItem icon={Settings} label="الإعدادات" to="/dashboard/settings" active={location.pathname === '/dashboard/settings'} />
          <button onClick={handleLogout} className="flex items-center gap-4 px-6 py-4 w-full text-red-500 hover:bg-red-500/10 transition-all mt-2 rounded-lg">
            <LogOut size={20} />
            <span className="font-bold text-sm">تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-20 border-b border-glass-border px-10 flex items-center justify-between bg-primary/50 backdrop-blur-md z-20">
          <div className="relative w-96">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن مشروع أو عميل..." 
              className="w-full bg-white/5 border border-glass-border rounded-full py-2.5 pr-12 pl-4 text-sm focus:border-accent-gold outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-text-secondary hover:text-white transition-all">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent-gold rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pr-6 border-r border-glass-border">
              <div className="text-left">
                <p className="text-sm font-bold">المهندس المسؤول</p>
                <p className="text-[10px] uppercase text-accent-gold font-bold tracking-wider">كبير المصممين</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent-gold flex items-center justify-center text-black font-black">
                م
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <section className="flex-1 overflow-y-auto p-10 bg-[#0c0c0c]">
          {children}
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .h-screen { height: 100vh; }
        .w-64 { width: 16rem; }
        .flex-1 { flex: 1 1 0%; }
        .overflow-hidden { overflow: hidden; }
        .overflow-y-auto { overflow-y: auto; }
        .border-r { border-right-width: 1px; }
        .border-l { border-left-width: 1px; }
        .border-t { border-top-width: 1px; }
        .border-bottom { border-bottom-width: 1px; }
        .p-8 { padding: 2rem; }
        .p-6 { padding: 1.5rem; }
        .p-10 { padding: 2.5rem; }
        .bg-primary { background-color: var(--bg-primary); }
        .text-red-500 { color: #ef4444; }
        .hover\\:bg-red-500\\/10:hover { background-color: rgba(239, 68, 68, 0.1); }
      `}} />
    </div>
  )
}

export default DashboardLayout
