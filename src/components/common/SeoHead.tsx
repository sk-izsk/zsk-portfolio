import React from 'react'
import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://izsk.netlify.app'
const SITE_NAME = 'Shaikh Zeeshan Murshed | Portfolio'
const DEFAULT_DESCRIPTION =
  'Full Stack Developer portfolio of Shaikh Zeeshan Murshed – React, TypeScript, and Node.js expert.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/zee-memoji.png`

interface SeoHeadProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
