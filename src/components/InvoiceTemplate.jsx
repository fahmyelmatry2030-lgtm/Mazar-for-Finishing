import React, { forwardRef } from 'react'

export const InvoiceTemplate = forwardRef(({ quote }, ref) => {
  if (!quote) return null

  // Date formatting
  const dateStr = quote.createdAt?.toDate 
    ? new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(quote.createdAt.toDate())
    : quote.date || new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(new Date())

  // Generate a random invoice number based on ID or Date
  const invoiceNumber = quote.id ? quote.id.slice(0, 6).toUpperCase() : Math.floor(Math.random() * 1000000)

  return (
    <div ref={ref} className="bg-white text-black p-12 mx-auto" style={{ width: '210mm', minHeight: '297mm', direction: 'rtl' }}>
      
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-gray-200 pb-8 mb-8">
        <div>
          <h1 className="text-4xl font-black text-[#D4AF37] mb-2 tracking-wider">مـــزار</h1>
          <p className="text-gray-500 font-bold text-sm tracking-widest">للتشطيبات المعمارية الفاخرة</p>
        </div>
        <div className="text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">فاتورة / عرض سعر</h2>
          <p className="text-gray-500 text-sm">رقم: #{invoiceNumber}</p>
          <p className="text-gray-500 text-sm">التاريخ: {dateStr}</p>
        </div>
      </div>

      {/* Client & Company Info */}
      <div className="flex justify-between mb-12">
        <div className="w-1/2">
          <h3 className="text-gray-500 font-bold mb-2">مقدمة إلى:</h3>
          <p className="text-xl font-bold text-gray-800">{quote.client}</p>
          <p className="text-gray-600 mt-1">المشروع: {quote.type}</p>
        </div>
        <div className="w-1/2 text-left">
          <h3 className="text-gray-500 font-bold mb-2">صادرة من:</h3>
          <p className="text-lg font-bold text-gray-800">شركة مزار للتشطيبات</p>
          <p className="text-gray-600 mt-1">القاهرة، التجمع الخامس</p>
          <p className="text-gray-600">contact@mazar.com</p>
          <p className="text-gray-600">+20 123 456 7890</p>
        </div>
      </div>

      {/* Invoice Table */}
      <table className="w-full mb-12">
        <thead>
          <tr className="bg-gray-100 text-gray-800">
            <th className="py-3 px-4 text-right font-bold w-16 border-b border-gray-300">#</th>
            <th className="py-3 px-4 text-right font-bold border-b border-gray-300">البيان / الوصف</th>
            <th className="py-3 px-4 text-left font-bold w-48 border-b border-gray-300">الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="py-6 px-4 text-gray-600 font-bold">1</td>
            <td className="py-6 px-4">
              <p className="font-bold text-gray-800 mb-1">{quote.type}</p>
              <p className="text-gray-500 text-sm">شامل التوريد والتركيب والإشراف الهندسي طبقاً للمواصفات المتفق عليها.</p>
            </td>
            <td className="py-6 px-4 text-left font-bold text-gray-800">{quote.value}</td>
          </tr>
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-16">
        <div className="w-1/2 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 font-bold">المجموع الفرعي:</span>
            <span className="text-gray-800 font-bold">{quote.value}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 font-bold">الضريبة (14%):</span>
            <span className="text-gray-800 font-bold">مشمول</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-3">
            <span className="text-xl font-black text-gray-800">الإجمالي:</span>
            <span className="text-xl font-black text-[#D4AF37]">{quote.value}</span>
          </div>
        </div>
      </div>

      {/* Footer / Terms */}
      <div className="border-t-2 border-gray-200 pt-8 mt-auto">
        <h4 className="font-bold text-gray-800 mb-2">الشروط والأحكام:</h4>
        <ul className="list-disc list-inside text-gray-500 text-sm space-y-1">
          <li>هذا العرض صالح لمدة 15 يوماً من تاريخ الإصدار.</li>
          <li>يتم دفع 40% كدفعة مقدمة عند توقيع العقد.</li>
          <li>جميع الخامات المستخدمة تخضع لمواصفات الجودة القياسية.</li>
        </ul>
        
        <div className="mt-12 flex justify-between items-end">
          <div className="text-center w-48">
            <div className="border-b border-gray-400 pb-2 mb-2"></div>
            <p className="text-gray-600 font-bold text-sm">توقيع العميل</p>
          </div>
          <div className="text-center w-48">
            <div className="border-b border-gray-400 pb-2 mb-2">
              <span className="text-[#D4AF37] font-signature text-2xl italic">Mazar Eng.</span>
            </div>
            <p className="text-gray-600 font-bold text-sm">توقيع الشركة</p>
          </div>
        </div>
      </div>

    </div>
  )
})

InvoiceTemplate.displayName = 'InvoiceTemplate'
