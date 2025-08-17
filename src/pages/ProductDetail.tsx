import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProducts } from '../data'
import type { Product } from '../types'
import { formatKRW } from '../utils'
import StatusBadge from '../components/StatusBadge'
import ImageLightbox from '../components/ImageLightbox'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [all, setAll] = useState<Product[]>([])
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchProducts().then(setAll)
  }, [])

  const p = useMemo(() => all.find((x) => String(x.id) === String(id)), [all, id])
  const images = (p?.images?.length ? p.images : [(p as any)?.image1, (p as any)?.image2, (p as any)?.image3, (p as any)?.image4, (p as any)?.image5]).filter(Boolean) as string[]

  useEffect(() => { setIndex(0) }, [id])

  // helper: 이미지/동영상 구분
  function isVideo(url: string) {
    return /\.(mp4|webm|mov)(\?.*)?$/i.test(url)
  }

  if (!p) return <div className="mt-6 text-sm text-gray-500">로딩 중…</div>

  return (
    <section className="mt-4">
      <button onClick={() => navigate(-1)} className="text-sm text-gray-600 hover:underline">← 목록으로</button>

      <div className="mt-3 grid gap-6 md:grid-cols-2">
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            {images[index] ? (
              isVideo(images[index]) ? (
                <video
                  key={index}
                  src={images[index]}
                  controls
                  className="h-full w-full object-contain bg-black"
                  poster={images.find((img, i) => i !== index && !isVideo(img)) || undefined}
                />
              ) : (
                <img
                  key={index}
                  src={images[index]}
                  alt={p.title}
                  className="h-full w-full object-contain cursor-zoom-in"
                  onClick={() => setOpen(true)}
                />
              )
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-400">이미지 없음</div>
            )}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setIndex(index - 1 < 0 ? images.length - 1 : index - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full px-2 py-1 text-lg shadow"
                  style={{}}
                  aria-label="이전 이미지"
                >←</button>
                <button
                  onClick={() => setIndex((index + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full px-2 py-1 text-lg shadow"
                  style={{}}
                  aria-label="다음 이미지"
                >→</button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2 overflow-x-auto">
              {images.slice(0, 5).map((src, i) => (
                <button key={i} className={"aspect-square rounded border overflow-hidden " + (i === index ? 'ring-2 ring-brand-500' : '')} onClick={() => setIndex(i)}>
                  {isVideo(src) ? (
                    <div className="h-full w-full flex items-center justify-center bg-black text-white text-xs">동영상</div>
                  ) : (
                    <img src={src} alt={`thumb-${i}`} className="h-full w-full object-cover" />
                  )}
                </button>
              ))}
              {images.length > 5 && (
                <div className="flex items-center justify-center text-xs text-gray-400 px-2">+{images.length - 5}장</div>
              )}
            </div>
          )}
          <p className="mt-2 text-xs text-gray-500">이미지를 클릭하면 확대 보기로 열립니다.</p>
        </div>
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="text-xl font-semibold">{p.title}</h1>
              <div className="text-sm text-gray-500">{p.brand} · {p.model} · No. {p.no}</div>
            </div>
            <StatusBadge status={p.status} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded border p-3">
              <div className="text-xs text-gray-500">판매자 전용 가격</div>
              <div className="text-lg font-bold">{formatKRW(p.sellerPrice)}</div>
            </div>
            <div className="rounded border p-3">
              <div className="text-xs text-gray-500">일반 소비자 최소 가격</div>
              <div className="text-lg font-bold">{formatKRW(p.consumerMinPrice)}</div>
            </div>
            <div className="rounded border p-3">
              <div className="text-xs text-gray-500">예상 마진</div>
              <div className="text-lg font-bold">{formatKRW(p.consumerMinPrice - p.sellerPrice)}</div>
            </div>
            <div className="rounded border p-3">
              <div className="text-xs text-gray-500">택배비</div>
              <div className="text-lg font-bold">무료</div>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div><span className="text-gray-500">가방 컨디션:</span> {p.condition || '-'}</div>
            <div><span className="text-gray-500">기타 설명:</span> 이 사이트에 올라와있는 사진은 무단 사용 "가능" 합니다. 자유롭게 사용하시면 됩니다</div>
            {p.description && <div className="text-gray-700 whitespace-pre-wrap">{p.description}</div>}
          </div>

          <div className="mt-6 text-sm text-gray-700">
            본 사이트에서 직접 구매하실 필요 없습니다. 판매자분들은 별도로 연락 부탁드립니다.
          </div>
        </div>
      </div>
      <ImageLightbox
        images={images}
        index={index}
        setIndex={setIndex}
        alt={p.title}
        open={open}
        onClose={() => setOpen(false)}
      />
    </section>
  )
}
