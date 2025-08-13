import React, { useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../data'
import type { Product } from '../types'
import ProductCard from '../components/ProductCard'

type PriceBucket = 'all' | 'under100k' | '100k' | '200k' | '300k' | 'under1m' | '1mplus'

type SortKey = 'latest' | 'price' | 'marginRate'

function priceBucketLabel(b: PriceBucket) {
  switch (b) {
    case 'under100k': return '10만원 이하'
    case '100k': return '10만원대'
    case '200k': return '20만원대'
    case '300k': return '30만원대'
    case 'under1m': return '100만원 이하'
    case '1mplus': return '100만원 이상'
    default: return '전체'
  }
}

export default function Home() {
  const [all, setAll] = useState<Product[]>([])
  const [brand, setBrand] = useState<string>('all')
  const [bucket, setBucket] = useState<PriceBucket>('all')
  const [sortBy, setSortBy] = useState<SortKey>('latest')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchProducts().then((rows) => {
      if (!mounted) return
      setAll(rows)
      setLoading(false)
    })
    return () => { mounted = false }
  }, [])

  const brands = useMemo(() => {
    const s = new Set<string>()
    all.forEach((p) => p.brand && s.add(p.brand))
    return ['all', ...Array.from(s)]
  }, [all])

  const filtered = useMemo(() => {
    let rows = all.slice()
    if (brand !== 'all') rows = rows.filter((p) => p.brand === brand)
    if (bucket !== 'all') {
      rows = rows.filter((p) => {
        const price = p.sellerPrice
        switch (bucket) {
          case 'under100k': return price < 100_000
          case '100k': return price >= 100_000 && price < 200_000
          case '200k': return price >= 200_000 && price < 300_000
          case '300k': return price >= 300_000 && price < 1_000_000
          case 'under1m': return price < 1_000_000
          case '1mplus': return price >= 1_000_000
        }
      })
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      rows = rows.filter((p) => (
        (p.title || '').toLowerCase().includes(q) ||
        (p.brand || '').toLowerCase().includes(q) ||
        (p.model || '').toLowerCase().includes(q) ||
        String(p.no).includes(q)
      ))
    }
    switch (sortBy) {
      case 'price':
        rows.sort((a, b) => a.sellerPrice - b.sellerPrice); break
      case 'marginRate':
        rows.sort((a, b) => (b.marginRate || 0) - (a.marginRate || 0)); break
      default:
        rows.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')); break
    }
    return rows
  }, [all, brand, bucket, sortBy, query])

  return (
    <section className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-lg font-semibold">상품 리스트</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색: 브랜드/모델/No"
            className="col-span-2 sm:col-span-1 rounded border px-3 py-2 text-sm"
          />
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="rounded border px-3 py-2 text-sm">
            {brands.map((b) => <option key={b} value={b}>{b === 'all' ? '전체 브랜드' : b}</option>)}
          </select>
          <select value={bucket} onChange={(e) => setBucket(e.target.value as PriceBucket)} className="rounded border px-3 py-2 text-sm">
            {(['all','under100k','100k','200k','300k','under1m','1mplus'] as PriceBucket[]).map((b) => (
              <option key={b} value={b}>{priceBucketLabel(b)}</option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)} className="rounded border px-3 py-2 text-sm">
            <option value="latest">최신등록순</option>
            <option value="price">가격순(판매자)</option>
            <option value="marginRate">마진율순</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="mt-6 text-sm text-gray-500">로딩 중…</div>
      ) : (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </section>
  )
}
