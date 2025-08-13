import React from 'react'
import type { SaleStatus } from '../types'
import { clsx } from '../utils'

export default function StatusBadge({ status }: { status: SaleStatus }) {
  const color =
    status === '판매중' ? 'bg-green-100 text-green-800 border-green-200' :
    status === '예약중' ? 'bg-amber-100 text-amber-800 border-amber-200' :
    'bg-gray-200 text-gray-700 border-gray-300'
  return (
    <span className={clsx('inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium', color)}>
      {status}
    </span>
  )
}
