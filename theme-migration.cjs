const fs = require('fs');
const files = [
  'src/components/DashboardLayout.jsx',
  'src/pages/Overview.jsx',
  'src/pages/Projects.jsx',
  'src/pages/Clients.jsx',
  'src/pages/Quotations.jsx',
  'src/pages/Financials.jsx',
  'src/pages/Settings.jsx',
  'src/pages/CMS.jsx'
];

const replaces = [
  [/bg-\[\#0f172a\]/g, 'bg-gray-50'],
  [/bg-\[\#1e293b\]/g, 'bg-gray-100'],
  [/bg-bg-secondary/g, 'bg-white'],
  [/glass-panel/g, 'bg-white shadow-sm border border-gray-200'],
  [/border-white\/5/g, 'border-gray-200'],
  [/border-white\/10/g, 'border-gray-300'],
  [/border-glass-border/g, 'border-gray-200'],
  [/bg-white\/5/g, 'bg-gray-50'],
  [/bg-black\/20/g, 'bg-gray-50'],
  [/bg-black\/40/g, 'bg-gray-50'],
  [/bg-black\/50/g, 'bg-white'],
  [/bg-primary\/50/g, 'bg-white\/90'],
  [/text-white/g, 'text-gray-900'],
  [/text-text-secondary/g, 'text-gray-500'],
  [/divide-white\/5/g, 'divide-gray-200'],
  [/hover:bg-white\/5/g, 'hover:bg-gray-100'],
  [/bg-\[\#0c0c0c\]/g, 'bg-gray-100']
];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  replaces.forEach(([re, rep]) => { c = c.replace(re, rep); });
  fs.writeFileSync(f, c);
});
console.log('Dashboard theme updated');
