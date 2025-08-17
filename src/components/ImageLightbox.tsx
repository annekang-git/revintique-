import React, { useEffect } from 'react'

export default function ImageLightbox({
  images,
  index,
  setIndex,
  alt,
  open,
  onClose,
}: {
  images: string[]
  index: number
  setIndex: (i: number) => void
  alt?: string
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setIndex((i) => (i + images.length - 1) % images.length)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length)
    }
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose, setIndex, images.length])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative max-h-full max-w-full">
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 z-10 rounded-full bg-white/90 px-2 py-1 text-xs shadow hover:bg-white"
          >닫기</button>
          <button
            onClick={() => setIndex((index + images.length - 1) % images.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full px-2 py-1 text-lg"
            style={{left: -40}}
          >←</button>
          <button
            onClick={() => setIndex((index + 1) % images.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full px-2 py-1 text-lg"
            style={{right: -40}}
          >→</button>
          {(() => {
            const url = images[index]
            if (/\.(mp4|webm|mov)(\?.*)?$/i.test(url)) {
              return (
                <video
                  key={index}
                  src={url}
                  controls
                  className="max-h-[85vh] max-w-[95vw] object-contain bg-black"
                  poster={images.find((img, i) => i !== index && !/\.(mp4|webm|mov)(\?.*)?$/i.test(img)) || undefined}
                />
              )
            }
            return (
              <img
                key={index}
                src={url}
                alt={alt}
                className="max-h-[85vh] max-w-[95vw] object-contain cursor-zoom-in"
                onClick={onClose}
              />
            )
          })()}
        </div>
      </div>
    </div>
  )
}
