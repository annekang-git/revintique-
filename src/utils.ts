export function formatKRW(amount: number): string {
  try {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(amount)
  } catch {
    return amount.toLocaleString('ko-KR') + '원'
  }
}

export function clsx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
