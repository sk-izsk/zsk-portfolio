import Head from 'next/head'
import React from 'react'

interface PageSeoProps {
  title: string
  description: string
  path: string
}

const SITE_NAME = 'ZSK Portfolio'
const SITE_URL = 'https://izsk.netlify.app'

export const PageSeo: React.FC<PageSeoProps> = ({ title, description, path }) => {
  const canonical = `${SITE_URL}${path}`
  const fullTitle = `${title} | ${SITE_NAME}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Head>
  )
}
