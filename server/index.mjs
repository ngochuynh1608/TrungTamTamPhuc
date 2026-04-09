import express from 'express'
import 'dotenv/config'
import { readFile, writeFile, mkdir, rename } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DATA_DIR = join(ROOT, 'data')
const DATA_FILE = join(DATA_DIR, 'site-data.json')
const DIST = join(ROOT, 'dist')
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

const app = express()
app.use(express.json({ limit: '50mb' }))

async function readSiteData() {
  try {
    const raw = await readFile(DATA_FILE, 'utf8')
    return JSON.parse(raw)
  } catch {
    return { settings: {}, contacts: [] }
  }
}

async function writeSiteData(data) {
  await mkdir(DATA_DIR, { recursive: true })
  const tmp = `${DATA_FILE}.${Date.now()}.tmp`
  const payload = JSON.stringify(data, null, 2)
  await writeFile(tmp, payload, 'utf8')
  await rename(tmp, DATA_FILE)
}

app.get('/api/data', async (_req, res) => {
  try {
    const data = await readSiteData()
    res.json(data)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Không đọc được dữ liệu' })
  }
})

app.put('/api/data', async (req, res) => {
  try {
    const body = req.body
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Body không hợp lệ' })
    }
    if (!body.settings || typeof body.settings !== 'object') {
      return res.status(400).json({ error: 'Thiếu settings' })
    }
    if (!Array.isArray(body.contacts)) {
      return res.status(400).json({ error: 'contacts phải là mảng' })
    }
    await writeSiteData({ settings: body.settings, contacts: body.contacts })
    res.json({ ok: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Không ghi được dữ liệu' })
  }
})

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) {
    return res.status(400).json({ error: 'Thiếu thông tin đăng nhập' })
  }
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' })
  }
  res.json({ ok: true })
})

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  app.use(express.static(DIST))
  app.use((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return res.status(404).end()
    }
    res.sendFile(join(DIST, 'index.html'))
  })
}

const PORT = Number(process.env.PORT) || 3005
app.listen(PORT, () => {
  console.log(`[api] http://localhost:${PORT}`)
  if (isProd) console.log('[api] đang phục vụ static từ dist/')
})
