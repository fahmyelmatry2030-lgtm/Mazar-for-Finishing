import React from 'react'
import { Settings as SettingsIcon, Building, Users, Shield, Save } from 'lucide-react'

const Settings = () => {
  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2">الإعدادات <span className="text-gold-gradient">العامة</span></h1>
          <p className="text-gray-700 font-medium">إدارة النظام، مكاتب الشركة، وصلاحيات الموظفين.</p>
        </div>
        <button className="btn-premium py-3 px-6 text-sm rounded-lg flex items-center gap-2">
          <Save size={18} /> حفظ التعديلات
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Settings Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 p-4 bg-accent-gold/10 text-accent-gold border-r-2 border-accent-gold font-black">
            <Building size={20} /> بيانات الشركة
          </button>
          <button className="w-full flex items-center gap-3 p-4 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all font-black">
            <Users size={20} /> فريق العمل
          </button>
          <button className="w-full flex items-center gap-3 p-4 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all font-black">
            <Shield size={20} /> الصلاحيات والأمان
          </button>
          <button className="w-full flex items-center gap-3 p-4 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all font-black">
            <SettingsIcon size={20} /> إعدادات النظام
          </button>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 bg-white shadow-sm border border-gray-200 rounded-2xl p-8">
          <h3 className="text-xl font-black mb-8">بيانات الشركة والمكاتب</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">اسم الشركة</label>
                <input type="text" defaultValue="مزار للتشطيبات" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-accent-gold outline-none" />
              </div>
              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">رقم التسجيل الضريبي</label>
                <input type="text" defaultValue="123-456-789" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-accent-gold outline-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">المقر الرئيسي</label>
              <textarea defaultValue="التجمع الخامس، شارع التسعين الشمالي، مبنى أونيكس الإداري، الدور الرابع" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-accent-gold outline-none h-24" />
            </div>

            <div>
              <h4 className="text-lg font-black mb-4 mt-8">فروع الشركة</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-black">فرع الشيخ زايد</p>
                    <p className="text-sm text-gray-700">أركان بلازا، مبنى C</p>
                  </div>
                  <button className="text-sm font-black text-red-500 hover:bg-red-500/10 px-3 py-1 rounded">إزالة</button>
                </div>
                <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-700 hover:border-accent-gold hover:text-accent-gold transition-colors font-black">
                  + إضافة فرع جديد
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Settings
