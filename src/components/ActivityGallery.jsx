import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useApp } from '../context/AppContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function GalleryItem({ item, index, onOpen }) {
  const ref = useScrollAnimation()
  return (
    <figure className="activity-gallery__item" ref={ref} style={{ transitionDelay: `${index * 50}ms` }}>
      <button
        type="button"
        className="activity-gallery__open"
        onClick={() => onOpen(index)}
        aria-label={item.caption ? `Xem ảnh: ${item.caption}` : `Xem ảnh ${index + 1}`}
      >
        <div className="activity-gallery__img-wrap">
          <img src={item.url} alt="" loading="lazy" />
        </div>
        {item.caption && <figcaption className="activity-gallery__caption">{item.caption}</figcaption>}
      </button>
    </figure>
  )
}

function GalleryLightbox({ images, startIndex, onClose }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(startIndex)

  const slideCount = images.length
  const scrollToIndex = useCallback(
    (idx, behavior = 'smooth') => {
      const el = trackRef.current
      if (!el || !slideCount) return
      const w = el.clientWidth
      const i = Math.max(0, Math.min(slideCount - 1, idx))
      el.scrollTo({ left: i * w, behavior })
    },
    [slideCount]
  )

  useLayoutEffect(() => {
    setActive(startIndex)
    const el = trackRef.current
    if (!el || !slideCount) return
    const w = el.clientWidth
    el.scrollTo({ left: startIndex * w, behavior: 'auto' })
  }, [startIndex, slideCount])

  useEffect(() => {
    const prevBody = document.body.style.overflow
    const prevHtml = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') scrollToIndex(active - 1, 'smooth')
      if (e.key === 'ArrowRight') scrollToIndex(active + 1, 'smooth')
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevBody
      document.documentElement.style.overflow = prevHtml
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, active, scrollToIndex])

  const onScroll = () => {
    const el = trackRef.current
    if (!el || !slideCount) return
    const w = el.clientWidth
    if (w <= 0) return
    const i = Math.round(el.scrollLeft / w)
    setActive(Math.max(0, Math.min(slideCount - 1, i)))
  }

  useEffect(() => {
    const onResize = () => {
      scrollToIndex(active, 'auto')
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active, scrollToIndex])

  const ui = (
    <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Album ảnh" onClick={onClose}>
      <div className="gallery-lightbox__shell" onClick={(e) => e.stopPropagation()}>
      <div className="gallery-lightbox__chrome">
        <button type="button" className="gallery-lightbox__close" onClick={onClose} aria-label="Đóng">
          <i className="fas fa-times" />
        </button>
        <div className="gallery-lightbox__counter" aria-live="polite">
          {active + 1} / {slideCount}
        </div>
      </div>

      <div className="gallery-lightbox__stage">
        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--prev"
          onClick={() => scrollToIndex(active - 1)}
          disabled={active <= 0}
          aria-label="Ảnh trước"
        >
          <i className="fas fa-chevron-left" />
        </button>

        <div
          ref={trackRef}
          className="gallery-lightbox__track"
          onScroll={onScroll}
        >
          {images.map((item, i) => (
            <div key={item.id} className="gallery-lightbox__slide">
              <div className="gallery-lightbox__slide-inner">
                <img src={item.url} alt={item.caption || ''} draggable={false} />
                {item.caption && <p className="gallery-lightbox__caption">{item.caption}</p>}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--next"
          onClick={() => scrollToIndex(active + 1)}
          disabled={active >= slideCount - 1}
          aria-label="Ảnh sau"
        >
          <i className="fas fa-chevron-right" />
        </button>
      </div>

      <p className="gallery-lightbox__hint">Vuốt ngang trên điện thoại để xem ảnh</p>
      </div>
    </div>
  )

  return createPortal(ui, document.body)
}

export default function ActivityGallery() {
  const { settings } = useApp()
  const sec = settings.gallerySection
  const images = settings.gallery || []
  const [lightbox, setLightbox] = useState(null)

  if (!images.length) {
    return null
  }

  return (
    <section className="activity-gallery section section--alt" id="gallery">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">{sec.tag}</span>
          <h2 className="section__title">{sec.title}</h2>
          <p className="section__desc">{sec.description}</p>
        </div>
        <div className="activity-gallery__grid">
          {images.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} onOpen={(idx) => setLightbox(idx)} />
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <GalleryLightbox images={images} startIndex={lightbox} onClose={() => setLightbox(null)} />
      )}
    </section>
  )
}
