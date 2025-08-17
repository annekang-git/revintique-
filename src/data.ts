import Papa from 'papaparse'
import { dataSource } from './config'
import type { Product } from './types'

function parseNumber(v: any): number {
  if (v === null || v === undefined || v === '') return 0
  if (typeof v === 'number') return v
  const n = String(v).replace(/[^0-9.-]/g, '')
  const parsed = parseFloat(n)
  return Number.isFinite(parsed) ? parsed : 0
}

function normalizeProduct(raw: any, index: number): Product {
  const sellerPrice = parseNumber(raw.sellerPrice ?? raw['판매자 전용 가격'])
  const consumerMinPrice = parseNumber(raw.consumerMinPrice ?? raw['일반 소비자 최소 가격'])
  const margin = consumerMinPrice - sellerPrice
  const marginRate = consumerMinPrice ? Math.round((margin / consumerMinPrice) * 1000) / 10 : 0
  const images: string[] = []
  ;[
    'image1','image2','image3','image4','image5',
    'image6','image7','image8','image9','image10',
    'image11','image12','image13','image14','image15',
    '이미지1','이미지2','이미지3','이미지4','이미지5',
    '이미지6','이미지7','이미지8','이미지9','이미지10',
    '이미지11','이미지12','이미지13','이미지14','이미지15'
  ].forEach((k)=>{
    const u = raw[k]
    if (u && typeof u === 'string') images.push(u.trim())
  })
  const id = String(raw.id ?? raw.ID ?? raw.No ?? raw.no ?? index + 1)
  const no = Number(raw.no ?? raw.No ?? index + 1)

  return {
    id,
    no,
    brand: (raw.brand ?? raw.브랜드 ?? '').trim(),
    model: (raw.model ?? raw.모델 ?? '').trim(),
    title: (raw.title ?? raw.제목 ?? '').trim() || `${(raw.brand ?? '').trim()} ${(raw.model ?? '').trim()}`,
    status: (raw.status ?? raw.상태 ?? '판매중').trim(),
    sellerPrice,
    consumerMinPrice,
    shippingFeeIncluded: true,
    condition: (raw.condition ?? raw.컨디션 ?? '').trim(),
    margin,
    marginRate,
    images,
    description: (raw.description ?? raw.설명 ?? '').trim(),
    createdAt: raw.createdAt ?? new Date().toISOString(),
  }
}

export async function fetchProducts(): Promise<Product[]> {
  if (dataSource.csvUrl) {
    const csv = await fetch(dataSource.csvUrl).then((r) => r.text())
    const parsed = Papa.parse(csv, { header: true })
    const rows = (parsed.data as any[]).filter(Boolean)
    return rows.map(normalizeProduct)
  }
  if (dataSource.jsonUrl) {
    const rows = await fetch(dataSource.jsonUrl).then((r) => r.json())
    return (rows as any[]).map(normalizeProduct)
  }
  // fallback to local sample
  const rows = await fetch('/data/sample.json').then((r) => r.json())
  return (rows as any[]).map(normalizeProduct)
}
