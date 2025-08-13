import React from 'react'
import type { Product } from '../types'
import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import { formatKRW } from '../utils'

export default function ProductCard({ p }: { p: Product }) {
  const thumb = p.images?.[0] || (p as any).image1 || ''
  return (
    <Link to={`/product/${encodeURIComponent(p.id)}`} className="group block rounded-lg border bg-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-500">
      <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
        {thumb ? (
          <img src={thumb} alt={p.title || `${p.brand} ${p.model}`} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">이미지 없음</div>
        )}
      </div>
      <div className="p-3 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">No. {p.no}</span>
          <StatusBadge status={p.status} />
        </div>
        <div className="text-sm font-medium truncate">{p.title || `${p.brand} ${p.model}`}</div>
        <div className="text-xs text-gray-500 truncate">{p.brand} · {p.model}</div>
        <div className="mt-1 grid grid-cols-3 gap-2 text-[11px] text-gray-700">
          <div>
            <div className="text-gray-500">판매자 전용</div>
            <div className="font-semibold">{formatKRW(p.sellerPrice)}</div>
          </div>
          <div>
            <div className="text-gray-500">소비자 최소</div>
            <div className="font-semibold">{formatKRW(p.consumerMinPrice)}</div>
          </div>
          <div>
            <div className="text-gray-500">예상 마진</div>
            <div className="font-semibold">{formatKRW(p.consumerMinPrice - p.sellerPrice)}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
