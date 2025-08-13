export type SaleStatus = '판매중' | '예약중' | '판매완료'

export interface Product {
  id: string // unique id
  no: number // display number
  brand: string
  model: string
  title?: string
  status: SaleStatus
  sellerPrice: number // 판매자 전용 가격
  consumerMinPrice: number // 일반 소비자 최소 가격
  shippingFeeIncluded?: boolean // 택배비: 무료 (true)
  condition: string // 컨디션
  margin?: number // absolute margin
  marginRate?: number // % margin
  images: string[] // image urls
  description?: string
  createdAt: string // ISO
}

export interface DataSourceConfig {
  // If provided, CSV URL (e.g., Google Sheets published CSV)
  csvUrl?: string
  // Optional JSON URL
  jsonUrl?: string
}
