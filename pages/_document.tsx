import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/images/zee-memoji.png" />
        <link rel="apple-touch-icon" href="/images/zee-memoji.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
