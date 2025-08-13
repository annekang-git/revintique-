import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'

function InfoBanner() {
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">구입방법</p>
      <ul className="list-disc list-inside text-gray-700">
        <li>구입 및 문의가 필요한 가방 넘버를 전달해주세요.</li>
        <li>(구입이 필요한 상품은 모델명, 원하는 구입가격대를 전달해주세요)</li>
      </ul>
      <p className="text-gray-700">모든 사진은 도용 "가능" 합니다. 자유롭게 2차 판매에 사용하셔도 됩니다.</p>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-10 border-t pt-6 text-xs text-gray-600">
      <div className="grid gap-1 sm:grid-cols-2 sm:gap-2">
        <p>상호: 레빈티크</p>
        <p>대표자: -</p>
        <p>사업자등록번호: -</p>
        <p>환불/교환: 모든 상품은 검수 완료되었지만, 가품 발견 시 100% 환불</p>
      </div>
      <p className="mt-4">© {new Date().getFullYear()} 레빈티크. All rights reserved.</p>
    </footer>
  )
}

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-bold tracking-tight">레빈티크</Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<>
            <section className="rounded-lg border bg-white p-4 sm:p-6">
              <InfoBanner />
            </section>
            <Home />
          </>} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<div className="text-sm text-gray-600">페이지를 찾을 수 없습니다.</div>} />
        </Routes>
        <Footer />
      </main>
    </div>
  )
}

export default App
