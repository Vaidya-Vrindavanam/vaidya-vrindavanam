import { copyFile, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { join } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const source = join(distDir, 'sitemap-index.xml')
const destination = join(distDir, 'sitemap.xml')

await access(source, constants.R_OK)
await copyFile(source, destination)
