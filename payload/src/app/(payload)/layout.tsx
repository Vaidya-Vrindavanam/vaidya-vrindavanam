import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap'

const configPromise = import('@payload-config').then((m) => m.default)

type Args = {
  children: React.ReactNode
}

const serverFunction = async (args: any) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
