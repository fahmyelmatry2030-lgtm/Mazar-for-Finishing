import React from 'react'
import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, url = 'https://mazar-finishing.vercel.app' }) => {
  const siteName = 'مزار للتشطيبات المعمارية'
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const metaDescription = description || 'نحن في مزار لا نقوم بالتشطيب فقط، بل نصيغ تجربة معمارية فاخرة تعكس شخصيتك. دقة في التفاصيل، جودة في الخامات، ورؤية تتخطى التوقعات.'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  )
}

export default SEO
