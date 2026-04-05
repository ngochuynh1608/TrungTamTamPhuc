import { useEffect } from 'react'
import { useApp } from '../context/AppContext'

function guessIconType(dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string') return null
  if (dataUrl.startsWith('data:image/png')) return 'image/png'
  if (dataUrl.startsWith('data:image/svg')) return 'image/svg+xml'
  if (dataUrl.startsWith('data:image/jpeg') || dataUrl.startsWith('data:image/jpg')) return 'image/jpeg'
  if (dataUrl.startsWith('data:image/gif')) return 'image/gif'
  if (dataUrl.startsWith('data:image/webp')) return 'image/webp'
  if (dataUrl.startsWith('data:image/x-icon') || dataUrl.startsWith('data:image/vnd.microsoft.icon')) {
    return 'image/x-icon'
  }
  return null
}

export default function DynamicFavicon() {
  const { settings } = useApp()

  useEffect(() => {
    const url = settings.general.faviconUrl
    let link = document.querySelector('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'icon')
      document.head.appendChild(link)
    }
    if (url) {
      link.href = url
      const t = guessIconType(url)
      if (t) link.type = t
      else link.removeAttribute('type')
    } else {
      link.href = '/favicon.svg'
      link.type = 'image/svg+xml'
    }
  }, [settings.general.faviconUrl])

  return null
}
