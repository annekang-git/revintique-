import React, { useEffect } from 'react'

export default function ImageLightbox({
  src,
  alt,
  open,
  onClose,
}: {
  src: string
  alt?: string
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

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
          <img
            src={src}
            alt={alt}
            className="max-h-[85vh] max-w-[95vw] object-contain cursor-zoom-in"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  )
}
