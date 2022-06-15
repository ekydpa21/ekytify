import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="msapplication-TileColor" content="#da532c" />

          <meta name="application-name" content="Spotify Clone" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Spotify Clone" />
          <meta name="description" content="Spotify Clone" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <title>Spotify Clone</title>

          <link href="https://fonts.cdnfonts.com/css/avenir-lt-std" rel="stylesheet" />
          <link rel="apple-touch-icon" sizes="180x180" href="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" />
          <link rel="icon" type="image/png" sizes="32x32" href="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" />
          <link rel="icon" type="image/png" sizes="16x16" href="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" />
          <link rel="mask-icon" href="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" color="#5bbad5" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
  }
}
