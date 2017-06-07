import React from 'react'
import Head from 'next/head'

export default ({ title = 'TABLEFLIP adventure', children = null }) => (
  <Head>
    <title>{title}</title>
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    <link rel='stylesheet' href='https://unpkg.com/tachyons@4.7.0/css/tachyons.min.css' />
    {children}
  </Head>
)
